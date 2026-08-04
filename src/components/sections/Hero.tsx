'use client';

/**
 * Hero.
 *
 * The composition is a readout, not a poster: wordmark, claim, and a
 * right-hand instrument panel carrying figures that are all derived from
 * `content/events.ts` and `content/roster.ts`. Nothing in the panel is a
 * hardcoded number, which is the point — the previous site's hero claimed
 * "11 competitions" while its data file listed six.
 *
 * The 3D bloom sits behind everything at -z-10 and is gated by `SceneGate`.
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { Scramble } from '@/components/motion/Scramble';
import { SceneGate } from '@/components/three/SceneGate';
import { Button } from '@/components/ui/Button';
import { Wordmark } from '@/components/layout/Wordmark';
import { competitionCount, bestPlacement, largestField } from '@content/events';
import { roster } from '@content/roster';
import { contact, site, socials } from '@content/site';
import { useMotionAllowed } from '@/lib/motion';
import { mailto, splitOrdinal } from '@/lib/utils';

const assurances = [
  'Retest included',
  'Named operators, no subcontracting',
  'Findings as you go, not at the end',
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const motionAllowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const best = splitOrdinal(bestPlacement.rank);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pt-32"
      aria-labelledby="hero-heading"
    >
      <SceneGate />

      {/* Engineering grid, faded at the edges so it frames rather than tiles. */}
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="shell w-full">
        <motion.div
          style={motionAllowed ? { y: copyY, opacity: copyOpacity } : undefined}
          className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20"
        >
          {/* ---------------------------------------------------- claim --- */}
          <div>
            <Reveal direction="none">
              <Wordmark variant="hero" className="h-20 w-fit sm:h-24 lg:h-28" priority />
            </Reveal>

            <div className="mt-8 flex items-center gap-3">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-[pulse-ring_2.4s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <Scramble text={`${site.tagline} · available for engagements`} className="label text-accent" />
            </div>

            <Reveal delay={0.05}>
              <h1
                id="hero-heading"
                className="mt-6 max-w-[19ch] text-balance text-[clamp(2rem,5.2vw,4rem)] uppercase leading-[0.98]"
              >
                {site.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
                v1olet runs penetration tests, red team operations, and vulnerability research for
                teams that ship fast. Every finding comes reproducible, with a working proof of
                concept and a retest once you have fixed it.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  href={mailto(contact.email, contact.engagementSubject)}
                  size="lg"
                  cursorLabel="email us"
                >
                  Request an engagement
                </Button>
                <Button href="/services/" variant="outline" size="lg">
                  Explore engagements
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {assurances.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-fg-muted">
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 shrink-0 text-accent"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path d="m3 8.5 3.2 3.2L13 5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ------------------------------------------------- readout --- */}
          <Reveal direction="left" delay={0.1}>
            <aside
              className="ticked relative border border-rule bg-surface-raised/85 backdrop-blur-md"
              aria-label="Team record at a glance"
            >
              <header className="flex items-center justify-between border-b border-rule px-5 py-3">
                <span className="label text-fg-faint">Record · live from data</span>
                <span className="numeric text-[0.65rem] text-accent">v1olet.xyz</span>
              </header>

              <dl className="divide-y divide-[var(--rule)]">
                <Figure label="Competitions recorded">
                  <Counter value={competitionCount} />
                </Figure>
                <Figure label={`Best placement · ${bestPlacement.name}`}>
                  <span className="inline-flex items-start">
                    <Counter value={Number(best.value)} />
                    <span className="ml-0.5 mt-1 text-base text-accent">{best.suffix}</span>
                  </span>
                </Figure>
                <Figure label="Largest field faced">
                  <Counter value={largestField} suffix="+" />
                </Figure>
                <Figure label="Operators on the bench">
                  <Counter value={roster.length} />
                </Figure>
              </dl>

              <footer className="flex items-center justify-between gap-3 border-t border-rule px-5 py-3">
                <span className="text-xs text-fg-faint">Independently verifiable</span>
                <a
                  href={socials.ctftime}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-[0.65rem] text-accent underline-offset-4 hover:underline"
                >
                  CTFtime ↗
                </a>
              </footer>
            </aside>
          </Reveal>
        </motion.div>
      </div>

      {/* Scroll affordance. Hidden from AT — the content below is reachable by
          every other means. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <span className="label flex flex-col items-center gap-2 text-[0.6rem] text-fg-faint">
          Scroll
          <span className="h-10 w-px overflow-hidden bg-rule">
            <span className="block h-full w-full bg-accent motion-safe:animate-[scan_6s_cubic-bezier(0.76,0,0.24,1)_infinite]" />
          </span>
        </span>
      </div>
    </section>
  );
}

function Figure({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-5 py-4">
      <dt className="text-xs text-fg-muted">{label}</dt>
      <dd className="numeric text-2xl font-semibold text-fg">{children}</dd>
    </div>
  );
}
