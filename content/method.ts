/**
 * Engagement method — the four stages from the previous site, expanded.
 *
 * The stage names (Scope, Test, Report, Retest) and the commitments attached
 * to them are the team's existing public promises: fixed price agreed up
 * front, a named lead, critical findings escalated during the test rather
 * than at the end, and a retest included in the original price.
 */

export interface MethodStage {
  index: string;
  title: string;
  /** One-line summary used in condensed views. */
  headline: string;
  body: string;
  /** Concrete things that exist at the end of this stage. */
  artefacts: string[];
  /** Typical duration. Deliberately approximate — every scope differs. */
  duration: string;
}

export const methodStages: MethodStage[] = [
  {
    index: '01',
    title: 'Scope',
    headline: 'Fixed price and a named lead before anything starts.',
    body: 'We agree the targets, the rules of engagement, the testing window, and the escalation path. You receive a fixed price and the name of the operator who will lead the work before a single request is sent. Scope creep is handled as a written change, not as a surprise on the invoice.',
    artefacts: [
      'Signed scope and rules of engagement',
      'Fixed price and testing window',
      'Named engagement lead',
      'Escalation contacts on both sides',
    ],
    duration: 'Typically one scoping call plus written confirmation',
  },
  {
    index: '02',
    title: 'Test',
    headline: 'Findings reach you the hour they are confirmed.',
    body: 'Testing runs against a shared channel with your team. Anything critical is escalated immediately — the hour we confirm it, not in a report six weeks later. You can watch the engagement progress rather than waiting for a document, and your engineers can start on a fix while the operator is still in the environment to verify it.',
    artefacts: [
      'Shared channel with the operators',
      'Immediate escalation of critical findings',
      'Running list of confirmed issues',
      'Daily progress notes on longer engagements',
    ],
    duration: 'Agreed window, typically 5–15 working days',
  },
  {
    index: '03',
    title: 'Report',
    headline: 'Every finding reproducible, with a proof of concept.',
    body: 'Each finding lands with reproduction steps, a working proof of concept, an assessment of business impact, and remediation your engineers can act on. Severity is argued from impact in your environment, not copied from a scanner. The report carries both an executive summary you can hand to a customer or auditor and the technical detail your developers need.',
    artefacts: [
      'Technical report with reproduction and PoC per finding',
      'CVSS v4.0 vector and business-impact rationale',
      'Executive summary for non-technical distribution',
      'Remediation guidance mapped to your stack',
    ],
    duration: 'Delivered within five working days of test completion',
  },
  {
    index: '04',
    title: 'Retest',
    headline: 'Included in the original price.',
    body: 'Once you have shipped the fixes we verify each one and reissue the report with the resolved findings marked and dated. The reissued report is the artefact you can show a customer, an auditor, or a procurement team. This is included — it is not a second engagement.',
    artefacts: [
      'Verification of each remediated finding',
      'Reissued report with resolution status and dates',
      'Attestation letter on request',
      'Notes on any fix that did not fully close the issue',
    ],
    duration: 'Scheduled once fixes ship, within the engagement price',
  },
];

/** The commitments that differentiate the engagement, stated plainly. */
export const commitments = [
  {
    title: 'No subcontracting',
    body: 'The operators named in your scope document are the ones who do the work. The team page is the whole bench.',
  },
  {
    title: 'Retest included',
    body: 'Verification of your fixes and a reissued report are part of the original price, not a follow-on quote.',
  },
  {
    title: 'Findings as you go',
    body: 'Critical issues are escalated the hour they are confirmed. You do not learn about them at the readout.',
  },
  {
    title: 'Fixed price',
    body: 'Agreed before the engagement starts. Scope changes are handled in writing, with a price attached, before they happen.',
  },
  {
    title: 'Reproducible or it is not a finding',
    body: 'Every issue ships with the steps and the proof of concept needed to see it yourself.',
  },
  {
    title: 'A public record',
    body: 'Our competition results are published by the organisers and linked from this site. The evidence is independently verifiable.',
  },
];
