import type { ReactNode } from "react";
import s from "./mdx.module.css";

/**
 * `<Policy>` — a standing rule the site holds itself to.
 *
 * Distinct from `<Constraint>`, which records a limit someone else imposed on
 * a project. A policy is a commitment the author chose and can be held to, so
 * it gets a boxed treatment rather than a left rule: it should read as a thing
 * pinned to the wall, and it should survive being screenshotted out of
 * context.
 *
 * Still no fill and no shadow — a hairline box and generous padding, per §2.6.
 */
export function Policy({
  title,
  children,
}: {
  /** Kicker heading. Name the rule, e.g. "Disclosure policy". */
  title: string;
  children: ReactNode;
}) {
  return (
    <aside data-breakout className={`${s.breakout} ${s.policy}`}>
      <p className={`${s.kicker} ${s.policyTitle}`}>{title}</p>
      <div className={s.policyBody}>{children}</div>
    </aside>
  );
}
