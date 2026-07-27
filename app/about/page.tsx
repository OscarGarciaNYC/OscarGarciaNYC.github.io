import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx";
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
          <p className="doc-meta">
            Updated{" "}
            <time dateTime={doc.frontmatter.updatedAt}>
              {new Date(doc.frontmatter.updatedAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </p>
        </header>
        {content}
      </article>
    </div>
  );
}
