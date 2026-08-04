'use client';

/**
 * Scroll reveal.
 *
 * Animates `opacity` and `translate` only — never `transform` — so that hover
 * states, which own `transform`, are not overwritten mid-interaction. This is
 * a rule inherited from the previous site's stylesheet and it is still right.
 *
 * Under reduced motion the element renders in its final state with no
 * observer attached at all.
 */

import { motion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { easeOutExpo, useMotionAllowed } from '@/lib/motion';

/**
 * Polymorphic render tag. Constraining the props means TypeScript can verify
 * `className` and `children` reach whatever element the caller passes,
 * whether that is an intrinsic tag or a component.
 */
type PolyTag = ElementType<{ className?: string; children?: ReactNode }>;

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  /** Render element. Defaults to a div; pass `li`, `section`, … when semantics demand it. */
  as?: ElementType;
  className?: string;
  /** Seconds. Use small values — stagger should be felt, not watched. */
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Travel distance in pixels. */
  distance?: number;
  /** Re-animate every time the element enters the viewport. */
  repeat?: boolean;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  as = 'div',
  className,
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 22,
  repeat = false,
}: RevealProps) {
  const motionAllowed = useMotionAllowed();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!motionAllowed) {
    const Tag = as as PolyTag;
    return <Tag className={className}>{children}</Tag>;
  }

  const { x, y } = offsets[direction];
  const variants: Variants = {
    hidden: {
      opacity: 0,
      translateX: x * distance,
      translateY: y * distance,
    },
    shown: {
      opacity: 1,
      translateX: 0,
      translateY: 0,
      transition: { duration, delay, ease: easeOutExpo },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: !repeat, margin: '0px 0px -12% 0px' }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children. Children must be `RevealItem`s (or any element
 * consuming the `item` variants) for the stagger to reach them.
 */
export function RevealGroup({
  children,
  className,
  as = 'div',
  stagger = 0.07,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  stagger?: number;
  delay?: number;
}) {
  const motionAllowed = useMotionAllowed();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!motionAllowed) {
    const Tag = as as PolyTag;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </MotionTag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, translateY: 18 },
  shown: { opacity: 1, translateY: 0, transition: { duration: 0.65, ease: easeOutExpo } },
};

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const motionAllowed = useMotionAllowed();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!motionAllowed) {
    const Tag = as as PolyTag;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
