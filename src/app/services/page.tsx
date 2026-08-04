/**
 * Engagement portfolio index.
 *
 * Each service is a full-width row rather than a card: the scope and
 * deliverable lists are the substance a buyer is actually comparing, and
 * squeezing them into a grid would truncate exactly the part that matters.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { methodStages } from '@content/method';
import { services } from '@content/services';
import { contact } from '@content/site';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { mailto } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: 'Engagements',
  description:
    'Penetration testing, red team operations, vulnerability research, continuous testing and training — scoped individually, fixed price, retest included.',
  path: '/services/',
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Engagements"
        title="Offensive security, scoped to what you actually ship."
        lede="Five engagement types. Every one is scoped individually, priced before it starts, and delivered by named operators who do not subcontract."
        crumbs={[{ label: 'Engagements', href: '/services/' }]}
        meta={[
          { label: 'Engagement types', value: String(services.length) },
          { label: 'Stages per engagement', value: String(methodStages.length) },
          { label: 'Retest', value: 'Included' },
        ]}
      />

      <div className="shell py-14 lg:py-20">
        <ol className="divide-y divide-[var(--rule)] border-y border-rule">
          {services.map((service) => (
            <Reveal as="li" key={service.slug}>
              <article className="group grid gap-8 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="numeric text-xs text-fg-faint">{service.index}</span>
                    <h2 className="text-2xl uppercase lg:text-3xl">
                      <Link
                        href={`/services/${service.slug}/`}
                        className="transition-colors hover:text-accent"
                        data-cursor="open"
                      >
                        {service.title}
                      </Link>
                    </h2>
                  </div>

                  <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted">
                    {service.summary}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {service.standards.slice(0, 4).map((standard) => (
                      <span
                        key={standard}
                        className="label border border-rule px-2 py-1 text-[0.55rem] text-fg-faint"
                      >
                        {standard}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button href={`/services/${service.slug}/`} variant="outline" size="sm">
                      Engagement detail
                    </Button>
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="label text-fg-faint">Typical scope</h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.scope.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-fg-muted">
                          <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="label text-fg-faint">You receive</h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-fg-muted">
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
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="ticked mt-16 flex flex-col items-start justify-between gap-6 border border-rule bg-surface-raised p-8 lg:flex-row lg:items-center lg:p-10">
            <div>
              <h2 className="text-2xl uppercase">Not sure which applies?</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
                Send the stack and the deadline. We will say plainly what is worth testing first —
                including when the honest answer is “not yet”.
              </p>
            </div>
            <Button href={mailto(contact.email, 'Scoping call')} size="lg">
              Book a scoping call
            </Button>
          </div>
        </Reveal>
      </div>

      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Engagements', path: '/services/' },
        ])}
      />
    </>
  );
}
