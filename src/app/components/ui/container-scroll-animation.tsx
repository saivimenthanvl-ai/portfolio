import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'motion/react';

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 1] : [1.02, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.6], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <div
      className="relative flex items-center justify-center p-2 md:p-10 w-full overflow-x-hidden max-w-full"
      ref={containerRef}
    >
      <div
        className="w-full max-w-full relative py-6 md:py-12 overflow-x-hidden"
        style={{
          perspective: prefersReducedMotion ? 'none' : '1000px',
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} prefersReducedMotion={prefersReducedMotion} />
        <Card rotate={rotate} translate={translate} scale={scale} prefersReducedMotion={prefersReducedMotion}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
  prefersReducedMotion,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
  prefersReducedMotion: boolean;
}) => {
  if (prefersReducedMotion) {
    return <div className="max-w-5xl mx-auto text-center">{titleComponent}</div>;
  }
  return (
    <motion.div
      style={{
        y: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  prefersReducedMotion,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  prefersReducedMotion: boolean;
}) => {
  if (prefersReducedMotion) {
    return (
      <div className="max-w-5xl w-full max-w-full -mt-6 mx-auto border-2 md:border-4 border-rule p-2 md:p-6 bg-paper rounded-2xl md:rounded-[24px] shadow-2xl">
        <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-wash/50 p-3 md:p-6 text-ink">
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 20px 40px -15px rgba(0,0,0,0.2), 0 0 0 1px var(--rule)',
      }}
      className="max-w-5xl w-full max-w-full -mt-6 mx-auto border-2 md:border-4 border-rule p-2 md:p-6 bg-paper rounded-2xl md:rounded-[24px]"
    >
      <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-wash/50 p-3 md:p-6 text-ink">
        {children}
      </div>
    </motion.div>
  );
};
