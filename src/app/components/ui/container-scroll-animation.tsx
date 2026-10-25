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
      <div className="max-w-5xl w-full max-w-full -mt-6 mx-auto border-2 md:border-4 border-[#2d2948] p-2 md:p-6 bg-[#090b14] rounded-2xl md:rounded-[24px] shadow-2xl">
        <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-[#0d0f1b] p-3 md:p-6">
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
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-5xl w-full max-w-full -mt-6 mx-auto border-2 md:border-4 border-[#2d2948] p-2 md:p-6 bg-[#090b14] rounded-2xl md:rounded-[24px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-[#0d0f1b] p-3 md:p-6">
        {children}
      </div>
    </motion.div>
  );
};
