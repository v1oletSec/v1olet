/**
 * Engagement portfolio.
 *
 * The five services and their summaries come from the previous site's
 * `CAPABILITIES` array. Everything added here (scope lists, phases, named
 * standards) expands that same positioning rather than introducing new
 * claims — no client names, no metrics, no pricing is asserted, because the
 * repository contains none.
 */
import type { Service } from './types';

export const services: Service[] = [
  {
    slug: 'penetration-testing',
    index: '01',
    title: 'Penetration testing',
    summary:
      'Web applications, APIs, and infrastructure, tested by hand against a defined scope and a fixed window.',
    body: 'A time-boxed, scope-bounded assessment run by named operators. Automated tooling is used where it earns its place — coverage, enumeration, regression — but the findings that matter come from manual analysis of your authorisation model, your trust boundaries, and the assumptions your code makes about its own inputs. Every finding arrives reproducible, with a working proof of concept and remediation your developers can act on without a translation layer.',
    outcome: 'Findings report · retest',
    scope: [
      'Web applications and single-page front ends',
      'REST, GraphQL and gRPC APIs',
      'Internal and external network infrastructure',
      'Cloud configuration and identity boundaries',
      'Mobile applications (Android, iOS)',
      'Authentication, session and multi-tenancy logic',
    ],
    deliverables: [
      'Findings report with severity, business impact and CVSS v4 vector per issue',
      'Reproduction steps and a working proof of concept for every finding',
      'Remediation guidance written for the engineers who own the code',
      'Executive summary suitable for board or customer distribution',
      'Retest and a reissued report once fixes ship — included in the original price',
    ],
    standards: ['OWASP WSTG', 'OWASP ASVS', 'PTES', 'NIST SP 800-115', 'CVSS v4.0'],
    phases: [
      {
        title: 'Reconnaissance and mapping',
        body: 'Full enumeration of the attack surface inside scope: routes, parameters, roles, dependencies, and the boundaries between them. The map, not the scanner output, drives everything after it.',
      },
      {
        title: 'Manual exploitation',
        body: 'Testing against the application logic — authorisation, state, tenancy, trust in client-supplied data — alongside the injection and deserialisation classes. Anything critical reaches you the hour it is confirmed.',
      },
      {
        title: 'Post-exploitation and impact',
        body: 'Each confirmed issue is chased to its real business impact rather than reported at its theoretical severity. A reflected parameter that reaches an admin session is not a medium.',
      },
      {
        title: 'Reporting and retest',
        body: 'Findings are written up as they are confirmed, not batched at the end. Once you have shipped fixes we verify them and reissue the report.',
      },
    ],
  },
  {
    slug: 'red-team-operations',
    index: '02',
    title: 'Red team operations',
    summary:
      'Adversary simulation that measures whether you detect and respond — not just whether the perimeter holds on the day of the test.',
    body: 'An objective-led operation against your organisation as it actually runs, executed under agreed rules of engagement with a named white-cell contact. The deliverable is not a vulnerability list; it is an attack narrative mapped to MITRE ATT&CK, paired with an honest account of which stages your detection stack caught, which it logged without alerting, and which passed unseen.',
    outcome: 'Attack narrative · detection gaps',
    scope: [
      'Objective-based full-scope operations',
      'Assumed-breach and insider-threat scenarios',
      'Social engineering and phishing (where authorised in writing)',
      'Initial access, persistence, privilege escalation, lateral movement',
      'Purple team exercises run jointly with your defenders',
      'Detection engineering validation against specific ATT&CK techniques',
    ],
    deliverables: [
      'Attack narrative with a full timeline of operator actions',
      'MITRE ATT&CK technique mapping for every stage executed',
      'Detection and response gap analysis, per stage',
      'Indicators of compromise and artefacts for your SOC to hunt against',
      'Joint replay session with your blue team',
    ],
    standards: ['MITRE ATT&CK', 'TIBER-EU (as a structural reference)', 'PTES', 'Documented rules of engagement'],
    phases: [
      {
        title: 'Objectives and rules of engagement',
        body: 'We agree the flags that define success, the systems that are out of bounds, the escalation path, and the white-cell contacts — in writing, before anything runs.',
      },
      {
        title: 'Threat modelling',
        body: 'The operation is modelled on adversaries that plausibly target your sector, so the techniques exercised are the ones your detections actually need to cover.',
      },
      {
        title: 'Execution',
        body: 'Access, persistence, escalation and movement toward the agreed objectives, with every action logged to the minute for later correlation against your telemetry.',
      },
      {
        title: 'Replay and remediation',
        body: 'A joint walkthrough with your defenders, matching our timeline against their alerts, and a concrete list of the detection content worth building next.',
      },
    ],
  },
  {
    slug: 'vulnerability-research',
    index: '03',
    title: 'Vulnerability research',
    summary:
      'Deep review of software and protocols, down to the primitives, to surface the bug classes an automated scanner has no way to model.',
    body: 'Where an assessment asks "is this deployment secure", research asks "is this design sound". Source review, reverse engineering, protocol analysis and targeted fuzzing applied to a product, a library, or a piece of firmware — with the goal of finding the class of bug rather than a single instance of it. Where a finding affects a third party, we run coordinated disclosure on your behalf under a published policy.',
    outcome: 'Advisory · coordinated disclosure',
    scope: [
      'Source-assisted and black-box binary review',
      'Reverse engineering of native and managed binaries',
      'Protocol and file-format analysis',
      'Coverage-guided fuzzing with custom harnesses',
      'Cryptographic implementation review',
      'Firmware and embedded targets',
    ],
    deliverables: [
      'Technical advisory per issue, with root cause and affected version range',
      'Reproducible crash cases, harnesses and triage notes',
      'Exploitability assessment — reachable, conditional, or theoretical',
      'Coordinated disclosure handling and CVE coordination where applicable',
      'Patch review once a fix is proposed',
    ],
    standards: ['CVE / CNA coordination', 'CWE classification', 'CVSS v4.0', 'Coordinated disclosure policy'],
    phases: [
      {
        title: 'Target modelling',
        body: 'Establish the trust boundaries, the attacker-reachable surface, and the invariants the code believes it holds. Research without a threat model finds noise.',
      },
      {
        title: 'Analysis',
        body: 'Static review and reverse engineering to locate candidate bug classes, then harness construction to reach them reliably.',
      },
      {
        title: 'Triage and proof',
        body: 'Crashes are deduplicated, root-caused and driven to a demonstration of impact. A crash without a reachable path is reported as exactly that.',
      },
      {
        title: 'Disclosure',
        body: 'Advisories, vendor coordination, and an agreed embargo. We do not publish before a fix or an agreed deadline.',
      },
    ],
  },
  {
    slug: 'continuous-testing',
    index: '04',
    title: 'Continuous testing',
    summary:
      'Testing that runs alongside your release cycle instead of once a year, so findings land while the code is still fresh in someone’s head.',
    body: 'A retained engagement with a rolling scope. New features are tested as they reach staging, regressions are caught against previously confirmed findings, and the queue of open issues is visible to you continuously rather than delivered as a document twice a year. Suited to teams shipping weekly, where an annual assessment is stale before it is signed off.',
    outcome: 'Rolling findings queue',
    scope: [
      'Per-release testing of new and changed functionality',
      'Regression testing against previously confirmed findings',
      'Shared findings queue with live severity and status',
      'Threat modelling on new features before they ship',
      'Ad-hoc review of security-relevant pull requests',
      'Quarterly summary for stakeholders and auditors',
    ],
    deliverables: [
      'Live findings queue, updated as issues are confirmed and closed',
      'Per-release test notes tied to your version tags',
      'Quarterly consolidated report for stakeholders and auditors',
      'A named lead who carries context between cycles',
      'Direct channel to the operators, not a ticket queue',
    ],
    standards: ['OWASP SAMM (as a maturity reference)', 'OWASP WSTG', 'CVSS v4.0'],
    phases: [
      {
        title: 'Baseline',
        body: 'A full assessment establishes the starting position and the areas that need the most attention. Everything after it is measured against this.',
      },
      {
        title: 'Release cadence',
        body: 'Testing is scheduled against your release train, so the work lands on changed code rather than on a calendar date.',
      },
      {
        title: 'Rolling queue',
        body: 'Findings are raised into a shared queue the hour they are confirmed, with severity, reproduction and status visible to your team throughout.',
      },
      {
        title: 'Quarterly review',
        body: 'A consolidated report and a working session on where the recurring classes of issue are coming from — the part that actually reduces future findings.',
      },
    ],
  },
  {
    slug: 'training',
    index: '05',
    title: 'Training and workshops',
    summary:
      'Hands-on sessions built from real engagements and competition work, run for engineering teams as well as internal security functions.',
    body: 'Our operators compete year-round, which means the exercise material is current rather than recycled from a slide deck. Sessions are practical: participants work live labs, break the target themselves, and leave with the reasoning rather than the answer. Content is tailored to your stack — there is little value in teaching Java deserialisation to a team that ships Go.',
    outcome: 'Live lab · exercise set',
    scope: [
      'Secure development for engineering teams',
      'Web and API exploitation, hands-on',
      'Binary exploitation and reverse engineering fundamentals',
      'Cloud and identity attack paths',
      'Detection engineering for blue teams',
      'Internal CTF design and facilitation',
    ],
    deliverables: [
      'Live instructor-led sessions, remote or on site',
      'Lab environment participants keep access to afterwards',
      'Exercise set and full solutions',
      'Recording and materials for teams to reuse internally',
      'Optional internal CTF built on your own stack',
    ],
    standards: ['OWASP Top 10 / API Top 10', 'MITRE ATT&CK', 'Material derived from live engagements'],
    phases: [
      {
        title: 'Needs assessment',
        body: 'A short session to establish the stack, the audience’s starting level, and the failure modes that actually show up in your codebase.',
      },
      {
        title: 'Content build',
        body: 'Labs are built or adapted against technology you use, drawing on recent engagement and competition material.',
      },
      {
        title: 'Delivery',
        body: 'Hands-on sessions where participants do the work. Instruction is paced around the room, not the slide count.',
      },
      {
        title: 'Reinforcement',
        body: 'Materials, recordings and lab access stay available, and an optional internal CTF gives the team a reason to use what they learned.',
      },
    ],
  },
];

export const getService = (slug: string): Service | undefined => services.find((s) => s.slug === slug);
