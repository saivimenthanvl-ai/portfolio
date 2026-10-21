import { motion } from 'motion/react';
import { Award, GraduationCap, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { certifications, education, experience, profile, skills } from '../data';
import { Magnetic, Marquee, Reveal, SectionTitle, SpotlightCard } from './Motion';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-4 py-24">
      <SectionTitle eyebrow="Where I've worked" title="Experience" />
      <div className="relative border-l border-white/10 pl-8">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.05} className="relative pb-10 last:pb-0">
            <motion.span
              className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 ring-4 ring-[#05060a]"
              whileInView={{ scale: [0, 1.4, 1] }}
              viewport={{ once: true }}
            />
            <SpotlightCard className="p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {e.role} <span className="font-normal text-slate-400">— {e.company}</span>
                </h3>
                <span className="font-mono text-xs text-cyan-300/80">{e.period}</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              {e.link && (
                <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-white hover:text-cyan-200">
                  <Github size={16} /> {e.link.label}
                </a>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  const all = skills.flatMap((s) => s.items);
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24">
      <SectionTitle eyebrow="Toolbox" title="Skills" />
      <Reveal className="mb-10">
        <Marquee items={all} />
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 2) * 0.1}>
            <SpotlightCard className="h-full p-6">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-cyan-300/80">{g.group}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-24">
      <SectionTitle eyebrow="Learning" title="Education & Certifications" />
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <SpotlightCard className="h-full space-y-5 p-6">
            <GraduationCap className="text-violet-300" />
            {education.map((e) => (
              <div key={e.title}>
                <h3 className="font-semibold text-white">{e.title}</h3>
                <p className="text-sm text-slate-400">
                  {e.place} · {e.period}
                </p>
              </div>
            ))}
          </SpotlightCard>
        </Reveal>
        <Reveal delay={0.1}>
          <SpotlightCard className="h-full space-y-5 p-6">
            <Award className="text-cyan-300" />
            {certifications.map((c) => (
              <div key={c.title}>
                <h3 className="font-semibold text-white">{c.title}</h3>
                <p className="text-sm text-slate-400">{c.meta}</p>
              </div>
            ))}
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-24 text-center">
      <SectionTitle eyebrow="Get in touch" title="Let's build something" />
      <Reveal className="flex flex-wrap items-center justify-center gap-4">
        <Magnetic>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-200">
            <Mail size={16} /> {profile.email}
          </a>
        </Magnetic>
        <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white hover:bg-white/10">
          <Phone size={16} /> {profile.phone}
        </a>
      </Reveal>
      <Reveal delay={0.1} className="mt-6 flex justify-center gap-4 text-slate-400">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
          <Github size={18} /> GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
          <Linkedin size={18} /> LinkedIn
        </a>
      </Reveal>
      <p className="mt-16 text-xs text-slate-600">© {new Date().getFullYear()} {profile.name}</p>
    </section>
  );
}
