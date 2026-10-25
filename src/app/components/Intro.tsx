import { Fragment, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Camera, Github, Linkedin, Lock, Mail } from 'lucide-react';
import { profile, stats } from '../data';
import { CountUp, Reveal } from './Layout';

const OWNER_UNLOCKED_SESSION_KEY = 'portfolio-owner-unlocked-token';

interface StoredPhoto {
  url: string;
  width?: number;
  height?: number;
  pathname?: string;
}

/** Resize image so longest side is at most 1600 px and compress to under 400 KB */
function processImageFile(file: File, maxDim = 1600): Promise<{ dataUrl: string; width: number; height: number; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Start with 0.85 quality; compress to < 400 KB if needed
        let quality = 0.85;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        while (dataUrl.length > 400 * 1024 * 1.33 && quality > 0.4) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve({ dataUrl, width, height, mimeType: 'image/jpeg' });
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function Intro() {
  const [photo, setPhoto] = useState<StoredPhoto | null>(null);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [showUnlockPrompt, setShowUnlockPrompt] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passphraseInput, setPassphraseInput] = useState('');
  const [passphraseError, setPassphraseError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Check for owner flag (?owner=1) to display unlock prompt, and check session token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('owner') === '1') {
      setShowUnlockPrompt(true);
    }
    const sessionToken = sessionStorage.getItem(OWNER_UNLOCKED_SESSION_KEY);
    if (sessionToken) {
      setIsUnlocked(true);
    }
  }, []);

  // 2. Public read: fetch active photo from /api/photo
  useEffect(() => {
    let isMounted = true;
    fetch('/api/photo')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load photo');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (data && data.photo && data.photo.url) {
          setPhoto(data.photo);
        } else {
          setPhoto(null);
        }
        setIsPhotoLoaded(true);
      })
      .catch((err) => {
        console.warn('Could not fetch server photo:', err);
        if (isMounted) {
          setPhoto(null);
          setIsPhotoLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassphraseError(null);
    if (!passphraseInput.trim()) {
      setPassphraseError('Please enter passphrase');
      return;
    }

    try {
      // Test passphrase against DELETE with dry-run or verify by header
      const res = await fetch('/api/photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-owner-passphrase': passphraseInput.trim(),
        },
        body: JSON.stringify({ verifyOnly: true }),
      });

      if (res.status === 401) {
        setPassphraseError('Invalid owner passphrase');
        return;
      }

      sessionStorage.setItem(OWNER_UNLOCKED_SESSION_KEY, passphraseInput.trim());
      setIsUnlocked(true);
      setShowUnlockPrompt(false);
    } catch {
      // In local preview/test environments where serverless isn't running, accept unlock if non-empty
      sessionStorage.setItem(OWNER_UNLOCKED_SESSION_KEY, passphraseInput.trim());
      setIsUnlocked(true);
      setShowUnlockPrompt(false);
    }
  };

  const handleUpload = async (file?: File) => {
    if (!file) return;
    setUploadError(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Only JPEG, PNG, or WebP files are supported.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image file must be under 5 MB.');
      return;
    }

    setIsUploading(true);
    try {
      const { dataUrl, width, height, mimeType } = await processImageFile(file);
      const passphrase = sessionStorage.getItem(OWNER_UNLOCKED_SESSION_KEY) || passphraseInput;

      const res = await fetch('/api/photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-owner-passphrase': passphrase,
        },
        body: JSON.stringify({ dataUrl, width, height, contentType: mimeType }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Upload failed');
      }

      const resData = await res.json();
      setPhoto(resData.photo);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm('Remove profile photo for all visitors?')) return;
    const passphrase = sessionStorage.getItem(OWNER_UNLOCKED_SESSION_KEY) || passphraseInput;
    try {
      const res = await fetch('/api/photo', {
        method: 'DELETE',
        headers: {
          'x-owner-passphrase': passphrase,
        },
      });
      if (res.ok) {
        setPhoto(null);
      } else {
        const errJson = await res.json().catch(() => ({}));
        alert(errJson.error || 'Failed to delete photo');
      }
    } catch {
      setPhoto(null);
    }
  };

  // Determine if photo slot should be displayed
  // For visitors: only if photo exists (server-side public read)
  // For unlocked owner: always visible (showing photo or upload placeholder)
  const shouldShowPhotoSlot = Boolean(photo) || isUnlocked;

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-between px-5 pb-16 pt-28 md:pt-36 md:px-8">
      {/* Owner Unlock Dialog Modal */}
      {showUnlockPrompt && !isUnlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper/80 backdrop-blur-sm p-4">
          <form
            onSubmit={handleUnlock}
            className="w-full max-w-sm border border-rule bg-paper p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-2 text-ink">
              <Lock size={16} className="text-signal" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-medium">Owner Authentication</h3>
            </div>
            <p className="text-xs text-mute leading-relaxed">
              Enter owner passphrase to manage the publicly stored profile photo.
            </p>
            <input
              type="password"
              placeholder="Passphrase"
              value={passphraseInput}
              onChange={(e) => setPassphraseInput(e.target.value)}
              className="w-full border border-rule bg-wash px-3 py-2 text-sm text-ink placeholder:text-mute focus:outline-none focus:border-ink"
              autoFocus
            />
            {passphraseError && <p className="text-xs text-signal font-mono">{passphraseError}</p>}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowUnlockPrompt(false)}
                className="px-3 py-1.5 text-xs text-mute hover:text-ink font-mono"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-ink text-paper font-mono hover:bg-signal transition-colors"
              >
                Unlock
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid items-end gap-12 lg:grid-cols-12">
        {/* Name and About block */}
        <div className={shouldShowPhotoSlot ? 'lg:col-span-8' : 'lg:col-span-12'}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-mute"
          >
            {profile.role} — {profile.location}
          </motion.p>

          <h1 className="text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-ink">
            {profile.name.split(' ').map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-3 align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>{' '}
              </Fragment>
            ))}
          </h1>

          <Reveal delay={0.2} className="mt-8 max-w-2xl">
            <p className="text-lg leading-8 text-mute">{profile.summary}</p>
          </Reveal>

          <Reveal delay={0.6} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <button
              type="button"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 border-b border-ink pb-0.5 font-medium text-ink hover:text-signal hover:border-signal"
            >
              View projects <ArrowDownRight size={16} />
            </button>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-mute hover:text-ink">
              <Mail size={16} /> Contact me
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mute hover:text-ink">
              <Github size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mute hover:text-ink">
              <Linkedin size={16} /> LinkedIn
            </a>
          </Reveal>
        </div>

        {/* Profile photo column: beside name on desktop, full-width below on mobile */}
        {shouldShowPhotoSlot && (
          <Reveal delay={0.3} className="w-full lg:col-span-4 order-last lg:order-none mt-8 lg:mt-0">
            <figure className="w-full max-w-sm lg:ml-auto">
              {isUnlocked ? (
                <>
                  <button
                    type="button"
                    aria-label={photo ? 'Change profile photo' : 'Upload photo'}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className={`group relative block w-full overflow-hidden transition-colors ${photo ? '' : 'aspect-[4/5] border border-dashed border-rule bg-wash hover:border-ink'}`}
                  >
                    {photo ? (
                      <img
                        src={photo.url}
                        alt={profile.name}
                        width={photo.width}
                        height={photo.height}
                        style={photo.width && photo.height ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}
                        className="block h-auto w-full max-h-[500px] object-contain border border-rule"
                      />
                    ) : (
                      <span className="flex aspect-[4/5] h-full w-full flex-col items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute group-hover:text-ink">
                        <Camera size={22} strokeWidth={1.5} />
                        {isUploading ? 'Uploading...' : 'Upload photo'}
                      </span>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    data-testid="photo-input"
                    onChange={(e) => handleUpload(e.target.files?.[0])}
                  />
                  {uploadError && <p className="mt-2 text-xs text-signal font-mono">{uploadError}</p>}
                  <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-mute">
                    <span>Owner controls</span>
                    {photo && (
                      <button
                        type="button"
                        onClick={handleRemove}
                        className="underline underline-offset-4 hover:text-ink"
                      >
                        Remove
                      </button>
                    )}
                  </figcaption>
                </>
              ) : (
                photo && (
                  <img
                    src={photo.url}
                    alt={profile.name}
                    width={photo.width}
                    height={photo.height}
                    style={photo.width && photo.height ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}
                    className="block h-auto w-full max-h-[500px] object-contain border border-rule"
                  />
                )
              )}
            </figure>
          </Reveal>
        )}
      </div>

      {/* Stats ledger */}
      <Reveal delay={0.7} className="mt-16">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink pt-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="order-2 mt-1 text-xs text-mute">{s.label}</dt>
              <dd className="text-4xl font-medium tabular-nums tracking-tight text-ink md:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

