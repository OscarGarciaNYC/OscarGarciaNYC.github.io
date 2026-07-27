import { readCollection } from "./loader";
import { caseStudyFrontmatter } from "./schema";

/**
 * One place that reads the collection, so the index, Home, and the detail
 * route can never disagree about what is published or what order it is in.
 */
export function getCaseStudies() {
  return readCollection("case-studies", caseStudyFrontmatter).sort((a, b) =>
    b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt),
  );
}
