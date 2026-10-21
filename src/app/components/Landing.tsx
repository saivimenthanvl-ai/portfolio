import { motion } from 'motion/react';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile, stats } from '../data';
import { CountUp, Magnetic, Reveal, Rotator, WordReveal } from './Motion';
import { ProfilePhoto } from './ProfilePhoto';

export function Landing() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
      <ProfilePhoto />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <MapPin size={12} /> {profile.location}
      </motion.p>

      <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
        <WordReveal text={profile.name} />
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-xl text-slate-300 md:text-2xl"
      >
        {profile.role} · <Rotator items={profile.tagline} />
      </motion.p>

      <Reveal delay={0.9} className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400">
        <p>{profile.summary}</p>
      </Reveal>

      <Reveal delay={1.0} className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Magnetic>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200"
          >
            View Projects
          </button>
        </Magnetic>
        <Magnetic>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Mail size={16} /> Contact Me
          </a>
        </Magnetic>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="rounded-full border border-white/15 p-3 text-slate-300 hover:text-white">
          <Github size={18} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="rounded-full border border-white/15 p-3 text-slate-300 hover:text-white">
          <Linkedin size={18} />
        </a>
      </Reveal>

      <Reveal delay={1.15} className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
            <div className="text-3xl font-semibold text-white">
              <CountUp to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </Reveal>

      <motion.div
        aria-hidden
        className="absolute bottom-6 text-slate-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}
