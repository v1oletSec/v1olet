'use client';

/**
 * Operator card.
 *
 * Two shapes from one component: `lead` is a full panel with quote and stats,
 * `compact` is a dense row. Optional fields are emitted only when present, so
 * a member without a quote produces a shorter card rather than an empty slot —
 * a rule carried over from the previous site and still the right one for a
 * roster where roughly half the entries have no quote.
 *
 * Avatars fall back to generated initials. The fallback is state, not an
 * `onerror` attribute, so a broken image cannot leave the DOM inconsistent.
 */

import Image from 'next/image';
import { useState } from 'react';
import { Panel } from '@/components/ui/Panel';
import type { Member } from '@content/types';
import { cx, initials } from '@/lib/utils';

const SOCIAL_LABELS = { linkedin: 'LinkedIn', github: 'GitHub', website: 'Website' } as const;

function Avatar({ member, size }: { member: Member; size: 'sm' | 'lg' }) {
  const [failed, setFailed] = useState(false);
  const px = size === 'lg' ? 88 : 56;

  if (!member.avatar || failed) {
    return (
      <span
        aria-hidden="true"
        className={cx(
          'numeric flex shrink-0 items-center justify-center border border-rule bg-surface-panel font-semibold text-fg-faint',
          size === 'lg' ? 'h-22 w-22 text-lg' : 'h-14 w-14 text-sm',
        )}
        style={{ width: px, height: px }}
      >
        {initials(member.name)}
      </span>
    );
  }

  return (
    <Image
      src={member.avatar}
      alt=""
      width={px}
      height={px}
      loading="lazy"
      onError={() => setFailed(true)}
      className="shrink-0 border border-rule object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
      style={{ width: px, height: px }}
    />
  );
}

function Socials({ member }: { member: Member }) {
  const links = member.links;
  if (!links) return null;
  const entries = (Object.keys(SOCIAL_LABELS) as Array<keyof typeof SOCIAL_LABELS>).filter(
    (key) => links[key],
  );
  if (!entries.length) return null;

  return (
    <div className="relative z-10 flex flex-wrap gap-1.5">
      {entries.map((key) => (
        <a
          key={key}
          href={links[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on ${SOCIAL_LABELS[key]}`}
          className="label border border-rule px-2 py-1 text-[0.55rem] text-fg-faint transition-colors hover:border-accent hover:text-accent"
        >
          {SOCIAL_LABELS[key]}
        </a>
      ))}
    </div>
  );
}

function Skills({ skills }: { skills: Member['skills'] }) {
  if (!skills.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <li
          key={skill}
          className="label bg-surface-panel px-2 py-1 text-[0.55rem] text-fg-muted"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}

export function MemberCard({ member, variant }: { member: Member; variant: 'lead' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <Panel as="article" ticks={false} className="group flex items-center gap-4 p-4">
        <Avatar member={member} size="sm" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold tracking-tight">
            {member.name}
            {member.roleTag && (
              <span className="label ml-2 text-[0.55rem] text-accent">{member.roleTag}</span>
            )}
          </h3>
          <p className="truncate text-xs text-fg-faint">{member.specialty}</p>
        </div>
        <Socials member={member} />
      </Panel>
    );
  }

  return (
    <Panel as="article" className="group flex h-full flex-col p-6">
      <div className="flex items-start gap-5">
        <Avatar member={member} size="lg" />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight">{member.name}</h3>
          <p className="label mt-1 text-[0.6rem] text-accent">{member.roleTag ?? member.role}</p>
          <p className="mt-2 text-sm text-fg-muted">{member.specialty}</p>
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-fg-muted">{member.description}</p>

      {member.quote && (
        <blockquote className="mt-5 border-l-2 border-accent pl-4 text-sm italic leading-relaxed text-fg">
          “{member.quote}”
        </blockquote>
      )}

      {member.stats && (
        <dl className="mt-5 grid grid-cols-3 gap-px border border-rule bg-rule">
          {member.stats.map((stat) => (
            <div key={stat.label} className="bg-surface-raised p-3">
              <dt className="label text-[0.5rem] text-fg-faint">{stat.label}</dt>
              <dd className="numeric mt-1 text-sm font-semibold text-fg">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-5">
        <Skills skills={member.skills} />
        <Socials member={member} />
      </div>
    </Panel>
  );
}
