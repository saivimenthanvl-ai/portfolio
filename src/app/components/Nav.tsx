import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin } from 'lucide-react';
import { profile } from '../data';

const links = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/** Floating pill nav with a sliding highlight that follows the section in view. */
export function Nav() {
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
    <motion.nav
      aria-label="Primary"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-4 z-50 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl"
    >
      {links.map((l) => (
        <button
          key={l.id}
          onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })}
          className="relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-slate-300 transition-colors hover:text-white"
        >
          {active === l.id && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 rounded-full bg-white/10"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative">{l.label}</span>
        </button>
      ))}
      <span className="mx-1 h-5 w-px bg-white/15" />
      <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full p-2 text-slate-300 hover:text-white">
        <Github size={16} />
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full p-2 text-slate-300 hover:text-white">
        <Linkedin size={16} />
      </a>
    </motion.nav>
  );
}
