'use client';

/**
 * Animated figure.
 *
 * Counts up once, when the element first enters the viewport. Two details
 * matter more than the animation itself:
 *
 *   - The final value is present in the DOM for assistive technology and for
 *     search engines, via an `aria-label` on the wrapper; the rolling digits
 *     are `aria-hidden`.
 *   - Under reduced motion the final value renders immediately, with no
 *     observer and no animation frame scheduled.
 */

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMotionAllowed } from '@/lib/motion';

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
  /** Rendered instead of the number when the source value is unknown. */
  placeholder?: string;
}

export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
  placeholder,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const motionAllowed = useMotionAllowed();
  const [display, setDisplay] = useState(motionAllowed ? 0 : value);

  useEffect(() => {
    if (!motionAllowed) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, motionAllowed, value, duration]);

  if (placeholder) {
    return (
      <span ref={ref} className={className} title="Figure pending — see content/trust.ts">
        {placeholder}
      </span>
    );
  }

  const formatted = `${prefix}${display.toLocaleString('en-GB')}${suffix}`;
  const final = `${prefix}${value.toLocaleString('en-GB')}${suffix}`;

  return (
    <span ref={ref} className={className} aria-label={final}>
      <span aria-hidden="true">{formatted}</span>
    </span>
  );
}
