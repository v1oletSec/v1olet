'use client';

/**
 * Capabilities grid.
 *
 * Five engagement types plus a sixth "not sure which you need" panel — the
 * structure the previous site used, kept because it answers the real first
 * question a buyer has. Each card links through to its own detail page.
 */

import Link from 'next/link';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Panel } from '@/components/ui/Panel';
import { SectionHead } from '@/components/ui/SectionHead';
import { services } from '@content/services';
import { contact } from '@content/site';
import { mailto } from '@/lib/utils';

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 lg:py-32">
      <div className="shell">
        <SectionHead
          index="01"
          eyebrow="Engagements"
          title="Five ways we get hired."
          lede="Engagements are scoped individually. Most clients start with an assessment and move to continuous testing once the release cadence picks up."
        />

        <RevealGroup className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.slug} className="group">
              <Panel
                as="article"
                ticks={false}
                className="flex h-full flex-col border-0 p-7"
              >
                <div className="flex items-baseline justify-between">
                  <span className="numeric text-xs text-fg-faint">{service.index}</span>
                  <span
                    aria-hidden="true"
                    className="text-fg-faint transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-accent"
                  >
                    →
                  </span>
                </div>

                <h3 className="mt-6 text-xl uppercase">
                  <Link
                    href={`/services/${service.slug}/`}
                    className="after:absolute after:inset-0 after:content-['']"
                    data-cursor="open"
                  >
                    {service.title}
                  </Link>
                </h3>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
                  {service.summary}
                </p>

                <p className="label mt-7 border-t border-rule pt-4 text-[0.6rem] text-fg-faint">
                  {service.outcome}
                </p>
              </Panel>
            </RevealItem>
          ))}

          <RevealItem>
            <Panel
              as="article"
              ticks={false}
              interactive={false}
              className="flex h-full flex-col border-0 bg-accent-wash p-7"
            >
              <span className="numeric text-xs text-accent">06</span>
              <h3 className="mt-6 text-xl uppercase text-fg">Not sure which you need?</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
                Most engagements start with a short scoping call. Tell us the stack and the deadline
                and we will say plainly what is worth testing first.
              </p>
              <a
                href={mailto(contact.email, 'Scoping call')}
                className="label mt-7 border-t border-rule pt-4 text-[0.6rem] text-accent underline-offset-4 hover:underline"
              >
                {contact.email} ↗
              </a>
            </Panel>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
