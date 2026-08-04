/**
 * Brand wordmark.
 *
 * Two theme-specific images rather than one filtered image: the mark's violet
 * "1" and flower must stay the brand violet in both themes while the
 * lettering flips, which a CSS filter cannot do without shifting the hue.
 *
 * Both are in the DOM and swapped with CSS so the correct one is painted on
 * the first frame, with no JS involvement and therefore no flash.
 */

import Image from 'next/image';
import { cx } from '@/lib/utils';

interface WordmarkProps {
  variant?: 'nav' | 'hero';
  className?: string;
  priority?: boolean;
}

const SOURCES = {
  nav: { dark: '/brand/wordmark-nav-dark.webp', light: '/brand/wordmark-nav-light.webp', w: 500, h: 155 },
  hero: { dark: '/brand/wordmark-hero-dark.webp', light: '/brand/wordmark-hero-light.webp', w: 1100, h: 531 },
} as const;

export function Wordmark({ variant = 'nav', className, priority = false }: WordmarkProps) {
  const src = SOURCES[variant];

  return (
    <span className={cx('relative block', className)}>
      <Image
        src={src.dark}
        alt="v1olet"
        width={src.w}
        height={src.h}
        priority={priority}
        className="hidden h-full w-auto object-contain dark:block"
      />
      <Image
        src={src.light}
        alt="v1olet"
        width={src.w}
        height={src.h}
        priority={priority}
        className="h-full w-auto object-contain dark:hidden"
      />
    </span>
  );
}
