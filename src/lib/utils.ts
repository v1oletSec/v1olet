/** Small shared helpers. Nothing here is worth a dependency. */

/** Conditional className joiner. */
export const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/** Two-letter initials for the avatar fallback, matching the previous site. */
export const initials = (name: string): string =>
  (name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2) || '??').toUpperCase();

/**
 * Splits an ordinal so the suffix can be rendered as a superscript beside a
 * tabular figure — "3rd" becomes `{ value: '3', suffix: 'rd' }`.
 */
export const splitOrdinal = (rank: string): { value: string; suffix: string } => {
  const match = /^(\d+)(st|nd|rd|th)$/i.exec(rank.trim());
  return match
    ? { value: match[1], suffix: match[2].toLowerCase() }
    : { value: rank, suffix: '' };
};

/** True for placements that deserve podium treatment. */
export const isPodium = (rank: string): boolean => /^[1-3](st|nd|rd)$/i.test(rank.trim());

/** Builds a `mailto:` URL with an encoded subject and body. */
export const mailto = (address: string, subject?: string, body?: string): string => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${address}${query ? `?${query.replace(/\+/g, '%20')}` : ''}`;
};

/** Rough reading time, at 220 words per minute, floored at one minute. */
export const readingMinutes = (text: string): number =>
  Math.max(1, Math.round(text.trim().split(/\s+/).length / 220));

/** ISO date → "28 Jul 2026". Locale-fixed so SSG and client agree. */
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Clamp helper used by the pointer-driven effects. */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));
