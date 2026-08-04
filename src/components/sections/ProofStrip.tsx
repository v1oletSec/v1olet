'use client';

/**
 * Proof strip.
 *
 * A marquee of the competitions on record, immediately under the hero. Its
 * job is to convert the CTF track record into an enterprise trust signal in
 * the first screen after the claim — these are the organisers whose published
 * results back the rest of the page.
 *
 * The list is duplicated once and translated by -50%, which is what makes the
 * loop seamless; the duplicate is `aria-hidden` so nothing is announced twice.
 * The animation is CSS, so the global reduced-motion block stops it and the
 * strip becomes a static, horizontally scrollable list.
 */

import { events } from '@content/events';
import { socials } from '@content/site';

export function ProofStrip() {
  const names = events.map((event) => event.name);

  return (
    <section aria-label="Competitions on record" className="border-y border-rule bg-surface-panel">
      <div className="shell flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:gap-8">
        <p className="label shrink-0 text-fg-faint">Competed at</p>

        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <ul className="flex w-max items-center gap-10 motion-safe:animate-[marquee_42s_linear_infinite] motion-reduce:animate-none motion-reduce:overflow-x-auto">
            {names.map((name) => (
              <MarqueeItem key={name} name={name} />
            ))}
            {/* Second pass makes the loop seamless. Presentational only. */}
            {names.map((name) => (
              <MarqueeItem key={`dup-${name}`} name={name} aria-hidden />
            ))}
          </ul>
        </div>

        <a
          href={socials.ctftime}
          target="_blank"
          rel="noopener noreferrer"
          className="label shrink-0 text-[0.65rem] text-accent underline-offset-4 hover:underline"
        >
          Verify on CTFtime ↗
        </a>
      </div>
    </section>
  );
}

function MarqueeItem({ name, ...rest }: { name: string; 'aria-hidden'?: boolean }) {
  return (
    <li
      className="flex shrink-0 items-center gap-3 whitespace-nowrap text-sm text-fg-muted"
      {...rest}
    >
      <span className="h-1 w-1 rotate-45 bg-accent" aria-hidden="true" />
      {name}
    </li>
  );
}
