import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { Github, Moon, Sun } from 'lucide-react';
import { profile } from '../data';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  const flip = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

const links = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export function Masthead() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 px-5 py-3 md:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-sm font-medium tracking-tight text-ink"
        >
          {profile.name}<span className="text-signal">.</span>
        </button>

        <nav aria-label="Primary" className="order-last -mx-1 flex basis-full gap-5 overflow-x-auto pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:order-none md:basis-auto md:overflow-visible md:pt-0">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`relative whitespace-nowrap px-1 py-1 text-sm transition-colors ${active === l.id ? 'text-ink' : 'text-mute hover:text-ink'}`}
            >
              {l.label}
              {active === l.id && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-1 -bottom-0.5 h-px bg-signal" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
          >
            <Github size={16} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ index, title, kicker }: { index: string; title: string; kicker: string }) {
  return (
    <Reveal className="mb-10 flex items-end justify-between gap-6 border-b border-ink pb-4 md:mb-14">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-mute">
          {index} — {kicker}
        </p>
        <h2 className="text-4xl font-medium tracking-[-0.03em] text-ink md:text-6xl">{title}</h2>
      </div>
    </Reveal>
  );
}

export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setV(to);
      return;
    }
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: setV });
    return () => c.stop();
  }, [inView, to, reduce]);
  const shown = Number.isInteger(to) ? Math.round(v).toLocaleString('en-US') : v.toFixed(1);
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}
