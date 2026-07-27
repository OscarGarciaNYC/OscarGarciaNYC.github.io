import type { ReactNode } from "react";
import s from "./mdx.module.css";

export type TradeoffColumn = {
  /** Key into each row object. */
  key: string;
  /** Column header. May be empty for the row-label column. */
  header: string;
  /** Right-aligns and applies tabular figures. */
  numeric?: boolean;
};

/** One row, keyed by `TradeoffColumn.key`. */
export type TradeoffRow = Record<string, ReactNode>;

/**
 * `<TradeoffTable>` — BLUEPRINT.md §2.6.
 *
 * A real semantic `<table>`: horizontal hairlines only, no zebra, no vertical
 * rules. Verdicts are WORDS (`Chosen`, `Rejected — operational cost`), never
 * check and cross icons, because an icon verdict hides the reasoning while a
 * phrase forces you to state the cost.
 *
 * Rows are a typed prop rather than children specifically so that below 640px
 * the same data can be re-rendered as one stacked block per row with repeated
 * labels. A horizontally scrolling table would be a §2.5 reflow failure; only
 * diagram containers get that exemption.
 *
 * Both renderings are in the DOM, but exactly one is ever displayed, so the
 * other is out of the accessibility tree and out of find-in-page.
 */
export function TradeoffTable({
  columns,
  rows,
  caption,
}: {
  columns: TradeoffColumn[];
  rows: TradeoffRow[];
  /** What the reader should take from the table. Sits above it. */
  caption?: string;
}) {
  const [labelColumn, ...dataColumns] = columns;

  return (
    <div data-breakout className={`${s.breakout} ${s.tableWrap}`}>
      <table className={s.table}>
        {caption ? (
          <caption className={s.tableCaption}>{caption}</caption>
        ) : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={column.numeric ? s.numeric : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row">{row[labelColumn.key]}</th>
              {dataColumns.map((column) => (
                <td
                  key={column.key}
                  className={column.numeric ? s.numeric : undefined}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={s.tableStack}>
        {caption ? <p className={s.tableCaption}>{caption}</p> : null}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={s.stackRow}>
            {labelColumn.header ? (
              <p className={`${s.kicker} ${s.stackKicker}`}>
                {labelColumn.header}
              </p>
            ) : null}
            <p className={s.stackTitle}>{row[labelColumn.key]}</p>
            <dl className={s.stackList}>
              {dataColumns.map((column) => (
                <div key={column.key} className={s.stackItem}>
                  <dt className={`${s.kicker} ${s.stackTerm}`}>
                    {column.header}
                  </dt>
                  <dd
                    className={`${s.stackValue} ${
                      column.numeric ? s.stackValueNumeric : ""
                    }`}
                  >
                    {row[column.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
