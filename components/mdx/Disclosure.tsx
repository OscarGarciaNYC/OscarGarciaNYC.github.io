import s from "./mdx.module.css";

/**
 * The canonical wording, locked by D4 and used verbatim every time.
 *
 * This is a module-level constant and NEVER a prop. That is the entire design:
 * a statement that varies by page reads as negotiated rather than standing, so
 * the component takes no content at all. If a document needs different words,
 * the document is wrong, not this string.
 */
const DISCLOSURE_TEXT =
  "Disclosure: This case study generalizes details and omits confidential information while preserving the underlying product problem, constraints, and decision process.";

/**
 * `<Disclosure>` — BLUEPRINT.md D4 and §2.6.
 *
 * One per document, directly beneath the doc header, and only where the
 * frontmatter sets `generalizesRealWork: true`. It renders nothing unless
 * invoked, and it is omitted entirely from purely conceptual articles and
 * public frameworks.
 *
 * 14px, muted, hairlines above and below, no fill, no icon — it answers the
 * confidentiality question once, quietly, and is then never repeated on the
 * page. D4 retired every inline per-claim marker that used to do this job.
 */
export function Disclosure() {
  return (
    <div data-breakout className={`${s.breakout} ${s.disclosure}`}>
      <p className={s.disclosureText}>{DISCLOSURE_TEXT}</p>
    </div>
  );
}
