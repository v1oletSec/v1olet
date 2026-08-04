/**
 * 404.
 *
 * Kept in the site's voice rather than reaching for a joke: a broken link is
 * a small failure and the useful response is a route out of it.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { navigation } from '@content/site';

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <p className="label text-accent">Error 404</p>
      <h1 className="mt-6 max-w-[16ch] text-balance text-[clamp(2.25rem,5vw,3.75rem)] uppercase leading-[1]">
        That path does not resolve.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
        The page you asked for is not here. If you followed a link from somewhere on this site,
        that is our bug — tell us and we will fix it.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/" size="lg">
          Back to the start
        </Button>
        <Button href="/contact/" variant="outline" size="lg">
          Report a broken link
        </Button>
      </div>

      <nav aria-label="Site sections" className="mt-16 border-t border-rule pt-8">
        <h2 className="label text-fg-faint">Everything else</h2>
        <ul className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-2 bg-surface-raised p-5 transition-colors hover:bg-surface-panel"
              >
                <span className="text-sm font-semibold uppercase tracking-tight transition-colors group-hover:text-accent">
                  {item.label}
                </span>
                <span className="text-xs leading-relaxed text-fg-faint">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
