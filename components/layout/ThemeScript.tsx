import {
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

/**
 * Resolves the theme before first paint.
 *
 * docs/BLUEPRINT.md §2.2 treats this as a design requirement rather than an
 * optimization: "A white flash on a dark-first site undoes the entire tone."
 *
 * How it avoids the flash: the script is inline and un-deferred, so the parser
 * runs it the moment it is reached in <head> — before the browser has any body
 * content to paint. Dark is already the default on :root in globals.css, so a
 * dark reader is correct even if this never runs at all.
 *
 * How it avoids a hydration mismatch: the server never emits `data-theme`.
 * Only this script writes it, only on the client, and <html> carries
 * `suppressHydrationWarning` so React accepts the attribute it did not render.
 *
 * A stored value of `system` — or no stored value, or unreadable storage —
 * removes the attribute rather than writing a resolved one. globals.css keys
 * its OS-preference branch on `:root:not([data-theme])`, so leaving the
 * attribute off is what keeps the OS preference live.
 */
const script = `(function(){try{var d=document.documentElement,v=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(v==="light"||v==="dark"){d.setAttribute(${JSON.stringify(
  THEME_ATTRIBUTE,
)},v)}else{d.removeAttribute(${JSON.stringify(
  THEME_ATTRIBUTE,
)})}}catch(e){}})();`;

export function ThemeScript() {
  return (
    <script
      // Static string built from module constants above — no user input path.
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
