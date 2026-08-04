'use client';

/**
 * Team teaser.
 *
 * Leadership as full cards, the rest as a discipline breakdown. Showing the
 * spread of specialisms rather than thirty more faces is the more useful
 * signal on a landing page: it answers "can this team cover my stack".
 */

import { Counter } from '@/components/motion/Counter';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { MemberCard } from '@/components/ui/MemberCard';
import { SectionHead } from '@/components/ui/SectionHead';
import { byTier, disciplines, roster } from '@content/roster';

export function TeamPreview() {
  const leadership = byTier.captain;
  const maxCount = disciplines[0]?.count ?? 1;

  return (
    <section id="team" className="relative border-y border-rule bg-surface-panel py-24 lg:py-32">
      <div className="shell">
        <SectionHead
          index="04"
          eyebrow="Team"
          title="The people who will be on your engagement."
          lede="We do not subcontract. The operators listed here are the ones who do the work — the same bench that competes under the v1olet tag."
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {leadership.map((member) => (
            <RevealItem key={member.name} className="h-full">
              <MemberCard member={member} variant="lead" />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.05}>
          <div className="mt-16 grid gap-10 border border-rule bg-surface-raised p-7 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <p className="label text-fg-faint">Bench depth</p>
              <p className="numeric mt-4 text-5xl font-semibold text-fg">
                <Counter value={roster.length} />
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
                Operators across {disciplines.length} disciplines, from web and binary exploitation
                to cloud, cryptography and OSINT. Engagement teams are assembled from the specialists
                the scope actually needs.
              </p>
              <div className="mt-7">
                <Button href="/team/" variant="outline" size="sm">
                  Meet the team
                </Button>
              </div>
            </div>

            {/* Discipline distribution. A meter per discipline, labelled with
                its own count — no legend needed, no colour coding to decode. */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {disciplines.map((discipline) => (
                <li key={discipline.name} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 truncate text-xs text-fg-muted">
                    {discipline.name}
                  </span>
                  <span className="h-1.5 flex-1 bg-surface-sunk" aria-hidden="true">
                    <span
                      className="block h-full bg-accent"
                      style={{ width: `${(discipline.count / maxCount) * 100}%` }}
                    />
                  </span>
                  <span className="numeric w-6 shrink-0 text-right text-xs text-fg-faint">
                    {discipline.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
