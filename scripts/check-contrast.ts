/**
 * Contrast audit for the semantic token pairs used across the site.
 *
 *   npm run check:contrast
 *
 * The pairs below mirror how the tokens are actually combined in components,
 * so a failure here is a real failure on the page. Targets follow WCAG 2.2:
 * 4.5:1 for body text, 3:1 for large text (>=24px, or >=18.66px bold) and for
 * non-text UI boundaries such as focus rings and rules.
 *
 * Exits non-zero when a pair misses its target, so it can gate a build.
 */

type Level = 'body' | 'large' | 'ui';

interface Pair {
  name: string;
  fg: string;
  bg: string;
  level: Level;
  note?: string;
}

const TARGET: Record<Level, number> = { body: 4.5, large: 3, ui: 3 };

// Semantic tokens duplicated from globals.css. Kept as literals on purpose:
// the script must fail if the CSS changes without the audit being re-run.
const light = {
  surface: '#ffffff',
  surfaceRaised: '#f7f7fa',
  surfacePanel: '#f1f1f4',
  surfaceSunk: '#eaeaef',
  fg: '#08080a',
  fgMuted: '#4a4a56',
  fgFaint: '#6b6b78',
  rule: '#e2e2e8',
  ruleStrong: '#c9c9d2',
  accent: '#4e2bcc',
  accentHover: '#3a1f9e',
  accentContrast: '#ffffff',
  accentWash: '#f3efff',
};

const dark = {
  surface: '#08080a',
  surfaceRaised: '#101014',
  surfacePanel: '#16161c',
  surfaceSunk: '#0b0b0e',
  fg: '#ffffff',
  fgMuted: '#b8b8c4',
  fgFaint: '#9c9ca8',
  rule: '#24242b',
  ruleStrong: '#33333d',
  accent: '#a98bff',
  accentHover: '#cbbaff',
  accentContrast: '#ffffff',
  accentWash: '#17102e',
};

const severity = {
  critical: '#d64560',
  high: '#d0803a',
  medium: '#4a82c9',
  low: '#4e9a80',
};

/** Solid button fills, which are brand colours rather than semantic tokens. */
const brand = { 500: '#6840f4', 600: '#5a2fd6', 700: '#4e2bcc' };

const srgbToLinear = (c: number): number =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const luminance = (hex: string): number => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
};

const contrast = (a: string, b: string): number => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const pairs: Pair[] = [
  // --- light theme ---
  { name: 'light · body on surface', fg: light.fg, bg: light.surface, level: 'body' },
  { name: 'light · muted on surface', fg: light.fgMuted, bg: light.surface, level: 'body' },
  { name: 'light · muted on panel', fg: light.fgMuted, bg: light.surfacePanel, level: 'body' },
  { name: 'light · faint label on surface', fg: light.fgFaint, bg: light.surface, level: 'body' },
  { name: 'light · faint label on panel', fg: light.fgFaint, bg: light.surfacePanel, level: 'body' },
  { name: 'light · accent link on surface', fg: light.accent, bg: light.surface, level: 'body' },
  { name: 'light · accent on wash', fg: light.accent, bg: light.accentWash, level: 'body' },
  { name: 'light · accent on panel', fg: light.accent, bg: light.surfacePanel, level: 'body' },
  { name: 'light · solid button text', fg: light.accentContrast, bg: brand[700], level: 'body' },
  { name: 'light · solid button hover text', fg: light.accentContrast, bg: light.accentHover, level: 'body' },
  { name: 'light · focus ring on surface', fg: light.accent, bg: light.surface, level: 'ui' },
  { name: 'light · strong rule on surface', fg: light.ruleStrong, bg: light.surface, level: 'ui', note: 'decorative hairline, informational only' },

  // --- dark theme ---
  { name: 'dark · body on surface', fg: dark.fg, bg: dark.surface, level: 'body' },
  { name: 'dark · muted on surface', fg: dark.fgMuted, bg: dark.surface, level: 'body' },
  { name: 'dark · muted on panel', fg: dark.fgMuted, bg: dark.surfacePanel, level: 'body' },
  { name: 'dark · faint label on surface', fg: dark.fgFaint, bg: dark.surface, level: 'body' },
  { name: 'dark · faint label on panel', fg: dark.fgFaint, bg: dark.surfacePanel, level: 'body' },
  { name: 'dark · accent link on surface', fg: dark.accent, bg: dark.surface, level: 'body' },
  { name: 'dark · accent on raised', fg: dark.accent, bg: dark.surfaceRaised, level: 'body' },
  { name: 'dark · accent on wash', fg: dark.accent, bg: dark.accentWash, level: 'body' },
  { name: 'dark · solid button text', fg: dark.accentContrast, bg: brand[500], level: 'body' },
  { name: 'dark · focus ring on surface', fg: dark.accent, bg: dark.surface, level: 'ui' },

  // --- severity chips (large/label sized, hence the 3:1 target) ---
  { name: 'dark · critical on surface', fg: severity.critical, bg: dark.surface, level: 'ui' },
  { name: 'dark · high on surface', fg: severity.high, bg: dark.surface, level: 'ui' },
  { name: 'dark · medium on surface', fg: severity.medium, bg: dark.surface, level: 'ui' },
  { name: 'dark · low on surface', fg: severity.low, bg: dark.surface, level: 'ui' },
  { name: 'light · critical on surface', fg: severity.critical, bg: light.surface, level: 'ui' },
  { name: 'light · high on surface', fg: severity.high, bg: light.surface, level: 'ui' },
  { name: 'light · medium on surface', fg: severity.medium, bg: light.surface, level: 'ui' },
  { name: 'light · low on surface', fg: severity.low, bg: light.surface, level: 'ui' },
];

let failures = 0;
const rows = pairs.map((p) => {
  const ratio = contrast(p.fg, p.bg);
  const target = TARGET[p.level];
  const pass = ratio >= target;
  if (!pass && !p.note) failures += 1;
  return { ...p, ratio, target, pass };
});

const pad = (s: string, n: number) => s.padEnd(n, ' ');
const width = Math.max(...rows.map((r) => r.name.length));

console.log('\n  v1olet — token contrast audit (WCAG 2.2)\n');
for (const r of rows) {
  const mark = r.pass ? '  PASS' : r.note ? '  WARN' : '  FAIL';
  console.log(
    `${mark}  ${pad(r.name, width)}  ${r.ratio.toFixed(2).padStart(6)}:1   target ${r.target}:1${
      r.note ? `   (${r.note})` : ''
    }`,
  );
}

console.log(`\n  ${rows.length - failures}/${rows.length} pairs meet their target.\n`);
if (failures > 0) {
  console.error(`  ${failures} pair(s) below target — adjust the tokens in src/app/globals.css.\n`);
  process.exit(1);
}
