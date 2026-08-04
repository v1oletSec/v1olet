/**
 * Contact page.
 *
 * Three routes, ordered by how a real enquiry arrives: build a structured
 * brief, write directly, or reach us on LinkedIn. The disclosure route is
 * separated so a security report never lands in a sales thread.
 */

import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { ScopingForm } from '@/components/sections/ScopingForm';
import { contact, socials } from '@content/site';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { mailto } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Build a scoping brief for a penetration test, red team operation or security assessment, or write to us directly. Replies usually within two working days.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you are shipping."
        lede="The more specific the brief, the more specific the first reply. Send the stack, the deadline and what worries you, and we come back with an approach, a timeline and a fixed price."
        crumbs={[{ label: 'Contact', href: '/contact/' }]}
        meta={[
          { label: 'Email', value: contact.email },
          { label: 'Response', value: contact.responseTime },
          { label: 'NDA', value: 'Before detailed scope' },
        ]}
      />

      <div className="shell py-14 lg:py-20">
        <ScopingForm />

        {/* ------------------------------------------------ other routes --- */}
        <section className="mt-24" aria-labelledby="routes-heading">
          <h2 id="routes-heading" className="label text-fg-faint">
            Other routes
          </h2>

          <ul className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            <Route
              title="Email"
              body="Direct to the team. No ticketing system in between."
              action={contact.email}
              href={mailto(contact.email, contact.engagementSubject)}
            />
            <Route
              title="LinkedIn"
              body="For introductions, procurement contacts, and anything that starts with a person."
              action="Message the company page"
              href={socials.linkedin}
              external
            />
            <Route
              title="Responsible disclosure"
              body="Found something in our own estate? This routes to the operators, not to sales."
              action="Report a security issue"
              href={mailto(contact.email, contact.disclosureSubject)}
            />
            <Route
              title="Careers"
              body="Competing seriously and want to join the bench? Send us your record."
              action="Apply to v1olet"
              href={socials.careers}
              external
            />
          </ul>
        </section>

        {/* --------------------------------------------------- what next --- */}
        <Reveal>
          <section
            className="ticked mt-16 border border-rule bg-surface-raised p-8 lg:p-10"
            aria-labelledby="next-heading"
          >
            <h2 id="next-heading" className="text-2xl uppercase">
              What happens after you send it
            </h2>
            <ol className="mt-8 grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'We read it and reply',
                  body: `A named operator responds ${contact.responseTime}, with questions only where the brief leaves something genuinely open.`,
                },
                {
                  step: '02',
                  title: 'Scoping call',
                  body: 'Thirty to forty-five minutes to establish targets, rules of engagement and the window. NDA first if you prefer.',
                },
                {
                  step: '03',
                  title: 'Proposal',
                  body: 'Approach, timeline, named lead and a fixed price. Nothing starts until that document is agreed.',
                },
              ].map((item) => (
                <li key={item.step}>
                  <span className="numeric text-xs text-accent">{item.step}</span>
                  <h3 className="mt-3 text-base font-semibold uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      </div>

      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact/' },
        ])}
      />
    </>
  );
}

function Route({
  title,
  body,
  action,
  href,
  external = false,
}: {
  title: string;
  body: string;
  action: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group flex h-full flex-col gap-3 bg-surface-raised p-6 transition-colors hover:bg-surface-panel"
      >
        <h3 className="text-base font-semibold uppercase tracking-tight transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-fg-muted">{body}</p>
        <span className="numeric mt-2 border-t border-rule pt-3 text-xs text-accent">
          {action} {external ? '↗' : '→'}
        </span>
      </a>
    </li>
  );
}
