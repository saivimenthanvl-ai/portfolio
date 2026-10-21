import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';

/** Aurora blobs + faint grid, fixed behind the page. */
export function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#05060a]">
      <motion.div
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-violet-600/30 blur-[120px]"
        animate={{ x: [0, 120, 0], y: [0, 80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{ x: [0, -100, 0], y: [0, 120, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/20 blur-[120px]"
        animate={{ x: [0, 90, 0], y: [0, -90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400"
    />
  );
}

/** Words rise into place one after another. */
export function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15 + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Cycles through phrases with a blur-in/out swap. */
export function Rotator({ items }: { items: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 2600);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <span className="relative inline-block h-[1.4em] min-w-[16ch] text-left align-bottom">
      {items.map((item, idx) => (
        <motion.span
          key={item}
          className="absolute left-0 top-0 whitespace-nowrap bg-gradient-to-r from-violet-300 to-cyan-200 bg-clip-text text-transparent"
          initial={false}
          animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : 12, filter: idx === i ? 'blur(0px)' : 'blur(6px)' }}
          transition={{ duration: 0.5 }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">{eyebrow}</p>
      <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
    </Reveal>
  );
}

/** Card with a cursor-following spotlight and a gradient border on hover. */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const bg = useTransform([x, y], ([mx, my]) => `radial-gradient(380px circle at ${mx}px ${my}px, rgba(139,92,246,0.18), transparent 70%)`);
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(-300);
        y.set(-300);
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors hover:border-white/25 ${className}`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative">{children}</div>
    </div>
  );
}

export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  const shown = Number.isInteger(to) ? Math.round(v).toLocaleString('en-US') : v.toFixed(1);
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

/** Button that is gently pulled toward the cursor. */
export function Magnetic({ children }: { children: ReactNode }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/** Infinite horizontal marquee. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}
    >
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((s, i) => (
          <span key={i} className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300">
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
