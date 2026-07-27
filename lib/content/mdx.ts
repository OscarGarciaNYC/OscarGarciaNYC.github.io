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
  mdxOptions: {
    rehypePlugins: [rehypeSlug],
  },
};
