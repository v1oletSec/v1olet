/**
 * Site-wide configuration: identity, routes, contact routes and external
 * profiles. Every value here is taken from the existing v1olet repository
 * (`index.html`, `CNAME`, `.well-known/`), not invented.
 *
 * Anything the repository does not contain is marked with `PLACEHOLDER` so it
 * is visible both in code review and, where rendered, on the page itself.
 */

export const site = {
  name: 'v1olet',
  /** Full brand as it appears on the hero wordmark. */
  legalName: 'v1olet security',
  url: 'https://v1olet.xyz',
  locale: 'en',
  tagline: 'Offensive security',
  /** Carried over from the previous site — it is the sharpest line we have. */
  headline: 'Find the flaw before an attacker charges you for it.',
  description:
    'v1olet is an independent offensive security team. Penetration testing, red team operations, and vulnerability research — delivered with reproducible findings, working proofs of concept, and a retest included.',
  shortDescription:
    'Penetration testing, red team operations, and vulnerability research. Reproducible findings, free retest, public competition record.',
  ogImage: '/og-default.png',
  founded: '2025',
} as const;

export const contact = {
  email: 'hello@v1olet.xyz',
  /** Subject line pre-filled on every commercial call to action. */
  engagementSubject: 'Engagement enquiry',
  disclosureSubject: 'Responsible disclosure',
  /** PLACEHOLDER — no phone number exists in the repository. */
  phone: null,
  /** PLACEHOLDER — no PGP key is published in the repository. */
  pgpFingerprint: null,
  responseTime: 'usually within two working days',
} as const;

export const socials = {
  linkedin: 'https://www.linkedin.com/company/v1olet/',
  github: 'https://github.com/v1oletSec',
  writeups: 'https://github.com/v1oletSec/writeups',
  ctftime: 'https://ctftime.org/team/442036',
  careers: 'https://forms.gle/sRLQVVkSxt32uKhk8',
  /** PLACEHOLDER — the repo carries a Discord domain-verification record but no invite. */
  discord: null,
} as const;

export interface NavItem {
  href: string;
  label: string;
  /** Which of the two audiences this route primarily serves. */
  audience: 'enterprise' | 'community' | 'both';
  description: string;
}

export const navigation: NavItem[] = [
  {
    href: '/services/',
    label: 'Engagements',
    audience: 'enterprise',
    description: 'Penetration testing, red teaming, vulnerability research, continuous testing, training.',
  },
  {
    href: '/method/',
    label: 'Method',
    audience: 'enterprise',
    description: 'Scope, test, report, retest — and the standards each stage is executed against.',
  },
  {
    href: '/record/',
    label: 'Record',
    audience: 'both',
    description: 'Every competition placement, as published by the organisers.',
  },
  {
    href: '/team/',
    label: 'Team',
    audience: 'both',
    description: 'The operators who run the work. No subcontracting.',
  },
  {
    href: '/writeups/',
    label: 'Writeups',
    audience: 'community',
    description: 'Technical notes from competition and research work.',
  },
  {
    href: '/trust/',
    label: 'Trust',
    audience: 'enterprise',
    description: 'Certifications, methodology standards, disclosure policy.',
  },
];

/** Footer link groups. */
export const footerNav = [
  {
    title: 'Engagements',
    links: [
      { href: '/services/penetration-testing/', label: 'Penetration testing' },
      { href: '/services/red-team-operations/', label: 'Red team operations' },
      { href: '/services/vulnerability-research/', label: 'Vulnerability research' },
      { href: '/services/continuous-testing/', label: 'Continuous testing' },
      { href: '/services/training/', label: 'Training and workshops' },
    ],
  },
  {
    title: 'Team',
    links: [
      { href: '/team/', label: 'Operators' },
      { href: '/record/', label: 'Competition record' },
      { href: '/writeups/', label: 'Writeups' },
      { href: socials.careers, label: 'Careers', external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/method/', label: 'How we work' },
      { href: '/trust/', label: 'Trust and standards' },
      { href: '/contact/', label: 'Contact' },
      { href: '/legal/imprint/', label: 'Imprint' },
      { href: '/legal/privacy/', label: 'Privacy' },
    ],
  },
] as const;

/**
 * Recruiting easter egg. The previous site hid a flag in an HTML comment;
 * carrying the idea forward keeps a detail the team's own audience noticed.
 * The flag is new so the old one stays retired.
 */
export const recruitingFlag = 'v1{n0_su6c0ntr4ct0rs_0nly_0p3r4t0rs}';
