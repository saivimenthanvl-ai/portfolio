import React, { Suspense, lazy, useState, useEffect, useRef, Component } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface SplineErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<SplineErrorBoundaryProps, SplineErrorBoundaryState> {
  constructor(props: SplineErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Spline 3D Scene failed to load, falling back to static poster:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
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
      return () => {
        motionQuery.removeEventListener('change', onMotionChange);
      };
    }

    // Lazy load only when in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    if ('requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        setShouldLoad(true);
      });
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => setShouldLoad(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, prefersReducedMotion]);

  const staticPoster = (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-wash/30 rounded-2xl border border-rule/50">
      <div className="absolute inset-0 bg-radial from-signal/10 via-wash/20 to-transparent blur-2xl pointer-events-none" />
      <div className="relative flex flex-col items-center justify-center p-6 text-center">
        <div className="h-40 w-40 sm:h-48 sm:w-48 rounded-full border border-rule bg-wash/80 p-2 shadow-xl backdrop-blur-md flex items-center justify-center">
          <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full border border-signal/30 bg-gradient-to-tr from-wash to-paper flex flex-col items-center justify-center p-2">
            <span className="font-mono text-xs font-semibold text-signal uppercase tracking-widest">3D SCENE</span>
            <span className="font-mono text-[10px] text-mute mt-1">Interactive Core</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden pointer-events-auto ${className ?? ''}`}
      data-testid="spline-scene-container"
    >
      {prefersReducedMotion || !shouldLoad ? (
        staticPoster
      ) : (
        <SplineErrorBoundary fallback={staticPoster}>
          <Suspense
            fallback={
              <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-wash/20 rounded-2xl border border-rule/40">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-signal border-t-transparent animate-spin" />
                  <span className="font-mono text-xs text-mute">Loading 3D asset...</span>
                </div>
              </div>
            }
          >
            <Spline
              scene={scene}
              className="w-full h-full"
            />
          </Suspense>
        </SplineErrorBoundary>
      )}
    </div>
  );
}

