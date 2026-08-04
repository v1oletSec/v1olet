/**
 * Root layout.
 *
 * Fonts are self-hosted through `next/font`: no request to a third-party
 * font host, no render-blocking stylesheet, and `font-display: swap` with a
 * matched fallback so there is no layout shift when the real face arrives.
 * The previous site loaded three families from Google Fonts, which was both a
 * third-party dependency and a privacy question the Datenschutz page would
 * otherwise have to answer.
 */

import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, Inter } from 'next/font/google';
import { Cursor } from '@/components/motion/Cursor';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/JsonLd';
import { SkipLink } from '@/components/layout/SkipLink';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import { themeInitScript } from '@/lib/theme';
import { site } from '@content/site';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Offensive Security`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: [
    'penetration testing',
    'red team',
    'offensive security',
    'vulnerability research',
    'security assessment',
    'CTF team',
    'application security',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png' }],
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Offensive Security`,
    description: site.shortDescription,
    locale: 'en_GB',
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} — offensive security` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Offensive Security`,
    description: site.shortDescription,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#08080a' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // `suppressHydrationWarning` is scoped to <html> alone: the inline
      // script below mutates `data-theme` before React hydrates, which React
      // would otherwise report as a mismatch. No other element opts out.
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Runs before first paint so the correct surface colour is committed
            on the first frame — this is what prevents a white flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh bg-surface text-fg antialiased">
        <SkipLink />
        <Cursor />
        <Header />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />
      </body>
    </html>
  );
}
