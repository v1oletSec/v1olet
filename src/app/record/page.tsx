/**
 * Competition record.
 *
 * The full ledger, plus the derived figures. Every number on this page is
 * computed from `content/events.ts` — there is no place to type a statistic,
 * which is how the previous site's "11 competitions" drift happened.
 *
 * The category breakdown reads from the roster rather than from results,
 * because the organisers publish placements, not per-category solves. Labelled
 * accordingly so it cannot be misread as a solve count.
 */

import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { EventRow } from '@/components/ui/EventRow';
import {
  bestPlacement,
  competitionCount,
  events,
  largestField,
  rankValue,
} from '@content/events';
import { socials } from '@content/site';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { splitOrdinal } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: 'Competition record',
  description:
    'Every v1olet competition placement, as published by the organisers, with a source link on each entry. Verified independently on CTFtime.',
  path: '/record/',
});

export default function RecordPage() {
  const best = splitOrdinal(bestPlacement.rank);
  const topTen = events.filter((event) => rankValue(event.rank) <= 10).length;
  const podiums = events.filter((event) => rankValue(event.rank) <= 3).length;

  return (
    <>
      <PageHeader
        eyebrow="The record"
        title="Placements, as published by the organisers."
        lede="Every entry below links to the organiser's own results page. Nothing here is self-reported, and the CTFtime profile is the independent index."
        crumbs={[{ label: 'Record', href: '/record/' }]}
        meta={[
          { label: 'Competitions', value: String(competitionCount) },
          { label: 'Podium finishes', value: String(podiums) },
          { label: 'Top-ten finishes', value: String(topTen) },
          { label: 'Source', value: 'Organiser results' },
        ]}
      />

      <div className="shell py-14 lg:py-20">
        <Reveal>
          <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
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
            <Stat label="Top-ten finishes">
              <Counter value={topTen} />
            </Stat>
          </dl>
        </Reveal>

        <section className="mt-20" aria-labelledby="ledger-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="ledger-heading" className="text-3xl uppercase">
              Full ledger
            </h2>
            <p className="numeric text-xs text-fg-faint">Newest first</p>
          </div>

          <ol className="mt-10 border-t border-rule">
            {events.map((event, index) => (
              <EventRow key={`${event.name}-${event.date}`} event={event} index={index} />
            ))}
          </ol>

          <p className="mt-8 text-sm text-fg-muted">
            Full history on{' '}
            <a
              href={socials.ctftime}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4"
            >
              CTFtime
            </a>
            , writeups on{' '}
            <a
              href={socials.writeups}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        {/* --------------------------------------------- honest caveat --- */}
        <Reveal>
          <aside className="mt-16 border-l-2 border-accent bg-accent-wash px-6 py-5">
            <p className="label text-[0.55rem] text-accent">Note on completeness</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg-muted">
              This ledger reflects the competitions recorded in the team&rsquo;s own data file. It is
              not necessarily every event the team has entered — only the ones with a published,
              linkable result. Entries are added to <code className="numeric text-xs">content/events.ts</code>,
              and every figure on this page is derived from that list rather than maintained
              separately.
            </p>
          </aside>
        </Reveal>

        <Reveal>
          <div className="mt-16 flex flex-wrap gap-4">
            <Button href="/team/" variant="outline">
              The operators behind these results
            </Button>
            <Button href="/writeups/" variant="quiet">
              Read the writeups
            </Button>
          </div>
        </Reveal>
      </div>

      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Record', path: '/record/' },
        ])}
      />
    </>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface-raised p-7">
      <dd className="numeric text-4xl font-semibold text-fg">{children}</dd>
      <dt className="mt-3 text-sm text-fg-muted">{label}</dt>
    </div>
  );
}
