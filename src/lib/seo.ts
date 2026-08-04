/**
 * Metadata and structured data helpers.
 *
 * One builder per concern, so no page hand-assembles an Open Graph object and
 * forgets the canonical or the image dimensions.
 */

import type { Metadata } from 'next';
import { contact, site, socials } from '@content/site';

interface PageMetaInput {
  title: string;
  description: string;
  /** Route path with trailing slash, e.g. `/services/`. */
  path: string;
  /** Absolute or root-relative image path. Defaults to the site OG image. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  /** Keeps a page out of the index — used for legal placeholders. */
  noindex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  image = site.ogImage,
  type = 'website',
  publishedTime,
  authors,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;
  const absoluteImage = image.startsWith('http') ? image : `${site.url}${image}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: 'en_GB',
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: `${site.name} — ${title}` }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImage],
    },
  };
}

/* --------------------------------------------------------------------------
   JSON-LD
   Emitted as `application/ld+json` from the relevant route. Kept as plain
   objects so they can be unit-inspected and diffed.
   -------------------------------------------------------------------------- */

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/mark.webp`,
  image: `${site.url}${site.ogImage}`,
  description: site.description,
  email: contact.email,
  sameAs: [socials.linkedin, socials.github, socials.ctftime].filter(Boolean),
  knowsAbout: [
    'Penetration testing',
    'Red team operations',
    'Vulnerability research',
    'Application security',
    'Capture the flag competitions',
  ],
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en',
});

export const serviceSchema = (input: {
  name: string;
  description: string;
  path: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: input.name,
  description: input.description,
  serviceType: input.name,
  url: `${site.url}${input.path}`,
  provider: { '@id': `${site.url}/#organization` },
  areaServed: 'Worldwide',
});

export const breadcrumbSchema = (crumbs: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${site.url}${crumb.path}`,
  })),
});

export const articleSchema = (input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: input.title,
  description: input.description,
  url: `${site.url}${input.path}`,
  datePublished: input.datePublished,
  author: { '@type': 'Person', name: input.author },
  publisher: { '@id': `${site.url}/#organization` },
  image: `${site.url}${site.ogImage}`,
});
