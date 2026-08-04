'use client';

/**
 * Theme control.
 *
 * Cycles system → light → dark → system. Exposing `system` explicitly is the
 * point: a visitor who has never touched the control keeps following their OS
 * (including live switching at sunset), and a visitor who has chosen keeps
 * their choice across sessions.
 *
 * The button is a real `<button>` with `aria-live` feedback, so the state
 * change is announced rather than being a silent visual flip.
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import {
  nextPreference,
  readStoredPreference,
  resolveTheme,
  writeStoredPreference,
  type ThemePreference,
} from '@/lib/theme';
import { useMotionAllowed } from '@/lib/motion';
import { cx } from '@/lib/utils';

const LABELS: Record<ThemePreference, string> = {
  system: 'System theme',
  light: 'Light theme',
  dark: 'Dark theme',
};

function Icon({ pref }: { pref: ThemePreference }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-4 w-4',
    'aria-hidden': true,
  };

  if (pref === 'light') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.1M12 19.3v2.1M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M2.6 12h2.1M19.3 12h2.1M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5" />
      </svg>
    );
  }
  if (pref === 'dark') {
    return (
      <svg {...common}>
        <path d="M20.5 13.2A8.6 8.6 0 1 1 10.8 3.5a6.8 6.8 0 0 0 9.7 9.7z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </svg>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const [pref, setPref] = useState<ThemePreference>('system');
  const [mounted, setMounted] = useState(false);
  const motionAllowed = useMotionAllowed();

  // Read the persisted preference after hydration. Before this runs the button
  // renders its system icon, which matches the server output and so avoids a
  // hydration mismatch.
  useEffect(() => {
    setPref(readStoredPreference());
    setMounted(true);
  }, []);

  /**
   * Applies the current preference, and keeps `system` live so an OS theme
   * change moves the page immediately.
   *
   * Gated on `mounted` deliberately. Before the effect above has run, `pref`
   * is still its initial `'system'` — applying that would overwrite a stored
   * explicit choice with the OS value on every load, which is exactly the bug
   * this guard prevents. The inline script in `<head>` has already put the
   * correct theme on the document by then, so there is nothing to do until the
   * real preference is known.
   */
  useEffect(() => {
    if (!mounted) return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = resolveTheme(pref, mql.matches);
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
    };

    apply();
    if (pref !== 'system') return;

    mql.addEventListener('change', apply);
    return () => mql.removeEventListener('change', apply);
  }, [pref, mounted]);

  const cycle = useCallback(() => {
    const next = nextPreference(pref);
    setPref(next);
    writeStoredPreference(next);
    const resolved = resolveTheme(next, window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  }, [pref]);

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${LABELS[pref]}. Activate to switch.`}
      title={LABELS[pref]}
      data-cursor="theme"
      className={cx(
        'relative inline-flex h-10 w-10 items-center justify-center border border-rule bg-surface-raised text-fg-muted transition-colors duration-300 hover:border-accent hover:text-accent',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={pref}
          initial={motionAllowed ? { opacity: 0, rotate: -35, scale: 0.8 } : false}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={motionAllowed ? { opacity: 0, rotate: 35, scale: 0.8 } : undefined}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          <Icon pref={pref} />
        </motion.span>
      </AnimatePresence>

      {/* Announces the resulting state to assistive technology after a change. */}
      <span className="sr-only" role="status" aria-live="polite">
        {mounted ? LABELS[pref] : ''}
      </span>
    </button>
  );
}
