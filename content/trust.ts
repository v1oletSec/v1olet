/**
 * Trust surface: certifications, methodology standards, and disclosure policy.
 *
 * ⚠️ CERTIFICATIONS ARE PLACEHOLDERS ⚠️
 * The v1olet repository contains no certification data of any kind. The team
 * stated that operators hold OSCP, CPTS, CRTO and similar, but no mapping of
 * certification → operator was supplied, so nothing here is attributed to a
 * named person and every count is `null`.
 *
 * To publish real numbers: set `holders` on each entry below to the number of
 * operators who hold it, and optionally add `certifications: ['OSCP', ...]` to
 * the relevant entries in `roster.ts`. Any entry whose `holders` is still
 * `null` renders with a visible "PENDING" state rather than a fabricated
 * figure — the page never invents a number.
 */

export interface Certification {
  abbr: string;
  name: string;
  issuer: string;
  url: string;
  /** null = not yet supplied; renders as a visible placeholder. */
  holders: number | null;
  /** Which side of the practice this credential evidences. */
  track: 'offensive' | 'red-team' | 'management' | 'specialist';
}

export const certifications: Certification[] = [
  {
    abbr: 'OSCP',
    name: 'Offensive Security Certified Professional',
    issuer: 'OffSec',
    url: 'https://www.offsec.com/courses/pen-200/',
    holders: null,
    track: 'offensive',
  },
  {
    abbr: 'CPTS',
    name: 'Certified Penetration Testing Specialist',
    issuer: 'Hack The Box',
    url: 'https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist',
    holders: null,
    track: 'offensive',
  },
  {
    abbr: 'CRTO',
    name: 'Certified Red Team Operator',
    issuer: 'Zero-Point Security',
    url: 'https://training.zeropointsecurity.co.uk/courses/red-team-ops',
    holders: null,
    track: 'red-team',
  },
  {
    abbr: 'OSWE',
    name: 'Offensive Security Web Expert',
    issuer: 'OffSec',
    url: 'https://www.offsec.com/courses/web-300/',
    holders: null,
    track: 'specialist',
  },
  {
    abbr: 'OSEP',
    name: 'Offensive Security Experienced Penetration Tester',
    issuer: 'OffSec',
    url: 'https://www.offsec.com/courses/pen-300/',
    holders: null,
    track: 'red-team',
  },
  {
    abbr: 'CBBH',
    name: 'Certified Bug Bounty Hunter',
    issuer: 'Hack The Box',
    url: 'https://academy.hackthebox.com/preview/certifications/htb-certified-bug-bounty-hunter',
    holders: null,
    track: 'offensive',
  },
];

/** Aggregate line above the certification grid. Kept honest while data is missing. */
export const certificationSummary = {
  /** PLACEHOLDER — supply the real figure and this renders as a counter. */
  totalHolders: null as number | null,
  /** PLACEHOLDER — supply combined years of professional practice. */
  combinedYears: null as number | null,
  note: 'Operators on this team hold industry certifications including OSCP, CPTS and CRTO, and several have long professional practice outside competition. Exact figures are pending confirmation and are deliberately left blank rather than estimated.',
};

export interface Standard {
  abbr: string;
  name: string;
  issuer: string;
  url: string;
  appliedTo: string;
}

/** Methodology standards engagements are executed against. */
export const standards: Standard[] = [
  {
    abbr: 'PTES',
    name: 'Penetration Testing Execution Standard',
    issuer: 'PTES',
    url: 'http://www.pentest-standard.org/',
    appliedTo: 'Overall engagement structure, from pre-engagement to reporting',
  },
  {
    abbr: 'WSTG',
    name: 'OWASP Web Security Testing Guide',
    issuer: 'OWASP',
    url: 'https://owasp.org/www-project-web-security-testing-guide/',
    appliedTo: 'Web application and API test coverage',
  },
  {
    abbr: 'ASVS',
    name: 'Application Security Verification Standard',
    issuer: 'OWASP',
    url: 'https://owasp.org/www-project-application-security-verification-standard/',
    appliedTo: 'Verification depth and control-level assertions',
  },
  {
    abbr: 'MASTG',
    name: 'Mobile Application Security Testing Guide',
    issuer: 'OWASP',
    url: 'https://mas.owasp.org/MASTG/',
    appliedTo: 'Android and iOS assessments',
  },
  {
    abbr: 'ATT&CK',
    name: 'MITRE ATT&CK',
    issuer: 'MITRE',
    url: 'https://attack.mitre.org/',
    appliedTo: 'Red team technique selection and detection-gap mapping',
  },
  {
    abbr: 'SP 800-115',
    name: 'Technical Guide to Information Security Testing',
    issuer: 'NIST',
    url: 'https://csrc.nist.gov/pubs/sp/800/115/final',
    appliedTo: 'Assessment planning, execution and post-test handling',
  },
  {
    abbr: 'CVSS v4.0',
    name: 'Common Vulnerability Scoring System',
    issuer: 'FIRST',
    url: 'https://www.first.org/cvss/v4-0/',
    appliedTo: 'Severity scoring, with environmental context applied',
  },
  {
    abbr: 'CWE',
    name: 'Common Weakness Enumeration',
    issuer: 'MITRE',
    url: 'https://cwe.mitre.org/',
    appliedTo: 'Root-cause classification in reports and advisories',
  },
];

/** Operational handling commitments — the questions procurement asks. */
export const operationalCommitments = [
  {
    title: 'Data handling',
    body: 'Engagement data is held only as long as the engagement and its retest require, then destroyed on a schedule agreed in the contract. Reports are delivered over an encrypted channel.',
  },
  {
    title: 'Rules of engagement',
    body: 'Every engagement runs under a written authorisation naming the in-scope assets, the testing window, prohibited techniques, and the escalation path for anything that risks availability.',
  },
  {
    title: 'Insurance and contracting',
    body: 'PLACEHOLDER — professional indemnity and liability cover details are pending. Contracting entity and terms are supplied during scoping.',
  },
  {
    title: 'Confidentiality',
    body: 'Mutual NDA before scope is discussed in detail. We do not name clients, publish findings, or reference engagements without written permission.',
  },
];

/** Coordinated disclosure policy for issues found in our own site or research. */
export const disclosurePolicy = {
  contact: 'hello@v1olet.xyz',
  /** PLACEHOLDER — no published bounty programme exists. */
  bounty: null,
  acknowledgementWindow: '3 working days',
  resolutionTarget: '90 days from acknowledgement, or an agreed extension',
  scope: [
    'v1olet.xyz and its subdomains',
    'Repositories under github.com/v1oletSec',
  ],
  outOfScope: [
    'Findings from automated scanners without a demonstrated impact',
    'Denial of service, volumetric or resource-exhaustion testing',
    'Social engineering of team members',
    'Missing hardening headers with no demonstrated exploit path',
  ],
};

/** Client references. Nothing in the repository names a client. */
export const references = {
  available: false,
  note: 'PLACEHOLDER — client references are available on request during scoping, subject to the referencing client’s consent. No client is named publicly.',
};
