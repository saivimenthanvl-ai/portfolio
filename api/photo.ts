import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put, del, list } from '@vercel/blob';

// In-memory rate limiting: 10 requests per minute per IP for write/delete
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.expiresAt <= now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 10) {
    return false;
  }
  entry.count += 1;
  return true;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Common CORS and caching headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-owner-passphrase');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const expectedPassphrase = process.env.OWNER_PASSPHRASE;

  // 1. GET /api/photo - Public read
  if (req.method === 'GET') {
    try {
      if (!token) {
        // Blob not configured yet; return 200 with empty photo gracefully
        res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=60');
        return res.status(200).json({ photo: null });
      }

      const { blobs } = await list({ prefix: 'profile-photo', token });
      const activeBlob = blobs[0] ?? null;

      if (!activeBlob) {
        res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=60');
        return res.status(200).json({ photo: null });
      }

      // Short revalidate (1 minute CDN cache)
      res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=60');
      return res.status(200).json({
        photo: {
          url: activeBlob.url,
          pathname: activeBlob.pathname,
          uploadedAt: activeBlob.uploadedAt,
        },
      });
    } catch (err: unknown) {
      console.error('Error fetching photo:', err);
      return res.status(500).json({ error: 'Failed to retrieve photo' });
    }
  }

  // Write operations require rate limit check & passphrase
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute before trying again.' });
  }

  const providedPassphrase = req.headers['x-owner-passphrase'] as string | undefined;
  if (!expectedPassphrase || providedPassphrase !== expectedPassphrase) {
    return res.status(401).json({ error: 'Unauthorized: Invalid owner passphrase' });
  }

  if (!token) {
    return res.status(500).json({ error: 'Storage not configured. Please attach a Vercel Blob store to this project.' });
  }

  // 2. POST /api/photo - Owner upload
  if (req.method === 'POST') {
    try {
      const { dataUrl, contentType, width, height } = req.body || {};

      if (!dataUrl || typeof dataUrl !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid dataUrl' });
      }

      // Check allowed image types: image/jpeg, image/png, image/webp
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const matches = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: 'Invalid data URL format' });
      }

      const mimeType = matches[1];
      const base64Data = matches[2];

      if (!allowedTypes.includes(mimeType) && !allowedTypes.includes(contentType)) {
        return res.status(400).json({ error: 'Invalid file type. Only JPEG, PNG, and WebP are accepted.' });
      }

      const buffer = Buffer.from(base64Data, 'base64');
      if (buffer.length > 5 * 1024 * 1024) {
        return res.status(400).json({ error: 'File size exceeds 5 MB limit' });
      }

      // Delete old photo blobs first to keep storage tidy
      try {
        const { blobs } = await list({ prefix: 'profile-photo', token });
        if (blobs.length > 0) {
          await del(blobs.map((b) => b.url), { token });
        }
      } catch (delErr) {
        console.warn('Warning: Could not delete old photo blob:', delErr);
      }

      const extension = mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg';
      const filename = `profile-photo-${Date.now()}.${extension}`;

      const blob = await put(filename, buffer, {
        access: 'public',
        contentType: mimeType,
        token,
      });

      return res.status(200).json({
        photo: {
          url: blob.url,
          pathname: blob.pathname,
          width: width ? Number(width) : undefined,
          height: height ? Number(height) : undefined,
        },
      });
    } catch (err: unknown) {
      console.error('Error uploading photo:', err);
      return res.status(500).json({ error: 'Failed to upload photo to storage' });
    }
  }

  // 3. DELETE /api/photo - Owner remove
  if (req.method === 'DELETE') {
    try {
      const { blobs } = await list({ prefix: 'profile-photo', token });
      if (blobs.length > 0) {
        await del(blobs.map((b) => b.url), { token });
      }
      return res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (err: unknown) {
      console.error('Error deleting photo:', err);
      return res.status(500).json({ error: 'Failed to delete photo' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
