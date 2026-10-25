import React from 'react';
import { motion } from 'motion/react';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';
import { ContainerScroll } from './ui/container-scroll-animation';
import { ArrowLeft, Terminal, CheckCircle2, Database, Github, ExternalLink, Cpu, Layers } from 'lucide-react';
import { projects } from '../data';

import { ThemeToggle } from './Layout';

export function DemoPage() {
  const featured = projects[0];

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-signal selection:text-paper">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mute hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </a>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 font-mono text-xs text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" /> Interactive Demos
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        {/* ========================================================= */}
        {/* DEMO 1: Spline 3D Hero Scene with ibelick Spotlight       */}
        {/* ========================================================= */}
        <section
          aria-labelledby="demo-spline-heading"
          className="relative rounded-3xl border border-rule bg-wash/30 p-6 md:p-12 overflow-hidden"
        >
          {/* Spotlight attached to the relative parent */}
          <Spotlight className="-top-32 left-0 md:left-40 md:-top-20" size={480} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side copy */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-signal">
                Interactive Component 01
              </span>
              <h1 id="demo-spline-heading" className="text-3xl md:text-5xl font-semibold tracking-tight text-ink">
                Spline 3D Scene + Cursor Spotlight
              </h1>
              <p className="text-sm md:text-base text-mute leading-relaxed">
                A fully responsive 3D asset container with cursor-following spotlight. Built with
                error boundaries, poster fallback, lazy view-port loading, and full respect for
                <code className="mx-1 px-1.5 py-0.5 rounded bg-wash border border-rule font-mono text-xs">prefers-reduced-motion</code>.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-rule bg-paper font-mono text-xs text-mute">
                  <Cpu size={12} className="text-signal" /> WebGL Runtime
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-rule bg-paper font-mono text-xs text-mute">
                  <Layers size={12} className="text-signal" /> Spring Physics
                </span>
              </div>
            </div>

            {/* Right side 3D container with explicit height */}
            <div className="w-full lg:col-span-6 h-[380px] sm:h-[440px] md:h-[500px] relative rounded-2xl border border-rule bg-paper/60 backdrop-blur-sm flex items-center justify-center p-2 shadow-lg overflow-hidden">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* DEMO 2: ContainerScroll Showcase                          */}
        {/* ========================================================= */}
        <section aria-labelledby="demo-scroll-heading" className="relative space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-signal">
              Interactive Component 02
            </span>
            <h2 id="demo-scroll-heading" className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              Container Scroll Animation
            </h2>
            <p className="text-sm md:text-base text-mute">
              Scroll-linked 3D perspective rotation and scaling mapped to the viewport progress.
            </p>
          </div>

          <ContainerScroll
            titleComponent={
              <div className="space-y-2 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-mute">Production Evaluation Card</span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-ink">{featured.title}</h3>
                <p className="text-sm text-mute max-w-xl mx-auto">{featured.tagline}</p>
              </div>
            }
          >
            <div className="space-y-6">
              {/* Header inside card */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-signal">{featured.kind}</span>
                  <h4 className="text-xl font-semibold text-ink">{featured.title}</h4>
                </div>
                {featured.metric && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-xs text-signal font-semibold">
                    <span>{featured.metric.value}</span>
                    <span className="text-mute font-normal">{featured.metric.label}</span>
                  </div>
                )}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-rule bg-paper p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-signal">
                    <Terminal size={16} />
                    <span className="font-mono text-xs uppercase text-mute">Output Quality</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-bold text-ink">100%</div>
                    <div className="text-xs text-mute mt-1">Valid JSON records (200/200 eval)</div>
                  </div>
                </div>

                <div className="rounded-xl border border-rule bg-paper p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-signal">
                    <CheckCircle2 size={16} />
                    <span className="font-mono text-xs uppercase text-mute">Exact Match</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-bold text-ink">92.5%</div>
                    <div className="text-xs text-mute mt-1">185/200 baseline exact match</div>
                  </div>
                </div>

                <div className="rounded-xl border border-rule bg-paper p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-signal">
                    <Database size={16} />
                    <span className="font-mono text-xs uppercase text-mute">Dataset Scale</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-bold text-ink">82,400</div>
                    <div className="text-xs text-mute mt-1">80k train / 1.2k val / 1.2k test</div>
                  </div>
                </div>
              </div>

              {/* Technical summary */}
              <div className="rounded-xl border border-rule bg-paper/60 p-4 font-mono text-xs space-y-2 text-mute">
                <div>
                  <strong className="text-ink">[Method]</strong> PEFT LoRA (rank 16), 4-bit NF4 QLoRA / bf16 LoRA, answer-only loss masking.
                </div>
                <div>
                  <strong className="text-ink">[Generalize]</strong> 62.5% (25/40) accuracy retained on unseen synthetic supplier communications.
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-rule bg-paper px-2.5 py-0.5 font-mono text-xs text-mute"
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
                    className="inline-flex items-center gap-1.5 text-ink hover:text-signal transition-colors"
                  >
                    <Github size={15} /> GitHub
                  </a>
                  {featured.demo && (
                    <a
                      href={featured.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ink hover:text-signal transition-colors"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ContainerScroll>
        </section>

        {/* Footer spacer */}
        <div className="pb-16 text-center text-xs font-mono text-mute">
          Sai Vimenthan V L · Interactive UI Demonstrations
        </div>
      </main>
    </div>
  );
}
