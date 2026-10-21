import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data';
import { Reveal, SectionTitle, SpotlightCard } from './Motion';

export function Showcase() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24">
      <SectionTitle eyebrow="Selected work" title="Projects" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1} className={i === 0 ? 'md:col-span-2' : ''}>
            <SpotlightCard className="h-full p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-cyan-300/80">{p.kind}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{p.title}</h3>
                </div>
                {p.metric && (
                  <div className="text-right">
                    <div className="bg-gradient-to-r from-violet-300 to-cyan-200 bg-clip-text text-2xl font-semibold text-transparent">
                      {p.metric.value}
                    </div>
                    <div className="max-w-[14rem] text-xs text-slate-400">{p.metric.label}</div>
                  </div>
                )}
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-5 text-sm font-medium">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-cyan-200">
                  <Github size={16} /> GitHub
                </a>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-cyan-200">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
