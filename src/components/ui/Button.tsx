'use client';

/**
 * Action element.
 *
 * Renders as `<a>` when given an `href` and `<button>` otherwise, so the
 * semantics always match the behaviour — a link that navigates is a link, and
 * a control that acts is a button. Primary actions get a magnetic lean; every
 * variant keeps a visible focus ring inherited from `:focus-visible` in
 * globals.css.
 */

import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Magnetic } from '@/components/motion/Magnetic';
import { cx } from '@/lib/utils';

type Variant = 'solid' | 'outline' | 'quiet' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  solid:
    'bg-brand-700 text-white hover:bg-brand-600 dark:bg-brand-500 dark:hover:bg-brand-400 dark:hover:text-ink-950 shadow-[0_0_0_0_var(--glow)] hover:shadow-[0_0_36px_-4px_var(--glow)]',
  outline:
    'border border-rule-strong text-fg hover:border-accent hover:text-accent hover:bg-accent-wash',
  quiet: 'bg-surface-panel text-fg hover:bg-surface-sunk border border-rule',
  ghost: 'text-fg-muted hover:text-accent',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4',
  md: 'h-11 px-5',
  lg: 'h-14 px-7 text-[0.78rem]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Label shown by the cursor companion on hover. */
  cursorLabel?: string;
  /** Disables the magnetic lean (used inside dense rows). */
  flat?: boolean;
}

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & { href?: undefined };

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children' | 'href'> & { href: string };

export function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = 'solid',
    size = 'md',
    className,
    children,
    cursorLabel,
    flat = false,
    ...rest
  } = props;

  const classes = cx(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'solid' && (
        // Sweep highlight: purely decorative, disabled by the global
        // reduced-motion block because it animates via transition only.
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as ComponentPropsWithoutRef<'a'>;
    const external = /^(https?:|mailto:|tel:)/.test(props.href);
    const anchor = external ? (
      <a
        href={props.href}
        className={cx(classes, 'overflow-hidden')}
        data-cursor={cursorLabel}
        rel={props.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        target={props.href.startsWith('http') ? '_blank' : undefined}
        {...anchorRest}
      >
        {content}
      </a>
    ) : (
      <Link
        href={props.href}
        className={cx(classes, 'overflow-hidden')}
        data-cursor={cursorLabel}
        {...anchorRest}
      >
        {content}
      </Link>
    );

    return flat ? anchor : <Magnetic strength={6}>{anchor}</Magnetic>;
  }

  const button = (
    <button
      className={cx(classes, 'overflow-hidden')}
      data-cursor={cursorLabel}
      {...(rest as ComponentPropsWithoutRef<'button'>)}
    >
      {content}
    </button>
  );

  return flat ? button : <Magnetic strength={6}>{button}</Magnetic>;
}
