/**
 * Privacy policy — PLACEHOLDER, but a factually accurate one.
 *
 * The legal framing (controller identity, retention periods, legal bases,
 * data-subject contact) is missing and marked as such. What *is* stated here
 * is verifiable from this codebase: the site is a static export with no
 * analytics, no cookies, no third-party fonts and no form processor. Those
 * facts are worth publishing accurately even before a lawyer reviews the
 * wrapper, because they are the part most privacy pages get wrong.
 */

import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { contact } from '@content/site';
import { pageMetadata } from '@/lib/seo';
import { mailto } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy',
  description:
    'How v1olet.xyz handles data. The site is a static export with no analytics, cookies or third-party fonts.',
  path: '/legal/privacy/',
  noindex: true,
});

const FACTS = [
  {
    title: 'No analytics',
    body: 'No analytics, tag manager, heatmap or A/B tooling is loaded. There is no measurement script of any kind in the bundle.',
  },
  {
    title: 'No cookies',
    body: 'The site sets no cookies. The only client-side storage is a single localStorage key, v1olet:theme, holding your light/dark preference. It never leaves your browser and is not used to identify you.',
  },
  {
    title: 'Self-hosted fonts',
    body: 'Typefaces are served from this domain. No request is made to Google Fonts or any other font host, so no third party receives your IP address for font delivery.',
  },
  {
    title: 'No form processor',
    body: 'The contact form does not submit anywhere. It composes a message and hands it to your own mail client; nothing you type is transmitted to this site or to a third-party form service.',
  },
  {
    title: 'External links',
    body: 'Links to LinkedIn, GitHub, CTFtime, competition organisers and the careers form lead to third-party sites with their own policies. Nothing is embedded from them — you are only exposed to those parties if you follow a link.',
  },
  {
    title: 'Hosting',
    body: 'PLACEHOLDER — the site is served as static files by GitHub Pages (GitHub, Inc.). Server access logs, including IP addresses, are processed by the host. The retention period and the applicable data-processing terms must be stated here.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        lede="What this site does and does not collect. The technical facts below are accurate; the legal framing around them is not yet complete."
        crumbs={[{ label: 'Privacy', href: '/legal/privacy/' }]}
      />

      <div className="shell max-w-3xl py-12 lg:py-20">
        <PlaceholderNotice title="Placeholder — legal framing incomplete">
          <p>
            The following are missing and cannot be derived from the repository: the identity and
            address of the controller under Art. 4(7) GDPR, the data protection officer (if one is
            appointed), the legal bases relied on, retention periods, the hosting provider&rsquo;s
            processing terms, and the supervisory authority for complaints.
          </p>
          <p>
            <strong className="text-fg">Have this reviewed by a lawyer before publishing.</strong>{' '}
            The sections below are accurate as a description of the software, which is the part this
            codebase can honestly assert.
          </p>
        </PlaceholderNotice>

        <section className="mt-14" aria-labelledby="facts-heading">
          <h2 id="facts-heading" className="text-2xl uppercase">
            What this site actually does
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">
            Each statement below is verifiable from the published source. If any of it stops being
            true, this page has to change in the same commit.
          </p>

          <ul className="mt-8 divide-y divide-[var(--rule)] border-y border-rule">
            {FACTS.map((fact) => (
              <li key={fact.title} className="py-5">
                <h3 className="text-sm font-semibold text-fg">{fact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{fact.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="rights-heading">
          <h2 id="rights-heading" className="text-2xl uppercase">
            Your rights
          </h2>
          <div className="prose-v1 mt-6">
            <p>
              Under the GDPR you have the right of access (Art. 15), rectification (Art. 16),
              erasure (Art. 17), restriction (Art. 18), data portability (Art. 20) and objection
              (Art. 21), as well as the right to lodge a complaint with a supervisory authority
              (Art. 77).
            </p>
            <p>
              To exercise any of them, write to{' '}
              <a href={mailto(contact.email, 'Data protection enquiry')}>{contact.email}</a>.
            </p>
            <p>
              <strong>PLACEHOLDER</strong> — the competent supervisory authority depends on the
              controller&rsquo;s registered seat and must be named here once the entity details are
              confirmed.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="engagement-heading">
          <h2 id="engagement-heading" className="text-2xl uppercase">
            Engagement data
          </h2>
          <div className="prose-v1 mt-6">
            <p>
              Data handled during a security engagement is governed by the engagement contract and
              its data-processing agreement, not by this website policy. Retention, destruction
              schedules and transfer mechanisms are agreed per engagement — see the{' '}
              <a href="/trust/">trust page</a> for the operational commitments that apply.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
