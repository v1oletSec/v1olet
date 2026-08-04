'use client';

/**
 * Trust teaser.
 *
 * Certification counts are intentionally rendered as "PENDING" while
 * `content/trust.ts` carries `holders: null`. Publishing a number we have not
 * been given would be the one failure mode this section cannot survive: a
 * trust page that overstates is worse than no trust page.
 */

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionHead } from '@/components/ui/SectionHead';
import { certificationSummary, certifications, standards } from '@content/trust';

export function TrustPreview() {
  return (
    <section id="trust" className="relative py-24 lg:py-32">
      <div className="shell">
        <SectionHead
          index="05"
          eyebrow="Trust"
          title="Credentials, standards, and the paperwork procurement asks for."
          lede="Engagements run against named methodology standards, under written rules of engagement, by operators who hold industry certifications."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ------------------------------------------- certifications --- */}
          <div>
            <h3 className="label text-fg-faint">Certifications held on the team</h3>

            <RevealGroup className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-3">
              {certifications.map((cert) => (
                <RevealItem key={cert.abbr}>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col justify-between gap-4 bg-surface-raised p-5 transition-colors hover:bg-surface-panel"
                  >
                    <span className="font-display text-lg font-bold uppercase tracking-tight text-fg">
                      {cert.abbr}
                    </span>
                    <span className="text-[0.7rem] leading-snug text-fg-faint">{cert.issuer}</span>
                    <span
                      className={
                        cert.holders === null
                          ? 'label text-[0.55rem] text-fg-faint/70'
                          : 'numeric text-sm text-accent'
                      }
                    >
                      {cert.holders === null ? 'Count pending' : `${cert.holders} operators`}
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.05}>
              <p className="mt-5 border-l-2 border-accent bg-accent-wash px-4 py-3 text-xs leading-relaxed text-fg-muted">
                <strong className="label mr-2 text-[0.55rem] text-accent">Placeholder</strong>
                {certificationSummary.note}
              </p>
            </Reveal>
          </div>

          {/* ------------------------------------------------ standards --- */}
          <div>
            <h3 className="label text-fg-faint">Methodology standards</h3>

            <ul className="mt-6 divide-y divide-[var(--rule)] border-y border-rule">
              {standards.slice(0, 6).map((standard, i) => (
                <Reveal as="li" key={standard.abbr} delay={i * 0.04}>
                  <a
                    href={standard.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline gap-4 py-4 transition-colors hover:text-accent"
                  >
                    <span className="numeric w-24 shrink-0 text-xs font-semibold text-accent">
                      {standard.abbr}
                    </span>
                    <span className="flex-1 text-sm text-fg-muted transition-colors group-hover:text-fg">
                      {standard.appliedTo}
                    </span>
                    <span aria-hidden="true" className="text-fg-faint">
                      ↗
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <div className="mt-8">
                <Button href="/trust/" variant="outline" size="sm">
                  Full trust and standards page
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
