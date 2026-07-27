import type { ReactNode } from "react";
import s from "./mdx.module.css";

/**
 * `<Constraint>` — BLUEPRINT.md §2.6.
 *
 * A 2px `--border-interactive` left rule, no fill, and a kicker reading
 * "Constraint". This is deliberately the plainest treatment on the page: it
 * has to read as a stated fact, not as a brag about how hard the job was.
 *
 * The content should state the limit AND who imposed it. "The window was four
 * hours" is a constraint; "the window was four hours because the controller
 * owned close and close doesn't move" is a stakeholder map, and only the
 * second one teaches anything.
 *
 * The kicker is a `<p>`, not a heading — kickers are never headings (§2.5),
 * and this must not appear in the document outline or the TOC.
 */
export function Constraint({ children }: { children: ReactNode }) {
  return (
    <div
      data-breakout
      className={`${s.breakout} ${s.rule} ${s.ruleConstraint}`}
    >
      <p className={s.kicker}>Constraint</p>
      <div className={`${s.body} ${s.ruleBody}`}>{children}</div>
    </div>
  );
}
