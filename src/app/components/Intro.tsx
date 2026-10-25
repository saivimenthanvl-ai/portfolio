import { Fragment, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Camera, Github, Linkedin, Mail } from 'lucide-react';
import { profile, stats } from '../data';
import { CountUp, Reveal } from './Layout';

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

function crop(file: File, width = 800, height = 1000): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.max(width / img.width, height / img.height);
      const w = width / scale;
      const h = height / scale;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, (img.width - w) / 2, (img.height - h) / 2, w, h, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.86));
    };
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Owner-only photo. It lives in this browser's localStorage, so it is never
 * sent anywhere and visitors never see it or the upload control. Open the
 * site once with ?owner=1 to enable owner mode here (?owner=0 turns it off).
 */
function useOwnerPhoto() {
  const [isOwner, setIsOwner] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  useEffect(() => {
    const flag = new URLSearchParams(window.location.search).get('owner');
    if (flag === '1') write(OWNER_KEY, '1');
    if (flag === '0') write(OWNER_KEY, null);
    const owner = read(OWNER_KEY) === '1';
    setIsOwner(owner);
    if (owner) setPhoto(read(PHOTO_KEY));
  }, []);
  return { isOwner, photo, setPhoto };
}

function Portrait({ photo, setPhoto }: { photo: string | null; setPhoto: (p: string | null) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const onFile = async (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const data = await crop(file);
    write(PHOTO_KEY, data);
    setPhoto(data);
  };

  return (
    <figure className="w-full max-w-sm lg:ml-auto">
      <button
        type="button"
        aria-label={photo ? 'Change profile photo' : 'Upload profile photo'}
        onClick={() => input.current?.click()}
        className="group relative block aspect-[4/5] w-full overflow-hidden border border-dashed border-rule bg-wash transition-colors hover:border-ink"
      >
        {photo ? (
          <img src={photo} alt={profile.name} className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full flex-col items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute group-hover:text-ink">
            <Camera size={22} strokeWidth={1.5} />
            Upload photo
          </span>
        )}
      </button>
      <input ref={input} type="file" accept="image/*" className="hidden" data-testid="photo-input" onChange={(e) => onFile(e.target.files?.[0])} />
      <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-mute">
        <span>Only you can see this photo</span>
        {photo && (
          <button
            type="button"
            onClick={() => {
              write(PHOTO_KEY, null);
              setPhoto(null);
            }}
            className="underline underline-offset-4 hover:text-ink"
          >
            Remove
          </button>
        )}
      </figcaption>
    </figure>
  );
}

export function Intro() {
  const { isOwner, photo, setPhoto } = useOwnerPhoto();

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-16 pt-36 md:px-8">
      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className={isOwner ? 'lg:col-span-8' : 'lg:col-span-12'}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-mute"
          >
            {profile.role} — {profile.location}
          </motion.p>

          <h1 className="text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-ink">
            {profile.name.split(' ').map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>{' '}
              </Fragment>
            ))}
          </h1>

          <Reveal delay={0.5} className="mt-8 max-w-2xl">
            <p className="font-mono text-sm text-signal">{profile.tagline.join('  /  ')}</p>
            <p className="mt-4 text-lg leading-8 text-mute">{profile.summary}</p>
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

        {isOwner && (
          <Reveal delay={0.3} className="lg:col-span-4">
            <Portrait photo={photo} setPhoto={setPhoto} />
          </Reveal>
        )}
      </div>

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
