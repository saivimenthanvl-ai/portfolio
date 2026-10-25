import { ArrowUpRight, Github } from 'lucide-react';
import { profile, projects } from '../data';
import { Reveal, SectionHead } from './Layout';

export function Work() {
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8">
      <SectionHead index="01" kicker="Selected work" title="Projects" />

      <div>
        {projects.map((p, i) => (
          <Reveal key={p.title}>
            <article className="group grid gap-6 border-t border-rule py-10 transition-colors first:border-t-0 md:grid-cols-12 md:gap-8">
              <div className="font-mono text-xs text-mute md:col-span-1 md:pt-2">{String(i + 1).padStart(2, '0')}</div>

              <div className="md:col-span-4">
                <h3 className="text-2xl font-medium tracking-[-0.02em] text-ink md:text-3xl">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="decoration-signal underline-offset-8 hover:underline">
                    {p.title}
                  </a>
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-mute">{p.kind}</p>
                {p.metric && (
                  <p className="mt-6 text-ink">
                    <span className="block text-3xl font-medium tracking-tight">{p.metric.value}</span>
                    <span className="text-xs text-mute">{p.metric.label}</span>
                  </p>
                )}
              </div>

              <div className="md:col-span-5">
                <div className="space-y-3 text-[15px] leading-7 text-mute">
                  {p.points.map((pt) => (
                    <p key={pt}>{pt}</p>
                  ))}
                </div>
                <p className="mt-5 font-mono text-xs leading-6 text-ink">{p.tags.join('  /  ')}</p>
              </div>

              <div className="flex flex-row gap-6 text-sm font-medium md:col-span-2 md:flex-col md:items-end md:gap-3">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink hover:text-signal">
                  <Github size={16} /> GitHub
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mute hover:text-signal">
                    Live Demo <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="border-t border-ink pt-6">
        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-mute hover:text-signal"
        >
          All repositories on GitHub <ArrowUpRight size={14} />
        </a>
      </Reveal>
    </section>
  );
}
