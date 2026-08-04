import 'server-only';

/**
 * Writeup loader.
 *
 * MDX files in `content/writeups` are read at build time — this module is
 * server-only and never reaches the client bundle. Frontmatter is parsed with
 * gray-matter; the body is compiled per-page with `next-mdx-remote/rsc`.
 *
 * Adding a writeup is: drop an `.mdx` file in the directory with the
 * frontmatter shape below. No index to update, no route to register.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Writeup } from '@content/types';
import { readingMinutes } from '@/lib/utils';

const WRITEUPS_DIR = path.join(process.cwd(), 'content', 'writeups');

interface Frontmatter {
  title: string;
  event: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  tags?: string[];
  sample?: boolean;
}

function parseFile(filename: string): Writeup {
  const raw = fs.readFileSync(path.join(WRITEUPS_DIR, filename), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  return {
    slug: filename.replace(/\.mdx?$/, ''),
    title: fm.title,
    event: fm.event,
    category: fm.category,
    date: fm.date,
    author: fm.author,
    summary: fm.summary,
    tags: fm.tags ?? [],
    sample: fm.sample ?? false,
    content,
    readingMinutes: readingMinutes(content),
  };
}

/** All writeups, newest first. Returns an empty array if the directory is absent. */
export function getWriteups(): Writeup[] {
  if (!fs.existsSync(WRITEUPS_DIR)) return [];

  return fs
    .readdirSync(WRITEUPS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getWriteup(slug: string): Writeup | undefined {
  return getWriteups().find((writeup) => writeup.slug === slug);
}

/** Distinct categories with counts, most populated first. */
export function getCategories(): Array<{ name: string; count: number }> {
  const counts = getWriteups().reduce<Record<string, number>>((acc, writeup) => {
    acc[writeup.category] = (acc[writeup.category] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}
