'use client';

/**
 * Section heading — the repeated structural device of the whole site.
 *
 * A monospaced index in the margin, a hairline rule, an eyebrow, the heading,
 * and optional supporting prose. Using one component everywhere is what makes
 * eight very different sections read as one document.
 */

import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { Scramble } from '@/components/motion/Scramble';
import { cx } from '@/lib/utils';

interface SectionHeadProps {
  /** Two-digit index rendered in the margin, e.g. "03". */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Heading level. Sections use h2; the hero owns the single h1. */
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}

export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  as: Tag = 'h2',
  align = 'left',
  className,
  children,
}: SectionHeadProps) {
  return (
    <div
      className={cx(
        'relative',
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className,
      )}
    >
      {index && (
        <span
          aria-hidden="true"
          className="numeric absolute -left-16 top-1 hidden text-xs text-fg-faint/60 xl:block"
        >
          {index}
        </span>
      )}

      <Reveal>
        <div className={cx('flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          <Scramble text={eyebrow} className="label text-accent" intensity={9} />
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <Tag className="mt-5 text-balance text-3xl uppercase sm:text-4xl lg:text-[2.75rem]">
          {title}
        </Tag>
      </Reveal>

      {lede && (
        <Reveal delay={0.1}>
          <p
            className={cx(
              'mt-5 max-w-2xl text-base leading-relaxed text-fg-muted',
              align === 'center' && 'mx-auto',
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}
