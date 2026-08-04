/**
 * Trust page.
 *
 * The procurement-facing surface: certifications, standards, operational
 * handling, disclosure policy, references. Where data has not been supplied,
 * the page says so in a visible placeholder rather than filling the gap. That
 * is a deliberate design decision — an unverifiable claim on this page would
 * undermine every verifiable one next to it.
 */

import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import {
  certificationSummary,
  certifications,
  disclosurePolicy,
  operationalCommitments,
  references,
  standards,
} from '@content/trust';
import { contact, socials } from '@content/site';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { mailto } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: 'Trust and standards',
  description:
    'Certifications, methodology standards, data handling, rules of engagement and coordinated disclosure policy for v1olet engagements.',
  path: '/trust/',
});

const TRACK_LABELS = {
  offensive: 'Offensive',
  'red-team': 'Red team',
  management: 'Management',
  specialist: 'Specialist',
} as const;

export default function TrustPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="What we can evidence, and what we cannot yet."
        lede="Engagements run against published standards, under written authorisation, by certified operators. Anything on this page still awaiting confirmation is marked as such rather than estimated."
        crumbs={[{ label: 'Trust', href: '/trust/' }]}
        meta={[
          { label: 'Standards applied', value: String(standards.length) },
          { label: 'Disclosure ack.', value: disclosurePolicy.acknowledgementWindow },
          { label: 'Public record', value: 'CTFtime verified' },
        ]}
      />

      <div className="shell py-14 lg:py-20">
        {/* ------------------------------------------- certifications --- */}
        <section aria-labelledby="certs-heading">
          <h2 id="certs-heading" className="text-3xl uppercase">
            Certifications
          </h2>

          <Reveal>
            <div className="mt-8 border-l-2 border-accent bg-accent-wash px-6 py-5">
              <p className="label text-[0.55rem] text-accent">Placeholder — awaiting data</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg-muted">
                {certificationSummary.note}
              </p>
              <p className="mt-3 max-w-3xl text-xs leading-relaxed text-fg-faint">
                To publish real figures, set <code className="numeric">holders</code> on each entry in{' '}
                <code className="numeric">content/trust.ts</code>. Until then every count renders as
                pending; the page will not invent a number.
              </p>
            </div>
          </Reveal>

          <ul className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <li key={cert.abbr}>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 bg-surface-raised p-6 transition-colors hover:bg-surface-panel"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-2xl font-bold uppercase tracking-tight text-fg transition-colors group-hover:text-accent">
                      {cert.abbr}
                    </span>
                    <span className="label border border-rule px-2 py-1 text-[0.5rem] text-fg-faint">
                      {TRACK_LABELS[cert.track]}
                    </span>
                  </div>
                  <span className="text-sm text-fg-muted">{cert.name}</span>
                  <span className="mt-auto flex items-center justify-between border-t border-rule pt-3">
                    <span className="text-xs text-fg-faint">{cert.issuer}</span>
                    <span
                      className={
                        cert.holders === null
                          ? 'label text-[0.5rem] text-fg-faint/70'
                          : 'numeric text-sm text-accent'
                      }
                    >
                      {cert.holders === null ? 'Count pending' : `${cert.holders} operators`}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------ standards --- */}
        <section className="mt-24" aria-labelledby="standards-heading">
          <h2 id="standards-heading" className="text-3xl uppercase">
            Methodology standards
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
            Each standard below is applied to a specific part of the work. Naming them makes
            coverage arguable: you can hold a report against the guide it claims to follow.
          </p>

          <ul className="mt-10 divide-y divide-[var(--rule)] border-y border-rule">
            {standards.map((standard) => (
              <li key={standard.abbr}>
                <a
                  href={standard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-2 py-5 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="numeric text-sm font-semibold text-accent">{standard.abbr}</span>
                  <span>
                    <span className="block text-sm text-fg transition-colors group-hover:text-accent">
                      {standard.name}{' '}
                      <span className="text-fg-faint">· {standard.issuer}</span>
                    </span>
                    <span className="mt-1 block text-xs text-fg-faint">{standard.appliedTo}</span>
                  </span>
                  <span aria-hidden="true" className="text-fg-faint">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------- operational --- */}
        <section className="mt-24" aria-labelledby="ops-heading">
          <h2 id="ops-heading" className="text-3xl uppercase">
            Operational handling
          </h2>
          <ul className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {operationalCommitments.map((item) => (
              <Reveal as="li" key={item.title}>
                <div className="h-full bg-surface-raised p-7">
                  <h3 className="text-base font-semibold uppercase tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------- disclosure --- */}
        <section className="mt-24" aria-labelledby="disclosure-heading">
          <h2 id="disclosure-heading" className="text-3xl uppercase">
            Coordinated disclosure
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
            Found something in our own estate? Tell us. We acknowledge within{' '}
            {disclosurePolicy.acknowledgementWindow} and work to a{' '}
            {disclosurePolicy.resolutionTarget.toLowerCase()}.
          </p>

          <div className="mt-10 grid gap-px border border-rule bg-rule lg:grid-cols-3">
            <div className="bg-surface-raised p-7">
              <h3 className="label text-fg-faint">In scope</h3>
              <ul className="mt-4 space-y-2.5">
                {disclosurePolicy.scope.map((item) => (
                  <li key={item} className="numeric flex gap-3 text-xs text-fg-muted">
                    <span className="mt-1.5 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-raised p-7">
              <h3 className="label text-fg-faint">Out of scope</h3>
              <ul className="mt-4 space-y-2.5">
                {disclosurePolicy.outOfScope.map((item) => (
                  <li key={item} className="flex gap-3 text-xs text-fg-muted">
                    <span className="mt-1.5 h-px w-3 shrink-0 bg-rule-strong" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-raised p-7">
              <h3 className="label text-fg-faint">Report to</h3>
              <a
                href={mailto(contact.email, contact.disclosureSubject)}
                className="numeric mt-4 block text-sm text-accent underline underline-offset-4"
              >
                {disclosurePolicy.contact}
              </a>
              <p className="mt-4 text-xs leading-relaxed text-fg-faint">
                {disclosurePolicy.bounty
                  ? disclosurePolicy.bounty
                  : 'PLACEHOLDER — no monetary bounty programme is currently published. Credit is given in the advisory unless you ask otherwise.'}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-fg-faint">
                Machine-readable policy:{' '}
                <a
                  href="/.well-known/security.txt"
                  className="text-accent underline underline-offset-4"
                >
                  /.well-known/security.txt
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------- references --- */}
        <section className="mt-24" aria-labelledby="refs-heading">
          <h2 id="refs-heading" className="text-3xl uppercase">
            References
          </h2>
          <Reveal>
            <div className="mt-8 grid gap-8 border border-rule bg-surface-raised p-8 lg:grid-cols-2 lg:p-10">
              <div>
                <p className="label text-[0.55rem] text-accent">Placeholder</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{references.note}</p>
              </div>
              <div className="border-t border-rule pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <h3 className="label text-fg-faint">Public evidence available today</h3>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                  Competition placements are published by the organisers and indexed on{' '}
                  <a
                    href={socials.ctftime}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-4"
                  >
                    CTFtime
                  </a>
                  . That record is independent of anything we say about ourselves, which is why it
                  is the evidence we lead with.
                </p>
                <div className="mt-6">
                  <Button href="/record/" variant="outline" size="sm">
                    See the record
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Trust', path: '/trust/' },
        ])}
      />
    </>
  );
}
