import type { ReactNode } from "react";
import s from "./mdx.module.css";

/**
 * `<DecisionRecord>` — BLUEPRINT.md §2.6.
 *
 * A hairline block with a FIXED five-field grid. The fields are not
 * configurable and none of them is optional, because `alternatives` is the
 * field a fabricated ADR always omits — making it a required prop is the
 * whole point of the component.
 *
 * Kicker labels sit in a 130px left column, collapsing to labels-above-values
 * below 640px. `status` is plain text (`Accepted 2026-03`, `Superseded by
 * ADR-011`) — never a coloured pill, which would encode meaning in colour
 * alone (§2.5).
 */
export function DecisionRecord({
  id,
  context,
  decision,
  alternatives,
  consequences,
  status,
}: {
  /** e.g. `ADR-004`. Mono, top-left. */
  id?: string;
  /** The constraint that forced the decision. */
  context: ReactNode;
  /** What was decided, stated in the active voice. */
  decision: ReactNode;
  /** What else was on the table, and why it lost. Required — see above. */
  alternatives: ReactNode;
  /** What this cost, including the parts you would rather not admit. */
  consequences: ReactNode;
  /** Plain text, e.g. `Accepted 2026-03` or `Superseded by ADR-011`. */
  status: string;
}) {
  return (
    <div data-breakout className={`${s.breakout} ${s.record}`}>
      {id ? <p className={`${s.meta} ${s.recordId}`}>{id}</p> : null}
      <dl className={s.recordGrid}>
        <Field label="Context">{context}</Field>
        <Field label="Decision">{decision}</Field>
        <Field label="Alternatives considered">{alternatives}</Field>
        <Field label="Consequences">{consequences}</Field>
        <Field label="Status">{status}</Field>
      </dl>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.recordItem}>
      <dt className={`${s.kicker} ${s.recordTerm}`}>{label}</dt>
      <dd className={`${s.recordValue} ${s.body}`}>{children}</dd>
    </div>
  );
}
