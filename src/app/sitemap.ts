/**
 * Sitemap.
 *
 * Generated from the same content modules the pages render from, so a new
 * service or writeup appears in the sitemap without anyone remembering to add
 * it. Legal placeholders are excluded — they carry `noindex` and listing them
 * would contradict that.
 */

import type { MetadataRoute } from 'next';
import { services } from '@content/services';
import { site } from '@content/site';
import { getWriteups } from '@/lib/writeups';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/services/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/method/`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${site.url}/record/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/team/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/trust/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/writeups/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${site.url}/contact/`, lastModified: now, changeFrequency: 'yearly', priority: 0.9 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/services/${service.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Sample writeups are noindex; keep them out of the sitemap for consistency.
  const writeupRoutes: MetadataRoute.Sitemap = getWriteups()
    .filter((writeup) => !writeup.sample)
    .map((writeup) => ({
      url: `${site.url}/writeups/${writeup.slug}/`,
      lastModified: new Date(writeup.date),
      changeFrequency: 'yearly',
      priority: 0.6,
    }));

  return [...staticRoutes, ...serviceRoutes, ...writeupRoutes];
}
