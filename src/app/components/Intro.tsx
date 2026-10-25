import { Fragment, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Camera, Github, Linkedin, Mail } from 'lucide-react';
import defaultPhoto from '../../imports/profile-photo.jpg';
import { profile, stats } from '../data';
import { CountUp, Reveal } from './Layout';

const PHOTO_KEY = 'portfolio-localhost-photo';

function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  const h = (window as any).__FORCE_HOSTNAME__ || window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1' || h === '[::1]';
}

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null): boolean {
  try {
    if (value === null) {
      localStorage.removeItem(key);
      return true;
    }
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error('LocalStorage write error:', e);
    return false;
  }
}

/**
 * Downscale image so longest side is at most 1200 px, JPEG quality ~0.88, no cropping.
 */
function downscaleImage(file: File, maxDim = 1200): Promise<string> {
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
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.88));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function useLocalPhoto() {
  const [isLocal, setIsLocal] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const local = isLocalhost();
    setIsLocal(local);
    const stored = readStorage(PHOTO_KEY);
    setPhoto(stored || defaultPhoto);
  }, []);

  return { isLocal, photo, setPhoto };
}

export function Intro() {
  const { isLocal, photo, setPhoto } = useLocalPhoto();
  const [storageError, setStorageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file?: File) => {
    if (!file) return;
    setStorageError(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setStorageError('Only JPEG, PNG, or WebP images are supported.');
      return;
    }

    try {
      const dataUrl = await downscaleImage(file, 1200);
      const ok = writeStorage(PHOTO_KEY, dataUrl);
      if (!ok) {
        setStorageError('Storage is full or blocked in this browser. Could not save photo.');
        return;
      }
      setPhoto(dataUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to process image';
      setStorageError(msg);
    }
  };

  const handleRemove = () => {
    writeStorage(PHOTO_KEY, null);
    setPhoto(defaultPhoto);
    setStorageError(null);
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-between px-5 pb-12 pt-20 md:pt-24 md:px-8">
      <div className="grid items-end gap-8 md:gap-10 lg:grid-cols-12">
        {/* Name and About block: spans 8 columns on desktop, photo spans 4 columns */}
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-mute"
          >
            {profile.role} — {profile.location}
          </motion.p>

          <h1 className="text-[clamp(2.25rem,5.5vw,5rem)] font-medium leading-[1] tracking-[-0.035em] text-ink">
            {profile.name.split(' ').map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-2 align-bottom">
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

          <Reveal delay={0.2} className="mt-5 max-w-2xl">
            <p className="text-lg leading-relaxed text-mute">{profile.summary}</p>
          </Reveal>

          <Reveal delay={0.6} className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
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

        {/* Profile photo: uploaded photo bundled for Vercel/GitHub */}
        <Reveal delay={0.3} className="w-full lg:col-span-4 order-last lg:order-none mt-6 lg:mt-0">
          <figure className="w-full max-w-xs md:max-w-sm lg:ml-auto">
            {photo ? (
              <div>
                <img
                  src={photo}
                  alt={profile.name}
                  className="block h-auto w-full max-h-[460px] object-contain border border-rule shadow-sm"
                />
                {isLocal && (
                  <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-mute">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="underline underline-offset-4 hover:text-ink"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="underline underline-offset-4 hover:text-ink"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                aria-label="Upload the image"
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 border border-dashed border-rule bg-wash text-mute transition-colors hover:border-ink hover:text-ink"
              >
                <Camera size={22} strokeWidth={1.5} />
                <span className="font-mono text-xs uppercase tracking-[0.2em]">
                  Upload the image
                </span>
              </button>
            )}
            {isLocal && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  data-testid="photo-input"
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                />
                {storageError && <p className="mt-2 text-xs text-signal font-mono">{storageError}</p>}
                <figcaption className="mt-1.5 text-[10px] font-mono text-mute">
                  Localhost preview
                </figcaption>
              </>
            )}
          </figure>
        </Reveal>
      </div>

      {/* Stats ledger */}
      <Reveal delay={0.7} className="mt-10 md:mt-12">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink pt-5 md:grid-cols-4">
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
