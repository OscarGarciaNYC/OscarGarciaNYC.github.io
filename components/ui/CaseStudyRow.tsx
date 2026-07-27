import Link from "next/link";
import type { CaseStudyFrontmatter } from "@/lib/content/schema";

const ROLE_LABEL: Record<string, string> = {
  owned: "Owned",
  led: "Led",
  contributed: "Contributed",
  advised: "Advised",
};

/**
 * A case study as a full-width row, not a card (§3.2).
 *
 * The mono meta line sits ABOVE the title because that is what a scanner uses
 * to triage — role, context, period. A reader who only reads the left-hand
 * meta column should be able to answer "is any of this relevant to me?"
 *
 * The whole row is one link target. Hover and focus move the arrow 2px and
 * change the hairline; no lift, no shadow, no scale (§2.4).
 */
export function CaseStudyRow({
  slug,
  frontmatter,
}: {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
}) {
  const { title, teaches, org, timeframe, myRole } = frontmatter;

  return (
    <li className="cs-row">
      <Link className="cs-row-link" href={`/case-studies/${slug}`}>
        <p className="cs-row-meta">
          {ROLE_LABEL[myRole] ?? myRole} · {org} · {timeframe}
        </p>
        <h3 className="cs-row-title">{title}</h3>
        <p className="cs-row-teaches">{teaches}</p>
        <span className="cs-row-cue" aria-hidden="true">
          Read
          <span className="cs-row-arrow">→</span>
        </span>
      </Link>
    </li>
  );
}
