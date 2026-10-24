import React, { Suspense, lazy, useState, useEffect } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);

    // Defer on slow connections (save-data or 2g) or mobile width (< 768px) to protect LCP & data
    const nav = navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } };
    const isSaveData = Boolean(nav.connection?.saveData);
    const isSlowConn = nav.connection?.effectiveType === 'slow-2g' || nav.connection?.effectiveType === '2g';
    const isSmallScreen = window.innerWidth < 768;

    if (motionQuery.matches || isSaveData || isSlowConn || isSmallScreen) {
      // Don't auto-mount heavy 3D scene on restricted conditions
      return () => {
        motionQuery.removeEventListener('change', onMotionChange);
      };
    }

    // Lazy load after first paint / idle
    if ('requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        setShouldLoad(true);
      });
      return () => {
        motionQuery.removeEventListener('change', onMotionChange);
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => setShouldLoad(true), 250);
      return () => {
        motionQuery.removeEventListener('change', onMotionChange);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-auto ${className ?? ''}`}
      data-testid="spline-scene-container"
    >
      {prefersReducedMotion || !shouldLoad ? (
        // Static decorative fallback / fixed-height skeleton avoiding CLS
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-radial from-violet-500/15 via-cyan-500/10 to-transparent blur-2xl" />
          <div className="relative flex flex-col items-center justify-center p-6 text-center">
            <div className="h-44 w-44 rounded-full border border-violet-400/30 bg-gradient-to-tr from-violet-950/40 via-cyan-950/20 to-slate-900/60 p-1 shadow-2xl shadow-violet-500/10 backdrop-blur-md flex items-center justify-center">
              <div className="h-32 w-32 rounded-full border border-cyan-400/25 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 flex items-center justify-center">
                <span className="font-mono text-xs text-cyan-300/80 tracking-widest uppercase">AI · 3D</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-radial from-violet-500/15 via-cyan-500/10 to-transparent blur-2xl animate-pulse" />
              <div className="h-44 w-44 rounded-full border border-violet-400/20 bg-slate-900/50 backdrop-blur-md" />
            </div>
          }
        >
          <Spline
            scene={scene}
            className="w-full h-full"
          />
        </Suspense>
      )}
    </div>
  );
}
