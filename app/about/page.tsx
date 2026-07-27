import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx";
import { FrontMatter } from "@/components/ui/FrontMatter";
import { NodeField } from "@/components/ui/NodeField";
import { pageFrontmatter, readCollection } from "@/lib/content/loader";
import { mdxCompileOptions } from "@/lib/content/mdx";

function aboutDoc() {
  return readCollection("pages", pageFrontmatter).find(
    (doc) => doc.slug === "about",
  );
}

export function generateMetadata(): Metadata {
  const doc = aboutDoc();
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.summary,
  };
}

export default async function AboutPage() {
  const doc = aboutDoc();
  if (!doc) notFound();

  const { content } = await compileMDX({
    source: doc.body,
    components: mdxComponents,
    options: mdxCompileOptions,
  });

  return (
    <div className="page">
      <article className="prose">
        <header className="doc-header">
          <h1>{doc.frontmatter.title}</h1>
          <p className="doc-lede">
            I take enterprise AI products from a customer problem to something
            that survives a security review. Here is what I work on, what I
            will and won&rsquo;t tell you about it, and how I decide.
          </p>
          <FrontMatter
            entries={[
              {
                label: "Focus",
                value: "Enterprise AI · identity · integrations · data platforms",
              },
              {
                label: "Current",
                value: "Technical PM — AI, data & integrations",
              },
              { label: "Building", value: "TreeTales (live in production)" },
              { label: "Based", value: "New York, NY" },
              {
                label: "Updated",
                value: (
                  <time dateTime={doc.frontmatter.updatedAt}>
                    {new Date(doc.frontmatter.updatedAt).toLocaleDateString(
                      "en-US",
                      { month: "long", year: "numeric", timeZone: "UTC" },
                    )}
                  </time>
                ),
              },
            ]}
          />
        </header>

        {/* The one piece of decorative motion on the site. It sits between the
            doc header and the prose, so it reads as a beat between the
            metadata and the reading instead of a texture underneath either. */}
        <NodeField />

        {content}
      </article>
    </div>
  );
}
