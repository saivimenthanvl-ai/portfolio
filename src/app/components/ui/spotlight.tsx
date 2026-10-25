import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import { cn } from './utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: { bounce: number; duration?: number };
};

export function Spotlight({
  className = '',
  size = 400,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, springOptions);
  const springY = useSpring(mouseY, springOptions);

  const spotlightLeft = useTransform(springX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(springY, (y) => `${y - size / 2}px`);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;
    const { left, top } = parent.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;

    // Attach stable handler references so they cleanly detach
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-signal/15 via-mute/10 to-transparent blur-3xl"
        style={{
          width: size,
          height: size,
          left: spotlightLeft,
          top: spotlightTop,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}
