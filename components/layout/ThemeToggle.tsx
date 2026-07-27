"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  applyThemePreference,
  DEFAULT_THEME,
  resolveTheme,
  storeThemePreference,
  THEME_ATTRIBUTE,
  type ResolvedTheme,
} from "@/lib/theme";
import { cx, FOCUS_RING, HOVER_TRANSITION } from "./styles";

/**
 * The only icon control on the site (BLUEPRINT §1.4), and it carries a real
 * accessible name rather than relying on the glyph.
 *
 * "use client" is required: this reads and writes `localStorage` and mutates
 * an attribute on `<html>` in response to a click. There is no
 * server-renderable form of that.
 *
 * Coordination with `ThemeScript`: every string and every write goes through
 * `lib/theme.ts`, so the blocking head script and this component cannot drift.
 * The three-state contract matters here — an *absent* `data-theme` means
 * "follow the OS", not "dark". Reading the attribute alone would mislabel the
 * button for a light-OS reader who has never chosen, so this resolves the
 * media query too. Clicking always writes an explicit preference, which is
 * what a two-state control should do.
 *
 * `data-theme` on `<html>` is the single source of truth rather than local
 * state, so the header toggle and the one inside the mobile panel can both be
 * mounted and neither goes stale.
 *
 * No animated theme crossfade and no icon rotation — both are on the §2.4
 * banned list. Only the colour transition applies.
 */

function readResolvedTheme(): ResolvedTheme {
  const attribute = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  if (attribute === "light" || attribute === "dark") return attribute;
  return resolveTheme("system");
}

function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [THEME_ATTRIBUTE],
  });

  // While no explicit preference is stored the OS setting is live, so the
  // label has to follow it.
  const query = window.matchMedia?.("(prefers-color-scheme: light)");
  query?.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    query?.removeEventListener("change", onChange);
  };
}

/**
 * The server emits no `data-theme` and cannot read a media query, so it has no
 * answer. Returning null keeps the server markup and the hydration pass
 * identical; only the label is affected, and only until hydration.
 */
function serverTheme(): ResolvedTheme | null {
  return null;
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore<ResolvedTheme | null>(
    subscribeToTheme,
    readResolvedTheme,
    serverTheme,
  );

  const toggle = useCallback(() => {
    const next: ResolvedTheme =
      readResolvedTheme() === "dark" ? "light" : "dark";
    applyThemePreference(next);
    storeThemePreference(next);
  }, []);

  const label =
    theme === null
      ? // Pre-hydration fallback. Dark is the default paint (§2.2), so this is
        // the correct guess for a reader who never sees it change.
        `Switch to ${DEFAULT_THEME === "dark" ? "light" : "dark"} theme`
      : theme === "dark"
        ? "Switch to light theme"
        : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cx(
        "inline-flex items-center justify-center rounded-[4px] p-3",
        "text-secondary hover:text-primary",
        FOCUS_RING,
        HOVER_TRANSITION,
        className,
      )}
    >
      {/* Half-filled circle: the same mark in both themes, so nothing animates
          and nothing depends on state that only exists after hydration. */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="10"
          cy="10"
          r="7.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5Z" fill="currentColor" />
      </svg>
    </button>
  );
}
