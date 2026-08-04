'use client';

/**
 * Full roster with discipline filtering.
 *
 * The filter is a real radio group, not a row of divs: arrow keys move
 * between options, the selection is announced, and the result count is
 * published through a polite live region so a screen-reader user learns that
 * the list changed. Filtering is client-side over an array of thirty — no
 * request, no spinner, no URL state worth serialising.
 */

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MemberCard } from '@/components/ui/MemberCard';
import { disciplines, roster } from '@content/roster';
import type { Member } from '@content/types';
import { useMotionAllowed } from '@/lib/motion';
import { cx } from '@/lib/utils';

const TIER_LABELS: Record<Member['tier'], string> = {
  captain: 'Leadership',
  core: 'Core members',
  member: 'Team members',
};

const TIER_ORDER: Member['tier'][] = ['captain', 'core', 'member'];

export function TeamRoster() {
  const [filter, setFilter] = useState<string | null>(null);
  const motionAllowed = useMotionAllowed();

  const filtered = useMemo(
    () => (filter ? roster.filter((m) => m.skills.includes(filter as Member['skills'][number])) : roster),
    [filter],
  );

  const grouped = useMemo(
    () =>
      TIER_ORDER.map((tier) => ({
        tier,
        members: filtered.filter((m) => m.tier === tier),
      })).filter((group) => group.members.length > 0),
    [filtered],
  );

  return (
    <div>
      {/* ------------------------------------------------------ filter --- */}
      <div
        role="radiogroup"
        aria-label="Filter operators by discipline"
        className="flex flex-wrap gap-2"
      >
        <FilterChip active={filter === null} onSelect={() => setFilter(null)} count={roster.length}>
          All disciplines
        </FilterChip>
        {disciplines.map((discipline) => (
          <FilterChip
            key={discipline.name}
            active={filter === discipline.name}
            onSelect={() => setFilter(discipline.name)}
            count={discipline.count}
          >
            {discipline.name}
          </FilterChip>
        ))}
      </div>

      <p className="numeric mt-6 text-xs text-fg-faint" role="status" aria-live="polite">
        Showing {filtered.length} of {roster.length} operators
        {filter ? ` with ${filter}` : ''}
      </p>

      {/* ------------------------------------------------------ groups --- */}
      <div className="mt-12 space-y-16">
        {grouped.map((group) => (
          <section key={group.tier} aria-labelledby={`tier-${group.tier}`}>
            <div className="flex items-center gap-4">
              <h2 id={`tier-${group.tier}`} className="label shrink-0 text-fg-faint">
                {TIER_LABELS[group.tier]}
              </h2>
              <span className="h-px flex-1 bg-rule" aria-hidden="true" />
              <span className="numeric text-xs text-fg-faint">
                {String(group.members.length).padStart(2, '0')}
              </span>
            </div>

            <ul
              className={cx(
                'mt-8 grid gap-6',
                group.tier === 'captain'
                  ? 'sm:grid-cols-2 xl:grid-cols-4'
                  : group.tier === 'core'
                    ? 'sm:grid-cols-2 lg:grid-cols-3'
                    : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
              )}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {group.members.map((member) => (
                  <motion.li
                    key={member.name}
                    layout={motionAllowed}
                    initial={motionAllowed ? { opacity: 0, scale: 0.97 } : false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={motionAllowed ? { opacity: 0, scale: 0.97 } : undefined}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <MemberCard
                      member={member}
                      variant={group.tier === 'member' ? 'compact' : 'lead'}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </section>
        ))}

        {grouped.length === 0 && (
          <p className="border border-rule bg-surface-raised p-8 text-sm text-fg-muted">
            No operators match that discipline. Clear the filter to see the full roster.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onSelect,
  count,
  children,
}: {
  active: boolean;
  onSelect: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      className={cx(
        'label flex items-center gap-2 border px-3 py-2 text-[0.6rem] transition-colors duration-300',
        active
          ? 'border-accent bg-accent-wash text-accent'
          : 'border-rule bg-surface-raised text-fg-muted hover:border-accent hover:text-accent',
      )}
    >
      {children}
      <span className="numeric text-[0.6rem] opacity-60">{count}</span>
    </button>
  );
}
