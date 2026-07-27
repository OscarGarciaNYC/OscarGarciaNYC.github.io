import { z } from "zod";
import { baseFrontmatter } from "./loader";

/**
 * Case study frontmatter — the data contract behind docs/BLUEPRINT.md §3.3.
 *
 * Two refinements do real work here and are worth reading before adding a
 * field:
 *
 *  - D4: a document that generalizes real work must carry the standard
 *    disclosure. `generalizesRealWork` comes from the base schema and drives
 *    the <Disclosure> block; there is no per-page wording to get wrong.
 *  - The editorial mandate: `teaches` and `myRole` are required on every
 *    document, so a case study cannot ship without stating the transferable
 *    idea and the author's actual role. Generalizing the subject is allowed;
 *    generalizing the verb is not.
 */
export const caseStudyFrontmatter = baseFrontmatter.extend({
  /** The organization, or the generalized description of it. */
  org: z.string().min(1),
  orgType: z.enum(["own-product", "employer", "advisory"]),
  /** Free text — "2026–present", "2023–2024". */
  timeframe: z.string().min(1),
  /** ≤140 chars. The failure, stated without the solution in it. */
  oneLineProblem: z.string().max(140),
  /** Rendered in the doc header. Exact figures only where checkable. */
  stack: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional(),
  /** Slugs in other collections. Validated against real files in Step 6. */
  relatedArchitecture: z.array(z.string()).default([]),
  relatedFrameworks: z.array(z.string()).default([]),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatter>;
