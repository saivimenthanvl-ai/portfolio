import { ArrowUpRight, Github, Linkedin, Phone } from 'lucide-react';
import { certifications, education, experience, profile, skills } from '../data';
import { Reveal, SectionHead } from './Layout';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8">
      <SectionHead index="02" kicker="Where I've worked" title="Experience" />
      <div>
        {experience.map((e) => (
          <Reveal key={e.company}>
            <article className="grid gap-4 border-t border-rule py-8 first:border-t-0 md:grid-cols-12 md:gap-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-mute md:col-span-3 md:pt-1.5">{e.period}</p>
              <div className="md:col-span-9">
                <h3 className="text-xl font-medium tracking-tight text-ink md:text-2xl">
                  {e.role} <span className="text-mute">— {e.company}</span>
                </h3>
                <ul className="mt-4 max-w-3xl space-y-3 text-[15px] leading-7 text-mute">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-4">
                      <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-signal" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {e.link && (
                  <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-signal">
                    <Github size={16} /> {e.link.label} <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8">
      <SectionHead index="03" kicker="Toolbox" title="Skills" />
      <dl>
        {skills.map((g) => (
          <Reveal key={g.group}>
            <div className="grid gap-3 border-t border-rule py-6 first:border-t-0 md:grid-cols-12 md:gap-8">
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-mute md:col-span-3 md:pt-1.5">{g.group}</dt>
              <dd className="text-lg leading-8 text-ink md:col-span-9 md:text-xl">{g.items.join('  /  ')}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8">
      <SectionHead index="04" kicker="Learning" title="Education & Certifications" />
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-mute">Education</h3>
          <ul>
            {education.map((e) => (
              <li key={e.title} className="border-t border-rule py-5 first:border-t-0 first:pt-0">
                <p className="text-lg font-medium text-ink">{e.title}</p>
                <p className="mt-1 text-sm text-mute">
                  {e.place} · {e.period}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-mute">Certifications</h3>
          <ul>
            {certifications.map((c) => (
              <li key={c.title} className="border-t border-rule py-5 first:border-t-0 first:pt-0">
                <p className="text-lg font-medium text-ink">{c.title}</p>
                <p className="mt-1 text-sm text-mute">{c.meta}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-12 pt-24 md:px-8">
      <SectionHead index="05" kicker="Get in touch" title="Contact" />
      <Reveal>
        <a
          href={`mailto:${profile.email}`}
          className="inline-block max-w-full [overflow-wrap:anywhere] text-[clamp(1.25rem,2.6vw,2rem)] font-normal leading-snug tracking-tight text-ink decoration-signal decoration-1 underline-offset-[0.2em] hover:underline"
        >
          {profile.email}
        </a>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-mute">
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-ink">
            <Phone size={16} /> {profile.phone}
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
            <Github size={16} /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </Reveal>
      <p className="mt-24 flex items-center justify-between border-t border-rule pt-5 font-mono text-[11px] uppercase tracking-widest text-mute">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </p>
    </section>
  );
}
