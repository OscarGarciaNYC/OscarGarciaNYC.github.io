import type { ReactNode } from "react";
import s from "./mdx.module.css";

/**
 * `<Metric>` — BLUEPRINT.md §2.6.
 *
 * The label carries the insight; the number only confirms it. Value is Inter
 * 600/32px with tabular figures, label 14px, hairline separator, no box, and
 * deliberately NO accent colour on the number — a number tinted with the
 * brand accent is a number asking to be believed.
 *
 * D4 retired every inline disclosure marker: there is no `~=` glyph, no
 * dotted underline, and no required per-metric provenance line. A generalized
 * piece simply carries fewer numbers, which is the honest outcome.
 *
 * `source` is the one surviving affordance and it is OPTIONAL by design:
 * attribution for an exact, checkable figure from Oscar's own products, never
 * a hedge on an approximated one. If the number needs a hedge, cut the number.
 */
export function Metric({
  value,
  label,
  source,
  standalone = false,
}: {
  /** The figure itself. Rendered verbatim — no formatting is applied. */
  value: ReactNode;
  /** The sentence that makes the figure mean something. */
  label: ReactNode;
  /** Exact, checkable figures only. Rendered as `Source: {source}`. */
  source?: string;
  /** Set when the metric is not inside a `<MetricRow>`, for vertical rhythm. */
  standalone?: boolean;
}) {
  return (
    <div className={`${s.metric} ${standalone ? s.metricStandalone : ""}`}>
      <p className={s.metricValue}>{value}</p>
      <p className={`${s.caption} ${s.metricLabel}`}>{label}</p>
      {source ? (
        <p className={`${s.meta} ${s.metricSource}`}>Source: {source}</p>
      ) : null}
    </div>
  );
}

/**
 * Lays several metrics out as hairline-separated cells. Wraps to as many
 * columns as fit at a 200px minimum, so it stacks on a phone without a
 * breakpoint. Breaks out to 860px (§2.6).
 */
export function MetricRow({ children }: { children: ReactNode }) {
  return (
    <div data-breakout className={`${s.breakout} ${s.metricRow}`}>
      {children}
    </div>
  );
}
