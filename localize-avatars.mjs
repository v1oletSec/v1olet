#!/usr/bin/env node
/**
 * Downloads every remote avatar referenced in data.js into ./avatars/
 * and rewrites data.js to point at the local copies.
 *
 * Run from the repo root, BEFORE the Discord CDN links expire:
 *   node localize-avatars.mjs
 *
 * Safe to re-run. Files that already exist are skipped. If a download
 * fails, the original URL is left untouched so nothing breaks silently.
 */

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';

const DATA = './data.js';
const DIR = './avatars';

const EXT_BY_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/apng': 'apng',
  'image/avif': 'avif',
};

const slug = (name, i) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `member-${i}`;

const exists = p => access(p).then(() => true, () => false);

const { roster } = await import(new URL(DATA, import.meta.url).href);
await mkdir(DIR, { recursive: true });

let source = await readFile(DATA, 'utf8');
let saved = 0, skipped = 0, failed = 0;
const used = new Set();

for (const [i, m] of roster.entries()) {
  const url = m.avatar;
  if (!url || !/^https?:\/\//.test(url)) continue;

  // Non-ASCII names can slug down to the same string — keep filenames unique.
  let base = slug(m.name, i);
  if (used.has(base)) base = `${base}-${i}`;
  used.add(base);

  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const type = (res.headers.get('content-type') || '').split(';')[0].trim();
    const ext = EXT_BY_TYPE[type] || (new URL(url).pathname.match(/\.([a-z0-9]+)$/i)?.[1] ?? 'png');
    const file = `${base}.${ext.toLowerCase()}`;
    const path = join(DIR, file);

    if (await exists(path)) {
      skipped++;
    } else {
      await writeFile(path, Buffer.from(await res.arrayBuffer()));
      saved++;
      console.log(`  saved  ${m.name} -> ${path}`);
    }

    source = source.split(url).join(`./${DIR.replace(/^\.\//, '')}/${file}`);
  } catch (err) {
    failed++;
    console.warn(`  FAILED ${m.name}: ${err.message} (URL left as-is)`);
  }
}

await writeFile(DATA, source);
console.log(`\ndone — ${saved} downloaded, ${skipped} already present, ${failed} failed`);
if (failed) console.log('Re-run or replace the failed avatars by hand.');
