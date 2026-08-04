/**
 * Imprint — PLACEHOLDER.
 *
 * The repository contains no legal entity, address, registration number, VAT
 * ID or managing director. Every one of those is mandatory under §5 DDG
 * (formerly §5 TMG) for a German-operated commercial site, and none of them
 * can be invented. The page therefore ships as a labelled skeleton with the
 * required fields listed, so it is obvious what has to be filled in and by
 * whom.
 *
 * `noindex` until real content lands.
 */

import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { contact, site } from '@content/site';
import { pageMetadata } from '@/lib/seo';
import { mailto } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: 'Imprint',
  description: 'Legal information for v1olet. Placeholder pending confirmation of entity details.',
  path: '/legal/imprint/',
  noindex: true,
});

const REQUIRED_FIELDS: Array<{ field: string; note: string }> = [
  { field: 'Legal entity name and form', note: 'e.g. GmbH, UG (haftungsbeschränkt), sole trader, or the equivalent in your jurisdiction' },
  { field: 'Registered address', note: 'A postal address; a PO box is not sufficient' },
  { field: 'Represented by', note: 'Managing director(s) or authorised representative(s)' },
  { field: 'Commercial register and number', note: 'Handelsregister court and HRB/HRA number, if registered' },
  { field: 'VAT identification number', note: 'USt-IdNr. under §27a UStG, if issued' },
  { field: 'Contact', note: 'Email and telephone number' },
  { field: 'Responsible for content', note: 'Name and address under §18 Abs. 2 MStV, where applicable' },
  { field: 'Professional liability insurance', note: 'Insurer and geographical scope, where a professional indemnity policy applies' },
  { field: 'Dispute resolution', note: 'Statement on participation in consumer arbitration under §36 VSBG' },
];

export default function ImprintPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Imprint"
        lede="Statutory provider information. This page is not yet complete."
        crumbs={[{ label: 'Imprint', href: '/legal/imprint/' }]}
      />

      <div className="shell max-w-3xl py-12 lg:py-20">
        <PlaceholderNotice>
          <p>
            The v1olet repository contains no company registration details, so nothing on this page
            has been filled in. The fields below are the ones a commercial site operated from
            Germany must publish under §5 DDG (formerly §5 TMG); equivalents apply elsewhere.
          </p>
          <p>
            <strong className="text-fg">Have this reviewed by a lawyer before publishing.</strong>{' '}
            An imprint that is incomplete or wrong is itself an abmahnfähig risk, and a site selling
            security services should not be the one getting that wrong.
          </p>
          <p>
            Fill this page in at{' '}
            <code className="numeric text-xs">src/app/legal/imprint/page.tsx</code>, and remove the{' '}
            <code className="numeric text-xs">noindex</code> flag in its metadata once it is
            complete.
          </p>
        </PlaceholderNotice>

        <div className="prose-v1 mt-12">
          <h2>Required information</h2>
          <p>
            Each row is a field that must be present. Values are omitted deliberately rather than
            guessed.
          </p>
        </div>

        <dl className="mt-8 divide-y divide-[var(--rule)] border-y border-rule">
          {REQUIRED_FIELDS.map((item) => (
            <div key={item.field} className="grid gap-2 py-5 sm:grid-cols-[16rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-fg">{item.field}</dt>
              <dd className="text-sm text-fg-muted">
                <span className="label mr-3 border border-dashed border-accent px-2 py-0.5 text-[0.5rem] text-accent">
                  To supply
                </span>
                {item.note}
              </dd>
            </div>
          ))}
        </dl>

        <div className="prose-v1 mt-12">
          <h2>Known today</h2>
          <p>
            The following are taken from the repository and are accurate; everything else above is
            outstanding.
          </p>
          <ul>
            <li>
              Trading name: <strong>{site.legalName}</strong>
            </li>
            <li>
              Website: <a href={site.url}>{site.url.replace('https://', '')}</a>
            </li>
            <li>
              Contact email:{' '}
              <a href={mailto(contact.email)}>{contact.email}</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
