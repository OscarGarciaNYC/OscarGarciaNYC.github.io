import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { baseFrontmatter, readCollection } from "@/lib/content/loader";
import { Details } from "@/components/mdx/Details";

const mdxComponents = { Details };

function spikeDocs() {
  return readCollection("spike", baseFrontmatter);
}

export function generateStaticParams() {
  return spikeDocs().map((doc) => ({ slug: doc.slug }));
}

export default async function SpikePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = spikeDocs().find((d) => d.slug === slug);
  if (!doc) notFound();

  const { content } = await compileMDX({
    source: doc.body,
    components: mdxComponents,
  });

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {doc.frontmatter.title}
      </h1>
      <p className="mt-2 text-sm text-neutral-400">
        Role: {doc.frontmatter.myRole} · Teaches: {doc.frontmatter.teaches}
      </p>
      <div className="mt-8 flex flex-col gap-4 leading-relaxed">{content}</div>
    </main>
  );
}
