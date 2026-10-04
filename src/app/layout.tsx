import type { Metadata, Viewport } from 'next';
import { UnderConstruction } from '@/components/construction/UnderConstruction';
import { site } from '@content/site';
import './globals.css';

const title = 'v1olet — Under Construction';
const description = 'Something new is taking shape. In the meantime, visit the v1olet CTF team at ctf.v1olet.xyz.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png' }],
  },
  openGraph: {
    type: 'website', url: site.url, siteName: site.name, title, description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: 'v1olet' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [site.ogImage] },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#08070c', colorScheme: 'dark', width: 'device-width', initialScale: 1,
};

// Temporary site-wide construction gate. Keeping the existing route sources
// makes the full website easy to restore; none of their UI is mounted here.
export default function RootLayout() {
  return (
    <html lang="en" data-theme="dark">
      <body><UnderConstruction /></body>
    </html>
  );
}
