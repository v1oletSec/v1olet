/**
 * Writeups index.
 *
 * The team's `writeups` repository currently holds directory scaffolding
 * rather than prose, so this section ships with two clearly-marked sample
 * articles that exist to demonstrate the template. They carry `sample: true`
 * in their frontmatter, which is what drives the badge and the banner — remove
 * the flag when real content replaces them and both disappear.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Panel } from '@/components/ui/Panel';
import { socials } from '@content/site';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { getCategories, getWriteups } from '@/lib/writeups';

export const metadata: Metadata = pageMetadata({
  title: 'Writeups',
  description:
    'Technical writeups from v1olet competition and research work — web exploitation, binary exploitation, reverse engineering, cryptography and forensics.',
  path: '/writeups/',
});

export default function WriteupsPage() {
  const writeups = getWriteups();
  const categories = getCategories();
  const sampleCount = writeups.filter((w) => w.sample).length;

  return (
    <>
      <PageHeader
        eyebrow="Writeups"
        title="How the bug was actually found."
        lede="Notes from competition and research work. We publish the reasoning, not just the payload — the route to a finding is the part that transfers to the next target."
        crumbs={[{ label: 'Writeups', href: '/writeups/' }]}
        meta={[
          { label: 'Published', value: String(writeups.length) },
          { label: 'Categories', value: String(categories.length) },
          { label: 'Archive', value: 'github.com/v1oletSec' },
        ]}
      />

      <div className="shell py-14 lg:py-20">
        {sampleCount > 0 && (
          <Reveal>
            <aside className="mb-12 border-l-2 border-accent bg-accent-wash px-6 py-5">
              <p className="label text-[0.55rem] text-accent">Sample content</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg-muted">
                {sampleCount} of the {writeups.length} entries below are samples written to
                demonstrate this template — the targets in them are fictional. The team&rsquo;s real
                archive lives in the{' '}
                <a
                  href={socials.writeups}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  writeups repository
                </a>
                , which currently holds category scaffolding awaiting publication. Drop an{' '}
                <code className="numeric text-xs">.mdx</code> file into{' '}
                <code className="numeric text-xs">content/writeups</code> and it appears here.
              </p>
            </aside>
          </Reveal>
        )}

        {writeups.length === 0 ? (
          <p className="border border-rule bg-surface-raised p-10 text-sm text-fg-muted">
            No writeups published yet.
          </p>
        ) : (
          <ul className="grid gap-6 lg:grid-cols-2">
            {writeups.map((writeup, i) => (
              <Reveal as="li" key={writeup.slug} delay={i * 0.05} className="h-full">
                <Panel as="article" className="group flex h-full flex-col p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="label border border-accent/50 px-2 py-1 text-[0.55rem] text-accent">
                      {writeup.category}
                    </span>
                    {writeup.sample && (
                      <span className="label border border-rule px-2 py-1 text-[0.55rem] text-fg-faint">
                        Sample
                      </span>
                    )}
                    <span className="numeric ml-auto text-xs text-fg-faint">
                      {formatDate(writeup.date)}
                    </span>
                  </div>

                  <h2 className="mt-6 text-xl leading-snug tracking-tight">
                    <Link
                      href={`/writeups/${writeup.slug}/`}
                      className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                      data-cursor="read"
                    >
                      {writeup.title}
                    </Link>
                  </h2>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
                    {writeup.summary}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
                    <ul className="flex flex-wrap gap-1.5">
                      {writeup.tags.map((tag) => (
                        <li
                          key={tag}
                          className="label bg-surface-panel px-2 py-1 text-[0.5rem] text-fg-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <span className="numeric text-xs text-fg-faint">
                      {writeup.readingMinutes} min read
                    </span>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal>
          <div className="ticked mt-16 flex flex-col items-start justify-between gap-6 border border-rule bg-surface-raised p-8 lg:flex-row lg:items-center lg:p-10">
            <div>
              <h2 className="text-2xl uppercase">The full archive</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
                Competition notes, solutions and per-event structure live in the public repository.
              </p>
            </div>
            <a
              href={socials.writeups}
              target="_blank"
              rel="noopener noreferrer"
              className="label border border-rule px-5 py-4 text-[0.65rem] text-fg transition-colors hover:border-accent hover:text-accent"
            >
              github.com/v1oletSec/writeups ↗
            </a>
          </div>
        </Reveal>
      </div>

      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writeups', path: '/writeups/' },
        ])}
      />
    </>
  );
}
