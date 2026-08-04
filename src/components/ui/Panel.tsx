'use client';

/**
 * Instrument panel — the base surface for cards across the site.
 *
 * Three deliberate details:
 *   - `ticked` corner marks (see globals.css) give the surface the feel of a
 *     measurement instrument rather than a generic rounded card.
 *   - Hover raises the border to the accent and lifts the panel 2px. The lift
 *     uses `transform`, which is why reveals only ever animate `translate`.
 *   - A pointer-tracked glow follows the cursor across the panel; it is a CSS
 *     custom property update, not a re-render, and is skipped when motion is
 *     reduced or the pointer is coarse.
 */

import { useRef, type ReactNode } from 'react';
import { useMediaQuery, useMotionAllowed } from '@/lib/motion';
import { cx } from '@/lib/utils';

interface PanelProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li' | 'section';
  /** Adds the corner ticks. */
  ticks?: boolean;
  /** Enables hover lift + accent border. Off for static content panels. */
  interactive?: boolean;
  /** Enables the pointer-tracked glow. Requires `interactive`. */
  glow?: boolean;
}

export function Panel({
  children,
  className,
  as: Tag = 'div',
  ticks = true,
  interactive = true,
  glow = true,
}: PanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionAllowed = useMotionAllowed();
  const finePointer = useMediaQuery('(pointer: fine)');
  const glowEnabled = glow && interactive && motionAllowed && finePointer;

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--px', `${event.clientX - rect.left}px`);
    node.style.setProperty('--py', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onPointerMove={glowEnabled ? handleMove : undefined}
      className={cx(
        'relative isolate overflow-hidden border border-rule bg-surface-raised',
        ticks && 'ticked',
        interactive &&
          'transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface-panel',
        className,
      )}
    >
      {glowEnabled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 [background:radial-gradient(220px_circle_at_var(--px,50%)_var(--py,50%),var(--glow),transparent_70%)] group-hover:opacity-100 hover:opacity-100"
        />
      )}
      {children}
    </Tag>
  );
}
