import type { ReactNode } from "react";
import s from "./mdx.module.css";

/**
 * `<Details>` — BLUEPRINT.md §2.6.
 *
 * The entire depth mechanism under D5. Native `<details>`/`<summary>`, so it
 * costs zero client JavaScript and stays findable and printable.
 *
 * THE REVIEW RULE, and it is testable: collapse every one of these, read the
 * page top to bottom, and confirm no argument has a hole in it. Expandables
 * carry elaboration — a schema, a config, a failure trace, the arithmetic.
 * They never carry a step in the reasoning.
 *
 * NEVER NESTED. One level only. A `<Details>` inside a `<Details>` means the
 * outer one is load-bearing, which means the content is wrong.
 */
export function Details({
  summary,
  children,
}: {
  /** Inter 15px. Describe what is inside, not "Read more". */
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className={s.details}>
      <summary className={`${s.summary} ${s.focusable}`}>
        <Chevron />
        <span>{summary}</span>
      </summary>
      <div className={s.detailsContent}>
        <div className={s.body}>{children}</div>
      </div>
    </details>
  );
}

/** Rotates 90deg on open (§2.4, 180ms). Decorative — the summary is the label. */
function Chevron() {
  return (
    <svg
      className={s.chevron}
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 2.5 L8 6 L4 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
