/**
 * robots.txt.
 *
 * Legal placeholders are disallowed explicitly as well as carrying `noindex`,
 * so an unfinished imprint cannot be surfaced by a crawler that ignores the
 * meta tag.
 */

import type { MetadataRoute } from 'next';
import { site } from '@content/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/legal/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
