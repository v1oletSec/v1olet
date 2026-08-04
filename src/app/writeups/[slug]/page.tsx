/**
 * Writeup detail.
 *
 * MDX is compiled here, on the server, at build time. Shiki highlighting is
 * baked into the markup, so a reader downloads styled code with no
 * client-side highlighter — the single largest saving available on a page
 * that is mostly code blocks.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { socials } from '@content/site';
import { mdxOptions } from '@/lib/mdx';
import { articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { getWriteup, getWriteups } from '@/lib/writeups';

export function generateStaticParams() {
  return getWriteups().map((writeup) => ({ slug: writeup.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const writeup = getWriteup(slug);
  if (!writeup) return {};

  return pageMetadata({
    title: writeup.title,
    description: writeup.summary,
    path: `/writeups/${writeup.slug}/`,
    type: 'article',
    publishedTime: writeup.date,
    authors: [writeup.author],
    // Samples exist to demonstrate the template; they should not compete with
    // the team's real writeups in search results.
    noindex: writeup.sample,
  });
}

export default async function WriteupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const writeup = getWriteup(slug);
  if (!writeup) notFound();

  const { content } = await compileMDX({
    source: writeup.content,
    options: mdxOptions,
  });

  const others = getWriteups().filter((w) => w.slug !== writeup.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${writeup.category} · ${writeup.event}`}
        title={writeup.title}
        lede={writeup.summary}
        crumbs={[
          { label: 'Writeups', href: '/writeups/' },
          { label: writeup.title, href: `/writeups/${writeup.slug}/` },
        ]}
        meta={[
          { label: 'Published', value: formatDate(writeup.date) },
          { label: 'Author', value: writeup.author },
          { label: 'Reading time', value: `${writeup.readingMinutes} min` },
          { label: 'Category', value: writeup.category },
        ]}
      />

      <article className="shell py-12 lg:py-20">
        {writeup.sample && (
          <aside className="mb-12 border-l-2 border-accent bg-accent-wash px-6 py-5">
            <p className="label text-[0.55rem] text-accent">Sample content — not a real writeup</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg-muted">
              This article was written to demonstrate the writeup template: typography, code
              highlighting, tables and callouts. The target described in it is fictional. It is
              excluded from search indexing and will be replaced by the team&rsquo;s own material.
            </p>
          </aside>
        )}

        <div className="prose-v1 max-w-3xl">{content}</div>

        <footer className="mt-16 max-w-3xl border-t border-rule pt-8">
          <ul className="flex flex-wrap gap-2">
            {writeup.tags.map((tag) => (
              <li
                key={tag}
                className="label border border-rule px-2.5 py-1.5 text-[0.55rem] text-fg-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/writeups/" variant="outline" size="sm">
              All writeups
            </Button>
            <a
              href={socials.writeups}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-[0.6rem] text-fg-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Archive on GitHub ↗
            </a>
          </div>
        </footer>

        {others.length > 0 && (
          <section className="mt-20 border-t border-rule pt-12" aria-labelledby="more-heading">
            <h2 id="more-heading" className="label text-fg-faint">
              More writeups
            </h2>
            <ul className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/writeups/${other.slug}/`}
                    className="group flex h-full flex-col gap-3 bg-surface-raised p-6 transition-colors hover:bg-surface-panel"
                  >
                    <span className="label text-[0.55rem] text-accent">{other.category}</span>
                    <span className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                      {other.title}
                    </span>
                    <span className="numeric mt-auto text-xs text-fg-faint">
                      {formatDate(other.date)} · {other.readingMinutes} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <JsonLd
        schema={articleSchema({
          title: writeup.title,
          description: writeup.summary,
          path: `/writeups/${writeup.slug}/`,
          datePublished: writeup.date,
          author: writeup.author,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writeups', path: '/writeups/' },
          { name: writeup.title, path: `/writeups/${writeup.slug}/` },
        ])}
      />
    </>
  );
}
