/**
 * Engagement detail.
 *
 * Statically generated per service via `generateStaticParams` — required by
 * `output: 'export'`, and correct regardless: there are five services and
 * they change about as often as the company does.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { getService, services } from '@content/services';
import { contact } from '@content/site';
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';
import { mailto } from '@/lib/utils';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Engagement ${service.index}`}
        title={service.title}
        lede={service.summary}
        crumbs={[
          { label: 'Engagements', href: '/services/' },
          { label: service.title, href: `/services/${service.slug}/` },
        ]}
        meta={[
          { label: 'Deliverable', value: service.outcome },
          { label: 'Stages', value: String(service.phases.length) },
          { label: 'Pricing', value: 'Fixed, agreed before start' },
        ]}
      />

      <div className="shell py-14 lg:py-20">
        <div className="grid gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          {/* ------------------------------------------------- main ------- */}
          <div>
            <Reveal>
              <p className="text-xl leading-relaxed text-fg">{service.body}</p>
            </Reveal>

            <section className="mt-16" aria-labelledby="phases-heading">
              <h2 id="phases-heading" className="label text-fg-faint">
                How the engagement runs
              </h2>

              <ol className="mt-8 space-y-px border-y border-rule bg-rule">
                {service.phases.map((phase, i) => (
                  <Reveal as="li" key={phase.title} delay={i * 0.05}>
                    <div className="flex gap-6 bg-surface px-1 py-7">
                      <span className="numeric shrink-0 text-xs text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold uppercase tracking-tight">
                          {phase.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{phase.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </section>

            <section className="mt-16" aria-labelledby="scope-heading">
              <h2 id="scope-heading" className="label text-fg-faint">
                Typical scope
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.scope.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border border-rule bg-surface-raised p-4 text-sm text-fg-muted"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* -------------------------------------------------- aside ----- */}
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="ticked border border-rule bg-surface-raised p-6">
              <h2 className="label text-fg-faint">What you receive</h2>
              <ul className="mt-5 space-y-3">
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

            <div className="border border-rule bg-surface-panel p-6">
              <h2 className="label text-fg-faint">Executed against</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.standards.map((standard) => (
                  <li
                    key={standard}
                    className="label border border-rule bg-surface px-2.5 py-1.5 text-[0.55rem] text-fg-muted"
                  >
                    {standard}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-accent bg-accent-wash p-6">
              <h2 className="text-lg uppercase text-fg">Scope this engagement</h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Tell us the targets and the window. You get an approach, a timeline and a fixed
                price {contact.responseTime}.
              </p>
              <div className="mt-6">
                <Button
                  href={mailto(
                    contact.email,
                    `${contact.engagementSubject} — ${service.title}`,
                    `Service: ${service.title}\n\nTargets:\n\nTimeline:\n\nContext:\n`,
                  )}
                  size="md"
                  flat
                >
                  Request this engagement
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* ------------------------------------------------ other work --- */}
        <section className="mt-24 border-t border-rule pt-12" aria-labelledby="other-heading">
          <h2 id="other-heading" className="label text-fg-faint">
            Other engagements
          </h2>
          <ul className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <li key={other.slug}>
                <a
                  href={`/services/${other.slug}/`}
                  className="group flex h-full flex-col gap-3 bg-surface-raised p-6 transition-colors hover:bg-surface-panel"
                >
                  <span className="numeric text-xs text-fg-faint">{other.index}</span>
                  <span className="text-base font-semibold uppercase tracking-tight transition-colors group-hover:text-accent">
                    {other.title}
                  </span>
                  <span className="text-xs leading-relaxed text-fg-faint">{other.outcome}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <JsonLd
        schema={serviceSchema({
          name: service.title,
          description: service.summary,
          path: `/services/${service.slug}/`,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Engagements', path: '/services/' },
          { name: service.title, path: `/services/${service.slug}/` },
        ])}
      />
    </>
  );
}
