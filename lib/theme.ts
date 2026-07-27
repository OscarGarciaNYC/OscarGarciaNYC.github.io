/**
 * The shared theme contract. `ThemeScript` inlines the storage key into a
 * blocking <head> script, and the theme toggle reads and writes through the
 * same constants — so there is exactly one string to get wrong.
 *
 * See docs/BLUEPRINT.md §2.2: "Theme must resolve before first paint."
 */

/** What the user has explicitly chosen. `system` means they have not chosen. */
export type ThemePreference = "light" | "dark" | "system";

/** What is actually painted. There is no `system` at paint time. */
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** The attribute on <html>. Absent means "follow the OS". */
export const THEME_ATTRIBUTE = "data-theme";

/**
 * Dark-first, per §2.2. This is what renders with no JS, no stored choice,
 * and no OS preference — and it is what the server emits, which is why the
 * server markup can never carry a `data-theme` attribute.
 */
export const DEFAULT_THEME: ResolvedTheme = "dark";

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

/** Read the stored preference. Returns `system` if storage is unavailable. */
export function readStoredPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

/** Resolve a preference against the OS setting. */
export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;
  if (typeof window === "undefined" || !window.matchMedia) return DEFAULT_THEME;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

/**
 * Apply a preference to the document.
 *
 * `system` *removes* the attribute rather than writing the resolved value.
 * That matters: globals.css keys its media-query branch on
 * `:root:not([data-theme])`, so leaving the attribute off is what lets the OS
 * preference stay live if the user changes it while the page is open.
 */
export function applyThemePreference(preference: ThemePreference): void {
  const root = document.documentElement;
  if (preference === "system") {
    root.removeAttribute(THEME_ATTRIBUTE);
  } else {
    root.setAttribute(THEME_ATTRIBUTE, preference);
  }
}

/** Persist a preference. Silently no-ops when storage is blocked. */
export function storeThemePreference(preference: ThemePreference): void {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  } catch {
    // Private mode, disabled storage, or a blocked third-party context.
    // The theme still applies for this page view; it just will not persist.
  }
}
