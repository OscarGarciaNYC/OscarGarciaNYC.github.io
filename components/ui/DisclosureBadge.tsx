import Link from "next/link";

/**
 * Confidentiality as a field in the doc header rather than a paragraph.
 *
 * Supersedes the standing <Disclosure> block (blueprint D4, amended
 * 2026-07-27). Restating the same sentence at the top of every case study
 * trains a reader to skip it by the third one, and a formal notice reads as
 * legal boilerplate. A labelled status in the front-matter reads as document
 * metadata, which is what it is — the same information, carrying the same
 * weight as ROLE or UPDATED.
 *
 * The full wording still exists once, on /about#disclosure, and the help text
 * here is a native <details> so it costs no JavaScript and stays findable by
 * Cmd+F.
 */
export function DisclosureBadge() {
  return (
    <span className="disclosure-badge">
      <span className="disclosure-chip">Generalized</span>
      <details className="disclosure-help">
        <summary>What this means</summary>
        <span className="disclosure-help-body">
          Account names, internal scale, and system specifics are generalized,
          and confidential information is omitted. The product problem, the
          constraints, and the decision process are intact.{" "}
          <Link href="/about#disclosure">Full policy</Link>
        </span>
      </details>
    </span>
  );
}
