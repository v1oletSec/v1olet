/**
 * Method page.
 *
 * The long form of the four stages, plus the commitments that differentiate
 * the engagement. Written for the person who has to justify the purchase
 * internally, not for the person who signs it.
 */

import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { commitments, methodStages } from '@content/method';
import { standards } from '@content/trust';
import { contact } from '@content/site';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { mailto } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: 'Method',
  description:
    'Scope, test, report, retest. How a v1olet engagement runs, what exists at the end of each stage, and the standards each stage is executed against.',
  path: '/method/',
});

export default function MethodPage() {
  return (
    <>
      <PageHeader
        eyebrow="Method"
        title="Scope. Test. Report. Retest."
        lede="The same four stages on every engagement, with the same commitments attached to each. No stage exists to fill a slide — each one produces something you can hold."
        crumbs={[{ label: 'Method', href: '/method/' }]}
        meta={[
          { label: 'Stages', value: '4' },
          { label: 'Retest', value: 'Included in price' },
          { label: 'Critical findings', value: 'Escalated same hour' },
        ]}
      />

      <div className="shell py-14 lg:py-20">
        <ol className="space-y-px border-y border-rule bg-rule">
          {methodStages.map((stage) => (
            <Reveal as="li" key={stage.index}>
              <article className="grid gap-8 bg-surface px-1 py-14 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
                <div>
                  <span
                    aria-hidden="true"
                    className="numeric inline-flex h-14 w-14 items-center justify-center border border-accent text-base text-accent"
                  >
                    {stage.index}
                  </span>
                  <h2 className="mt-6 text-3xl uppercase">{stage.title}</h2>
                  <p className="numeric mt-4 text-xs text-fg-faint">{stage.duration}</p>
                </div>

                <div>
                  <p className="text-xl leading-snug text-accent">{stage.headline}</p>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
                    {stage.body}
                  </p>

                  <h3 className="label mt-9 text-fg-faint">Exists at the end of this stage</h3>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {stage.artefacts.map((artefact) => (
                      <li key={artefact} className="flex gap-3 text-sm text-fg-muted">
                        <svg
                          viewBox="0 0 16 16"
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path d="m3 8.5 3.2 3.2L13 5" />
                        </svg>
                        {artefact}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

        {/* ------------------------------------------------ commitments --- */}
        <section className="mt-24" aria-labelledby="commitments-heading">
          <h2 id="commitments-heading" className="text-3xl uppercase">
            What we commit to
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
            These are contractual, not aspirational. If any of them is not in your engagement
            document, it is missing and we will put it there.
          </p>

          <ul className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((commitment) => (
              <Reveal as="li" key={commitment.title}>
                <div className="h-full bg-surface-raised p-6">
                  <h3 className="text-base font-semibold uppercase tracking-tight text-fg">
                    {commitment.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{commitment.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------- standards --- */}
        <section className="mt-24" aria-labelledby="standards-heading">
          <h2 id="standards-heading" className="text-3xl uppercase">
            Executed against named standards
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
            Methodology is not improvised per engagement. Each stage maps onto published standards,
            which is what makes coverage arguable rather than asserted.
          </p>

          <ul className="mt-10 divide-y divide-[var(--rule)] border-y border-rule">
            {standards.map((standard) => (
              <li key={standard.abbr}>
                <a
                  href={standard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-2 py-5 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="numeric text-sm font-semibold text-accent">{standard.abbr}</span>
                  <span>
                    <span className="block text-sm text-fg transition-colors group-hover:text-accent">
                      {standard.name}
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

        <Reveal>
          <div className="ticked mt-20 flex flex-col items-start justify-between gap-6 border border-rule bg-surface-raised p-8 lg:flex-row lg:items-center lg:p-10">
            <div>
              <h2 className="text-2xl uppercase">Ready to scope something?</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
                One call is usually enough to establish the targets, the window and the price.
              </p>
            </div>
            <Button href={mailto(contact.email, contact.engagementSubject)} size="lg">
              Request an engagement
            </Button>
          </div>
        </Reveal>
      </div>

      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Method', path: '/method/' },
        ])}
      />
    </>
  );
}
