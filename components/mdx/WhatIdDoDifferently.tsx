import type { ReactNode } from "react";
import s from "./mdx.module.css";

/**
 * `<WhatIdDoDifferently>` — BLUEPRINT.md §2.6.
 *
 * A 2px `--signal-regret` left rule, and three required parts. Opens §6, ahead
 * of the outcome narrative: buried at the end this reads as a compliance
 * checkbox, ahead of the wins it reads as calibration.
 *
 * All three parts are required props rather than free children, because the
 * third one — what it would have cost — is the part that gets dropped, and
 * without it the block is an apology rather than an analysis.
 *
 * The three labels carry the meaning on their own, so the regret colour is
 * never the sole encoding (§2.5).
 */
export function WhatIdDoDifferently({
  change,
  why,
  cost,
}: {
  /** The specific thing you would do differently. Not "communicate more". */
  change: ReactNode;
  /** Why — the mechanism, not the feeling. */
  why: ReactNode;
  /** What the alternative would have cost. The part that gets dropped. */
  cost: ReactNode;
}) {
  return (
    <div data-breakout className={`${s.breakout} ${s.rule} ${s.ruleRegret}`}>
      <p className={s.kicker}>What I’d do differently</p>
      <dl className={s.regretList}>
        <Part label="What I’d change">{change}</Part>
        <Part label="Why">{why}</Part>
        <Part label="What it would have cost">{cost}</Part>
      </dl>
    </div>
  );
}

function Part({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.regretItem}>
      <dt className={`${s.kicker} ${s.regretTerm}`}>{label}</dt>
      <dd className={`${s.regretValue} ${s.body}`}>{children}</dd>
    </div>
  );
}
