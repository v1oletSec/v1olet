/**
 * Content types.
 *
 * The content layer is deliberately plain TypeScript rather than a CMS: the
 * original site kept its roster and competition results in a single editable
 * `data.js`, and that ergonomic is worth preserving. Editing `roster.ts` or
 * `events.ts` is still the whole workflow for updating the site — the types
 * here just make a typo a build error instead of a blank card.
 */

/** Disciplines used across roster cards, filters and service pages. */
export type Discipline =
  | 'web'
  | 'pwn'
  | 'rev'
  | 'crypto'
  | 'forensics'
  | 'osint'
  | 'misc'
  | 'cloud'
  | 'blockchain'
  | 'quantum'
  | 'ai'
  | 'red teaming'
  | 'pentesting'
  | 'teaching';

/** Roster tiers. Drives card size and grouping on /team. */
export type Tier = 'captain' | 'core' | 'member';

export interface MemberLinks {
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface MemberStat {
  label: string;
  value: string;
}

export interface Member {
  /** Handle as the operator uses it. Not normalised — casing is theirs. */
  name: string;
  /** Human-readable role, shown on leadership cards. */
  role: string;
  /** Optional extra tag (e.g. "QA Engineer") shown beside the handle. */
  roleTag?: string;
  tier: Tier;
  specialty: string;
  /** Optional; empty string in the source data means "no quote". */
  quote?: string;
  description: string;
  skills: Discipline[];
  stats?: MemberStat[];
  /** Path under /public, or undefined to render an initials avatar. */
  avatar?: string;
  links?: MemberLinks;
}

export interface CtfEvent {
  name: string;
  url: string;
  /** As published by the organiser, e.g. "24–29 Jul 2026". */
  date: string;
  /** Field size, when the organiser published one. */
  teams?: string;
  /** Team member who captained this run. */
  captain?: string;
  /** Ordinal placement, e.g. "3rd". */
  rank: string;
  /** Marks a run worth surfacing in condensed views. */
  top?: boolean;
  /** Organiser-awarded extra, e.g. "BLUE TEAM DEFENCE". */
  badge?: string;
}

export interface ServicePhase {
  title: string;
  body: string;
}

export interface Service {
  slug: string;
  /** Two-digit index rendered in the margin. */
  index: string;
  title: string;
  /** One line, used on cards and as the meta description. */
  summary: string;
  /** Long-form intro on the detail page. */
  body: string;
  /** What the client physically receives. */
  deliverables: string[];
  /** Typical scope items. */
  scope: string[];
  /** Named standards this service is executed against. */
  standards: string[];
  phases: ServicePhase[];
  /** Short deliverable label shown on the home-page card. */
  outcome: string;
}

export interface Writeup {
  slug: string;
  title: string;
  event: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  tags: string[];
  /** Sample content shipped with the build, not a real team writeup. */
  sample?: boolean;
  content: string;
  readingMinutes: number;
}
