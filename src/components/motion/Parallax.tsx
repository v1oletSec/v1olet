'use client';

/**
 * Scroll parallax.
 *
 * Uses framer-motion's scroll progress rather than a scroll listener, so the
 * transform runs off the compositor and does not force layout on every frame.
 * `speed` is a fraction of the element's own travel: 0.15 is subtle, 0.4 is
 * as far as this design goes before it reads as a gimmick.
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useMotionAllowed } from '@/lib/motion';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Positive moves against the scroll, negative moves with it. */
  speed?: number;
  /** Also fade as the element leaves the viewport. */
  fade?: boolean;
}

export function Parallax({ children, className, speed = 0.18, fade = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionAllowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.35, 1, 1, 0.35]);

  if (!motionAllowed) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity: fade ? opacity : undefined }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Reads overall page scroll as a 0–1 value and exposes it through a render
 * prop. Used by the progress rail in the header.
 */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
