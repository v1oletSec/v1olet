/**
 * Theme model.
 *
 * Three states, not two. `system` is a real, selectable state rather than the
 * absence of a choice, which is what lets the site follow a visitor's OS
 * switching live while still honouring an explicit override.
 *
 *   system → track `prefers-color-scheme`, react to changes at runtime
 *   light  → forced, persisted
 *   dark   → forced, persisted
 */

export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'v1olet:theme';

/**
 * Inline script injected before first paint.
 *
 * This must stay dependency-free and synchronous: it runs in <head> so the
 * correct surface colour is committed on the first frame, which is the only
 * way to avoid a white flash on a dark-themed device. Kept as a string so it
 * can be handed to `dangerouslySetInnerHTML` — the only place in this codebase
 * that API is used, and only over a literal we control.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var pref = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = pref === 'system' ? (systemDark ? 'dark' : 'light') : pref;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`.trim();

/** Reads the stored preference, tolerating a disabled or full localStorage. */
export function readStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  } catch {
    return 'system';
  }
}

/** Persists a preference. Silently no-ops when storage is unavailable. */
export function writeStoredPreference(pref: ThemePreference): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    /* private mode, storage disabled, or quota exceeded — the session still works */
  }
}

/** Collapses a preference into the theme actually applied to the document. */
export function resolveTheme(pref: ThemePreference, systemPrefersDark: boolean): ResolvedTheme {
  if (pref === 'system') return systemPrefersDark ? 'dark' : 'light';
  return pref;
}

/** Cycle order for the toggle: system → light → dark → system. */
export const nextPreference = (pref: ThemePreference): ThemePreference =>
  pref === 'system' ? 'light' : pref === 'light' ? 'dark' : 'system';
