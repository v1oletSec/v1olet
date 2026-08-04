'use client';

/**
 * Record teaser.
 *
 * Placed between the commercial sections on purpose: the competition record
 * is the evidence the rest of the page rests on, not a hobby footnote parked
 * at the bottom. Figures are derived from the ledger, never typed by hand.
 */

import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { EventRow } from '@/components/ui/EventRow';
import { SectionHead } from '@/components/ui/SectionHead';
import { bestPlacement, competitionCount, events, largestField } from '@content/events';
import { socials } from '@content/site';
import { splitOrdinal } from '@/lib/utils';

export function RecordPreview() {
  const highlights = events.filter((event) => event.top).slice(0, 4);
  const best = splitOrdinal(bestPlacement.rank);

  return (
    <section id="record" className="relative py-24 lg:py-32">
      <div className="shell">
        <SectionHead
          index="03"
          eyebrow="The record"
          title="Our results are a matter of public record."
          lede="The operators who run client work compete year-round under the v1olet tag. Placements below are as published by the organisers, and every entry links to its source."
        />

        <Reveal>
          <dl className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-3">
            <Stat label="Competitions recorded">
              <Counter value={competitionCount} />
            </Stat>
            <Stat label={`Best placement · ${bestPlacement.name}`}>
              <span className="inline-flex items-start">
                <Counter value={Number(best.value)} />
                <span className="ml-0.5 mt-2 text-lg text-accent">{best.suffix}</span>
              </span>
            </Stat>
            <Stat label="Largest field faced">
              <Counter value={largestField} suffix="+" />
            </Stat>
          </dl>
        </Reveal>

        <ol className="mt-14 border-t border-rule">
          {highlights.map((event, index) => (
            <EventRow key={event.name} event={event} index={index} />
          ))}
        </ol>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/record/" variant="outline">
              Full competition record
            </Button>
            <a
              href={socials.writeups}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-[0.65rem] text-fg-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Writeups on GitHub ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface-raised p-7">
      <dd className="numeric text-4xl font-semibold text-fg lg:text-5xl">{children}</dd>
      <dt className="mt-3 text-sm text-fg-muted">{label}</dt>
    </div>
  );
}
