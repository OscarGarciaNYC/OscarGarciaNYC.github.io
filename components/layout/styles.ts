/**
 * Shared class strings for the layout chrome.
 *
 * Colour comes from the Tailwind utilities that `app/globals.css` registers in
 * its `@theme inline` block (`bg-canvas`, `text-secondary`, `border-hairline`,
 * `text-accent`, …), each of which compiles to a §2.2 custom property. No
 * literal hex appears anywhere in `components/layout/`.
 *
 * These are written as complete, literal class strings — never interpolated —
 * because Tailwind v4 extracts candidates from source text and cannot see a
 * class assembled at runtime.
 */

/**
 * §2.5 focus contract: `:focus-visible` only, two-ring box-shadow so the ring
 * reads on canvas, raised and sunken surfaces alike. Written as an arbitrary
 * shadow because it needs the raw custom properties, not a colour utility.
 */
export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--surface-canvas),0_0_0_4px_var(--focus-ring)]";

/**
 * §2.4 motion doctrine: 120ms `cubic-bezier(0.2,0,0,1)`, and only colour,
 * border-colour and underline-offset may move. No transform, no opacity here.
 */
export const HOVER_TRANSITION =
  "transition-[color,border-color,text-decoration-color,text-underline-offset] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none";

/** Composes a class list, skipping empty segments. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
