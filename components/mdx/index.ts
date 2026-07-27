/**
 * The evidence pattern library — docs/BLUEPRINT.md §2.6 and §2.7.
 *
 * Every component here is a Server Component. There is no `"use client"` in
 * this directory and nothing in it ships a byte of client JavaScript: the
 * disclosure is native `<details>`, the responsive table restructure and the
 * viewport-dependent default state of the diagram text equivalent are both
 * done with media queries over two renderings. That matters because D3 caps a
 * reading route at 15KB gzipped client JS, and a case study is mostly made of
 * these.
 *
 * None of them uses a drop shadow. All break out to 860px while prose stays
 * at 68ch, so they read as artifacts inserted into a document.
 */

export { Constraint } from "./Constraint";
export { DecisionRecord } from "./DecisionRecord";
export { Details } from "./Details";
export { Disclosure } from "./Disclosure";
export { Figure, SystemDiagram } from "./Figure";
export { Metric, MetricRow } from "./Metric";
export { Policy } from "./Policy";
export { TradeoffTable } from "./TradeoffTable";
export type { TradeoffColumn, TradeoffRow } from "./TradeoffTable";
export { WhatIdDoDifferently } from "./WhatIdDoDifferently";

import { Constraint } from "./Constraint";
import { DecisionRecord } from "./DecisionRecord";
import { Details } from "./Details";
import { Disclosure } from "./Disclosure";
import { Figure, SystemDiagram } from "./Figure";
import { Metric, MetricRow } from "./Metric";
import { Policy } from "./Policy";
import { TradeoffTable } from "./TradeoffTable";
import { WhatIdDoDifferently } from "./WhatIdDoDifferently";

/**
 * Passed to `compileMDX({ components: mdxComponents })`. These names are the
 * MDX authoring surface — an author can only reach a pattern that is in this
 * map, which is deliberate: the library is closed, not a component grab bag.
 */
export const mdxComponents = {
  Constraint,
  DecisionRecord,
  Details,
  Disclosure,
  Figure,
  Metric,
  MetricRow,
  Policy,
  SystemDiagram,
  TradeoffTable,
  WhatIdDoDifferently,
};
