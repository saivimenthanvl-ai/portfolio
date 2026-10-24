import { ExternalLink, Github, Terminal, CheckCircle2, Cpu, Database } from 'lucide-react';
import { projects } from '../data';
import { Reveal, SectionTitle, SpotlightCard } from './Motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

export function Showcase() {
  const [featured, ...otherProjects] = projects;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <SectionTitle eyebrow="Selected work" title="Projects" />

      {/* Featured Project: ASCRA with ContainerScroll */}
      <div className="mb-14">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-2">
                Featured Flagship System
              </span>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                {featured.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-slate-300 max-w-xl">
                {featured.kind}
              </p>
            </div>
          }
        >
          <div className="flex flex-col h-full justify-between gap-6">
            {/* Header / Metric Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-violet-400" />
                <span className="font-mono text-xs text-slate-300">Qwen3-4B Instruction Fine-Tuning</span>
              </div>
              {featured.metric && (
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1">
                  <span className="bg-gradient-to-r from-violet-300 to-cyan-200 bg-clip-text text-sm font-semibold text-transparent">
                    {featured.metric.value}
                  </span>
                  <span className="text-xs text-slate-400">{featured.metric.label}</span>
                </div>
              )}
            </div>

            {/* Industrial Production Evaluation Dashboard & Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-violet-400">
                  <Terminal size={18} />
                  <span className="font-mono text-xs uppercase text-slate-400">Output Quality</span>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-1">Valid JSON records (200/200 eval)</div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-cyan-400">
                  <CheckCircle2 size={18} />
                  <span className="font-mono text-xs uppercase text-slate-400">Exact Match</span>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-bold text-white">92.5%</div>
                  <div className="text-xs text-slate-400 mt-1">185/200 baseline exact match</div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-fuchsia-400">
                  <Database size={18} />
                  <span className="font-mono text-xs uppercase text-slate-400">Dataset Scale</span>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-bold text-white">82,400</div>
                  <div className="text-xs text-slate-400 mt-1">80k train / 1.2k val / 1.2k test</div>
                </div>
              </div>
            </div>

            {/* Problem → Method → Result details */}
            <div className="rounded-xl border border-white/10 bg-[#070912]/80 p-5 font-mono text-xs space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-violet-400 font-bold uppercase tracking-wider shrink-0 w-16">[Method]</span>
                <span className="text-slate-300">
                  PEFT LoRA (rank 16), 4-bit NF4 QLoRA / bf16 LoRA, answer-only loss masking for 13-field JSON incident records.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold uppercase tracking-wider shrink-0 w-16">[Generalize]</span>
                <span className="text-slate-300">
                  62.5% (25/40) accuracy retained on entirely unseen synthetic supplier communications.
                </span>
              </div>
            </div>

            {/* Tags and Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-cyan-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Github size={16} /> GitHub
                </a>
                {featured.demo && (
                  <a
                    href={featured.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-cyan-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* Remaining 3 Projects Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {otherProjects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <SpotlightCard className="h-full p-6 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-cyan-300/80">{p.kind}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{p.title}</h3>
                {p.metric && (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">
                    <span className="bg-gradient-to-r from-violet-300 to-cyan-200 bg-clip-text text-sm font-semibold text-transparent">
                      {p.metric.value}
                    </span>
                    <span className="text-xs text-slate-400">{p.metric.label}</span>
                  </div>
                )}
                <ul className="mt-4 space-y-2.5 text-xs leading-6 text-slate-300">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-medium">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white hover:text-cyan-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Github size={14} /> GitHub
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white hover:text-cyan-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
