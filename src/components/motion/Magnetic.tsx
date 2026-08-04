'use client';

/**
 * Magnetic hover.
 *
 * The element leans a few pixels toward the cursor while it is inside a
 * padded hit area, then springs back. Applied to primary actions only —
 * everything being magnetic is the same as nothing being magnetic.
 *
 * Skipped entirely under reduced motion and on coarse pointers, where there
 * is no cursor to lean toward and the listeners would be dead weight.
 */

import { motion, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useMediaQuery, useMotionAllowed } from '@/lib/motion';
import { clamp } from '@/lib/utils';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Maximum displacement in pixels. */
  strength?: number;
}

export function Magnetic({ children, className, strength = 10 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionAllowed = useMotionAllowed();
  const finePointer = useMediaQuery('(pointer: fine)');

  const x = useSpring(0, { stiffness: 260, damping: 22, mass: 0.6 });
  const y = useSpring(0, { stiffness: 260, damping: 22, mass: 0.6 });

  const enabled = motionAllowed && finePointer;

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(clamp((dx / rect.width) * strength * 2, -strength, strength));
    y.set(clamp((dy / rect.height) * strength * 2, -strength, strength));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.span>
  );
}
