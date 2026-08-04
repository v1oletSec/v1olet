'use client';

/**
 * Site header.
 *
 * Behaviour worth knowing:
 *   - Condenses on scroll (height, blur, border) rather than hiding, so the
 *     primary CTA is always one click away on a long page.
 *   - A hairline scroll-progress rail sits on the bottom edge; it is derived
 *     from framer-motion's scroll progress and is inert under reduced motion.
 *   - The mobile drawer traps focus, closes on Escape and on route change, and
 *     locks body scroll while open.
 */

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Wordmark } from '@/components/layout/Wordmark';
import { contact, navigation } from '@content/site';
import { useMotionAllowed } from '@/lib/motion';
import { cx, mailto } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const motionAllowed = useMotionAllowed();
  const { scrollY, scrollYProgress } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setCondensed(latest > 24);
  });

  const close = useCallback(() => setOpen(false), []);

  // Close the drawer whenever the route changes — otherwise a tapped link
  // navigates behind an overlay that is still covering the page.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Escape to close, and a simple focus trap while open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-100 transition-[background-color,backdrop-filter,border-color] duration-500',
        condensed
          ? 'border-b border-rule bg-surface/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="shell">
        <div
          className={cx(
            'flex items-center justify-between gap-4 transition-[height] duration-500',
            condensed ? 'h-16' : 'h-20',
          )}
        >
          <Link
            href="/"
            className="shrink-0"
            aria-label="v1olet — home"
            data-cursor="home"
          >
            <Wordmark variant="nav" className={cx('transition-[height] duration-500', condensed ? 'h-6' : 'h-7')} priority />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cx(
                  'group relative px-3 py-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300',
                  isActive(item.href) ? 'text-accent' : 'text-fg-muted hover:text-fg',
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cx(
                    'absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              href={mailto(contact.email, contact.engagementSubject)}
              size="sm"
              className="hidden sm:inline-flex"
              cursorLabel="email"
            >
              Request an engagement
            </Button>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex h-10 w-10 items-center justify-center border border-rule bg-surface-raised text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress rail. */}
      <motion.div
        aria-hidden="true"
        className="h-px origin-left bg-accent"
        style={{ scaleX: motionAllowed ? scrollYProgress : 0 }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            ref={drawerRef}
            initial={motionAllowed ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={motionAllowed ? { opacity: 0, y: -8 } : undefined}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-rule bg-surface lg:hidden"
          >
            <div className="shell flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto py-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group border-b border-rule py-4"
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <span
                    className={cx(
                      'font-display text-xl uppercase tracking-tight transition-colors',
                      isActive(item.href) ? 'text-accent' : 'text-fg group-hover:text-accent',
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm text-fg-muted">{item.description}</span>
                </Link>
              ))}

              <div className="mt-6 flex flex-col gap-3">
                <Button href={mailto(contact.email, contact.engagementSubject)} size="lg" flat>
                  Request an engagement
                </Button>
                <Button href="/contact/" variant="outline" size="lg" flat>
                  Contact
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
