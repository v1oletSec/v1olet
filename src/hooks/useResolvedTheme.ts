'use client';

/**
 * Reads the theme actually applied to <html>.
 *
 * Components that need to *know* the theme (the WebGL scene picking shader
 * colours, a canvas that cannot use CSS variables) subscribe here rather than
 * duplicating the preference logic. Everything that can express itself in CSS
 * should use the semantic tokens instead and never call this.
 */

import { useEffect, useState } from 'react';
import type { ResolvedTheme } from '@/lib/theme';

export function useResolvedTheme(): ResolvedTheme {
  // Dark is the pre-hydration assumption; it matches the brand's default
  // presentation, and the first effect corrects it within a frame.
  const [theme, setTheme] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === 'light' ? 'light' : 'dark');

    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
