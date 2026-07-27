import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx";
import { DisclosureBadge } from "@/components/ui/DisclosureBadge";
import { FrontMatter } from "@/components/ui/FrontMatter";
import { readCollection } from "@/lib/content/loader";
import { mdxCompileOptions } from "@/lib/content/mdx";
import { caseStudyFrontmatter } from "@/lib/content/schema";

function caseStudies() {
  return readCollection("case-studies", caseStudyFrontmatter);
}

export function generateStaticParams() {
  return caseStudies().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = caseStudies().find((d) => d.slug === slug);
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.summary,
  };
}

const ROLE_LABEL: Record<string, string> = {
  owned: "Owned",
  led: "Led",
  contributed: "Contributed",
  advised: "Advised",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = caseStudies().find((d) => d.slug === slug);
  if (!doc) notFound();

  const { title, org, timeframe, myRole, teaches, generalizesRealWork, stack } =
    doc.frontmatter;

  const { content } = await compileMDX({
    source: doc.body,
    components: mdxComponents,
    options: mdxCompileOptions,
  });

  return (
    <div className="page">
      <article className="prose">
        {/*
          The doc header, not a hero (§1.1). `Role` and `Teaches` are rendered
          from required frontmatter, so a case study physically cannot ship
          without stating the author's actual role and the transferable idea.
        */}
        <header className="doc-header">
          <h1>{title}</h1>
          <p className="doc-teaches">
            <span className="doc-teaches-label">Teaches</span> {teaches}
          </p>
          <FrontMatter
            entries={[
              { label: "Role", value: ROLE_LABEL[myRole] ?? myRole },
              { label: "Context", value: org },
              { label: "Period", value: timeframe },
              ...(stack.length > 0
                ? [{ label: "Built with", value: stack.join(" · ") }]
                : []),
              ...(generalizesRealWork
                ? [{ label: "Disclosure", value: <DisclosureBadge /> }]
                : []),
              {
                label: "Updated",
                value: (
                  <time dateTime={doc.frontmatter.publishedAt}>
                    {new Date(doc.frontmatter.publishedAt).toLocaleDateString(
                      "en-US",
                      { month: "long", year: "numeric", timeZone: "UTC" },
                    )}
                  </time>
                ),
              },
            ]}
          />
        </header>

        {content}
      </article>
    </div>
  );
}
