import { useEffect, useRef, useState } from 'react';
import { Camera, Trash2 } from 'lucide-react';

const PHOTO_KEY = 'portfolio-owner-photo';
const OWNER_KEY = 'portfolio-owner';

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

function resize(file: File, size = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      canvas
        .getContext('2d')!
        .drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Owner-only profile photo. The photo lives in this browser's localStorage, so
 * it is never sent anywhere and other visitors never see it or the upload
 * control. Open the site once with ?owner=1 to enable owner mode here
 * (?owner=0 turns it off).
 */
export function ProfilePhoto() {
  const [isOwner, setIsOwner] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const flag = new URLSearchParams(window.location.search).get('owner');
    if (flag === '1') write(OWNER_KEY, '1');
    if (flag === '0') write(OWNER_KEY, null);
    const owner = read(OWNER_KEY) === '1';
    setIsOwner(owner);
    if (owner) setPhoto(read(PHOTO_KEY));
  }, []);

  if (!isOwner) return null;

  const onFile = async (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const data = await resize(file);
    write(PHOTO_KEY, data);
    setPhoto(data);
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <button
        type="button"
        aria-label={photo ? 'Change profile photo' : 'Upload profile photo'}
        onClick={() => input.current?.click()}
        className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white/30 bg-slate-700 flex items-center justify-center hover:border-white transition-colors"
      >
        {photo ? (
          <img src={photo} alt="Sai Vimenthan V L" className="w-full h-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-1 text-sm text-slate-200">
            <Camera size={28} />
            Upload photo
          </span>
        )}
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        data-testid="photo-input"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      {photo && (
        <button
          type="button"
          onClick={() => {
            write(PHOTO_KEY, null);
            setPhoto(null);
          }}
          className="mt-2 flex items-center gap-1 text-xs text-slate-300 hover:text-white"
        >
          <Trash2 size={12} /> Remove photo
        </button>
      )}
      <p className="mt-1 text-xs text-slate-400">Only you can see this photo</p>
    </div>
  );
}
