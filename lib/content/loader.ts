import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * Fields every document carries, whatever collection it belongs to.
 * `teaches` and `myRole` are the editorial mandate expressed as a data
 * contract — see docs/BLUEPRINT.md, Part 0.
 */
export const baseFrontmatter = z.object({
  title: z.string().min(1),
  summary: z.string().max(200),
  teaches: z.string().max(160),
  myRole: z.enum(["owned", "led", "contributed", "advised"]),
  publishedAt: z.string(),
  status: z.enum(["draft", "published"]),
  /** True renders the standard disclosure block. See D4. */
  generalizesRealWork: z.boolean().default(false),
});

export type BaseFrontmatter = z.infer<typeof baseFrontmatter>;

export type Doc<T> = {
  slug: string;
  frontmatter: T;
  body: string;
};

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
}

/**
 * Reads and validates one collection at build time. A document with invalid
 * frontmatter throws, which fails `next build` — that is the point. Drafts
 * are excluded from the build entirely.
 */
export function readCollection<S extends z.ZodType<BaseFrontmatter>>(
  collection: string,
  schema: S,
): Doc<z.infer<S>>[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = schema.safeParse(data);

      if (!parsed.success) {
        throw new Error(
          `Invalid frontmatter in content/${collection}/${file}:\n${formatIssues(parsed.error)}`,
        );
      }

      return {
        slug: file.replace(/\.mdx$/, ""),
        frontmatter: parsed.data,
        body: content,
      };
    })
    .filter((doc) => doc.frontmatter.status === "published");
}
