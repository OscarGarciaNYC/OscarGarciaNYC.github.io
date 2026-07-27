import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyRow } from "@/components/ui/CaseStudyRow";
import { FrontMatter } from "@/components/ui/FrontMatter";
import { getCaseStudies } from "@/lib/content/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Enterprise product work written up in full: the problem, the constraints, the decision, what it cost, and what I would do differently.",
};

export default function CaseStudiesPage() {
  const studies = getCaseStudies();

  return (
    <div className="page">
      <div className="index-page">
        <header className="doc-header">
          <h1>Case studies</h1>
          <p className="doc-lede">
            Each one states the problem, the constraints that shaped it, the
            decision I made, and what that decision cost. Written to be useful
            to someone facing a similar problem.
          </p>
          <FrontMatter
            entries={[
              {
                label: "Published",
                value: `${studies.length} ${studies.length === 1 ? "study" : "studies"}`,
              },
              {
                label: "Disclosure",
                value: (
                  <>
                    Work for clients and employers is generalized.{" "}
                    <Link href="/about#disclosure">How I handle this</Link>
                  </>
                ),
              },
            ]}
          />
        </header>

        <ul className="cs-list">
          {studies.map((doc) => (
            <CaseStudyRow
              key={doc.slug}
              slug={doc.slug}
              frontmatter={doc.frontmatter}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
