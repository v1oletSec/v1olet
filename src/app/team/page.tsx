/**
 * Team page.
 *
 * Thirty operators, grouped by tier and filterable by discipline. The page
 * carries the "no subcontracting" claim, so it has to be the complete bench —
 * a partial roster would make the claim unverifiable.
 */

import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { TeamRoster } from '@/components/sections/TeamRoster';
import { Button } from '@/components/ui/Button';
import { byTier, disciplines, roster } from '@content/roster';
import { socials } from '@content/site';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Team',
  description: `The ${roster.length} operators who run v1olet engagements and compete under the v1olet tag — leadership, core members and team members, by discipline.`,
  path: '/team/',
});

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="The operators, all of them."
        lede="We do not subcontract, so this page is the whole bench. Engagement teams are assembled from the specialists a scope actually needs, and the lead is named before work starts."
        crumbs={[{ label: 'Team', href: '/team/' }]}
        meta={[
          { label: 'Operators', value: String(roster.length) },
          { label: 'Leadership', value: String(byTier.captain.length) },
          { label: 'Core', value: String(byTier.core.length) },
          { label: 'Disciplines', value: String(disciplines.length) },
        ]}
      />

      <div className="shell py-14 lg:py-20">
        <TeamRoster />

        <Reveal>
          <div className="ticked mt-24 grid gap-8 border border-rule bg-surface-raised p-8 lg:grid-cols-2 lg:p-10">
            <div>
              <h2 className="text-2xl uppercase">Want to be on this page?</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-fg-muted">
                We recruit continuously. If you compete seriously in pwn, rev, web, crypto,
                forensics or OSINT, send us your record — we care more about what you have broken
                than where you studied.
              </p>
              <div className="mt-7">
                <Button href={socials.careers} variant="outline">
                  Apply to v1olet
                </Button>
              </div>
            </div>

            <div className="border-t border-rule pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="label text-fg-faint">On certifications</h2>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                Several operators hold industry certifications including OSCP, CPTS and CRTO, and
                several have long professional practice outside competition. Per-operator
                credentials are not published here yet — see the{' '}
                <a href="/trust/" className="text-accent underline underline-offset-4">
                  trust page
                </a>{' '}
                for what is confirmed and what is still marked as pending.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Team', path: '/team/' },
        ])}
      />
    </>
  );
}
