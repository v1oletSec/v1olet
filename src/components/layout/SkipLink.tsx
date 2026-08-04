/**
 * Skip link. First focusable element on every page, visually hidden until
 * focused. Keyboard users should never have to tab through the whole header
 * to reach content.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="label sr-only z-200 bg-accent px-4 py-3 text-accent-contrast focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}
