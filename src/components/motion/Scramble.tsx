'use client';

/**
 * Text scramble — the site's one concession to terminal aesthetics.
 *
 * Deliberately rationed: this is used on the hero eyebrow, section indices
 * and the recruiting flag, and nowhere else. Used everywhere it would read as
 * a screensaver; used three times it reads as a signature.
 *
 * Accessibility: the real string is always present in the accessibility tree
 * via `aria-label`, and the scrambling span is `aria-hidden`, so a screen
 * reader never announces the intermediate garbage.
 */

import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMotionAllowed } from '@/lib/motion';

const GLYPHS = '01!<>-_\\/[]{}—=+*^?#________';

interface ScrambleProps {
  text: string;
  className?: string;
  /** Milliseconds before the effect begins after entering view. */
  delay?: number;
  /** Frames each character spends scrambling before it settles. */
  intensity?: number;
  /** Re-run on hover of the nearest `[data-scramble-host]` ancestor. */
  hoverTrigger?: boolean;
  as?: 'span' | 'div' | 'p';
}

export function Scramble({
  text,
  className,
  delay = 0,
  intensity = 12,
  hoverTrigger = false,
  as: Tag = 'span',
}: ScrambleProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: !hoverTrigger, margin: '0px 0px -10% 0px' });
  const motionAllowed = useMotionAllowed();
  const [output, setOutput] = useState(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!motionAllowed || !inView) {
      setOutput(text);
      return;
    }

    let frame = 0;
    let timeout: ReturnType<typeof setTimeout>;

    // Each character gets a start and end frame, so the string resolves
    // left-to-right rather than all at once. The per-character step is capped
    // against a total budget: without it a 45-character eyebrow would take
    // three seconds to settle, which stops reading as a flourish and starts
    // reading as a page that has not finished loading.
    const TOTAL_FRAMES = 66; // ~1.1s at 60fps
    const step = Math.max(
      0.5,
      Math.min(intensity / 3, (TOTAL_FRAMES - intensity) / Math.max(text.length, 1)),
    );
    const schedule = text.split('').map((_, i) => ({
      start: Math.floor(i * step),
      end: Math.floor(i * step) + intensity,
    }));
    const lastFrame = schedule[schedule.length - 1]?.end ?? 0;

    const tick = () => {
      const next = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          const { start, end } = schedule[i];
          if (frame >= end) return char;
          if (frame < start) return '';
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setOutput(next);
      frame += 1;
      if (frame <= lastFrame) frameRef.current = requestAnimationFrame(tick);
      else setOutput(text);
    };

    timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, motionAllowed, text, delay, intensity]);

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </Tag>
  );
}
