'use client';

/**
 * One line of the competition ledger.
 *
 * The placement is the loudest element on the row because it is the only
 * thing a reader is scanning for. Podium finishes are accented; everything
 * else stays neutral, so "3rd" and "28th" are not given equal visual weight.
 */

import { Panel } from '@/components/ui/Panel';
import type { CtfEvent } from '@content/types';
import { cx, isPodium, splitOrdinal } from '@/lib/utils';

export function EventRow({ event, index }: { event: CtfEvent; index: number }) {
  const { value, suffix } = splitOrdinal(event.rank);
  const podium = isPodium(event.rank);

  const meta = [event.date, event.teams, event.captain ? `captained by ${event.captain}` : null]
    .filter(Boolean)
    .join('  ·  ');

  return (
    <Panel
      as="li"
      ticks={false}
      className={cx(
        'group flex items-center gap-5 border-x-0 border-b border-t-0 bg-transparent px-1 py-6 sm:gap-8',
        podium && 'bg-accent-wash/40',
      )}
    >
      <span className="numeric hidden w-8 shrink-0 text-xs text-fg-faint sm:block" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span
        className={cx(
          'numeric flex w-20 shrink-0 items-start text-3xl font-semibold sm:w-24 sm:text-4xl',
          podium ? 'text-accent' : 'text-fg',
        )}
      >
        {value}
        <span className="mt-1 text-sm sm:mt-1.5">{suffix}</span>
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold tracking-tight">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-accent"
            data-cursor="results ↗"
          >
            {event.name}
          </a>
        </h3>
        <p className="numeric mt-1.5 text-xs text-fg-faint">{meta}</p>
        {event.badge && (
          <span className="label mt-3 inline-block border border-accent/50 px-2 py-1 text-[0.6rem] text-accent">
            {event.badge}
          </span>
        )}
      </div>

      <span
        aria-hidden="true"
        className="shrink-0 text-fg-faint transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-accent"
      >
        ↗
      </span>
    </Panel>
  );
}
