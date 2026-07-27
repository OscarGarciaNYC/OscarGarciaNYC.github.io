import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";

/**
 * Shared `compileMDX` options. Every route that renders MDX must use these, so
 * heading ids are generated identically everywhere.
 *
 * `rehype-slug` is what makes BLUEPRINT §1.1's "anchor everything" true:
 * documents get linked to and quoted, and a heading without a stable id can't
 * be. It never overwrites an id the author wrote by hand, so a heading that
 * needs a specific anchor — `<h2 id="disclosure">` on /about, which every
 * generalized case study points at — keeps it.
 */
export const mdxCompileOptions: MDXRemoteProps["options"] = {
  /**
   * next-mdx-remote v6 defaults to `blockJS: true`, which strips every JSX
   * expression attribute from the document. String props survive; anything
   * written as `{...}` is silently deleted, so `<TradeoffTable columns={[…]}>`
   * arrives with no columns and throws at render. Nothing warns — this only
   * surfaces the first time a component takes a non-string prop.
   *
   * That default exists for MDX from untrusted sources, which is a real threat
   * and not this one. Every document here is first-party, lives in `content/`
   * in this repository, is reviewed in a pull request, and is compiled at build
   * time — never at request time, and never from user input. If that ever
   * changes, this flag must change back first.
   *
   * `blockDangerousJS` is left at its default (true), so dangerous call
   * patterns are still rejected.
   */
  blockJS: false,
  mdxOptions: {
    rehypePlugins: [rehypeSlug],
  },
};
