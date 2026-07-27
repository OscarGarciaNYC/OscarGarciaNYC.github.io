import { MAIN_CONTENT_ID } from "@/lib/nav";
import { cx, FOCUS_RING, HOVER_TRANSITION } from "./styles";

/**
 * "Skip to content" — the first tab stop on every page (BLUEPRINT §2.5).
 * Visually hidden until it takes focus, then it sits over the header.
 *
 * Server Component: no state, no events.
 *
 * Contract for `app/layout.tsx`: render this as the first child of `<body>`,
 * and put `id={MAIN_CONTENT_ID}` plus `tabIndex={-1}` on the `<main>` element.
 */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className={cx(
        "sr-only",
        "focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100]",
        "focus-visible:inline-flex focus-visible:items-center",
        "focus-visible:rounded-[4px] focus-visible:border",
        "focus-visible:border-hairline",
        "focus-visible:bg-raised focus-visible:px-4 focus-visible:py-3",
        "font-sans text-[15px] leading-5 text-primary no-underline",
        FOCUS_RING,
        HOVER_TRANSITION,
      )}
    >
      Skip to content
    </a>
  );
}
