import type { MetadataRoute } from 'next';
import { site } from '@content/site';

export const dynamic = 'force-static';

// Do not advertise the archived pages while the construction gate is active.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 }];
}
