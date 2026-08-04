/**
 * Placeholder banner.
 *
 * Used wherever the site renders content the repository did not supply. It is
 * loud on purpose: a legal page that looks finished but is not is worse than
 * one that is obviously unfinished, and this component makes the difference
 * impossible to miss in review.
 */

import type { ReactNode } from 'react';

export function PlaceholderNotice({
  title = 'Placeholder — not legal advice, not ready to publish',
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-2 border-dashed border-accent bg-accent-wash p-6 lg:p-8">
      <p className="label flex items-center gap-2 text-[0.6rem] text-accent">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          aria-hidden="true"
        >
          <path d="M12 9v4M12 17h.01M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </svg>
        {title}
      </p>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-fg-muted">{children}</div>
    </div>
  );
}
