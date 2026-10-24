import { motion } from 'motion/react';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '../data';
import { Magnetic, Reveal, Rotator, WordReveal } from './Motion';
import { ProfilePhoto } from './ProfilePhoto';
import { Spotlight } from './ui/spotlight';
import { SplineScene } from './ui/splite';

export function Landing() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-24 md:pt-28 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={500} />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-7">
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

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <WordReveal text={profile.name} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-lg text-slate-300 sm:text-xl md:text-2xl"
          >
            {profile.role} · <Rotator items={profile.tagline} />
          </motion.p>

          <Reveal delay={0.9} className="mt-5 max-w-xl text-sm md:text-base leading-relaxed text-slate-400">
            <p>{profile.summary}</p>
          </Reveal>

          <Reveal delay={1.0} className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Magnetic>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View Projects
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Mail size={16} /> Contact Me
              </a>
            </Magnetic>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="rounded-full border border-white/15 p-3 text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-full border border-white/15 p-3 text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Linkedin size={18} />
            </a>
          </Reveal>
        </div>

        {/* Right Column: 3D Scene */}
        <div className="w-full lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[520px] relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex items-center justify-center p-2 shadow-2xl">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-4 text-slate-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}
