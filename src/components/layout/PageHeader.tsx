'use client';

/**
 * Inner-page masthead.
 *
 * Every route below the landing page opens the same way: breadcrumb, eyebrow,
 * title, lede, optional meta row. The repetition is the point — it is what
 * makes eleven routes feel like one site rather than eleven landing pages.
 */

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { Scramble } from '@/components/motion/Scramble';

interface Crumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  crumbs?: Crumb[];
  /** Small key/value pairs rendered under the lede. */
  meta?: Array<{ label: string; value: ReactNode }>;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, lede, crumbs = [], meta, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-rule pt-32 pb-12 lg:pt-40 lg:pb-16">
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      {/* Brand wash, anchored to the top-left so it does not fight the copy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(closest-side, var(--glow), transparent 70%)' }}
      />

      <div className="shell relative">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-fg-faint">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href={crumb.href} className="transition-colors hover:text-accent">
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          <Scramble text={eyebrow} className="label text-accent" />
        </div>

        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-[20ch] text-balance text-[clamp(2.25rem,5vw,3.75rem)] uppercase leading-[1]">
            {title}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted">{lede}</p>
          </Reveal>
        )}

        {meta && meta.length > 0 && (
          <Reveal delay={0.15}>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="label text-[0.55rem] text-fg-faint">{item.label}</dt>
                  <dd className="numeric mt-1.5 text-sm text-fg">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {children}
      </div>
    </header>
  );
}
