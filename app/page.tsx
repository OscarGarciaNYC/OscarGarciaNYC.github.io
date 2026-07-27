import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Step 0 — foundation
      </h1>
      <p className="mt-4 leading-relaxed text-neutral-400">
        Scaffold only. Proves static export and the MDX content pipeline before
        any page is designed against them. See docs/BLUEPRINT.md.
      </p>
      <p className="mt-6">
        <Link className="underline" href="/spike/mdx-under-static-export">
          Content pipeline spike
        </Link>
      </p>
    </main>
  );
}
