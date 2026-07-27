/**
 * Server-only half of the navigation config. Split from `lib/nav.ts` because
 * this file reaches `lib/content/loader.ts`, which imports `node:fs` — pulling
 * that into a Client Component bundle would fail the build.
 *
 * Import this from Server Components only (`SiteHeader` does).
 */
import { baseFrontmatter, readCollection } from "@/lib/content/loader";
import { filterNavItems, NAV_GATE_MIN_DOCS, NAV_ITEMS, type NavItem } from "@/lib/nav";

/**
 * Real count of published documents in a collection, read from disk at build
 * time. `readCollection` returns `[]` for a directory that does not exist and
 * drops anything whose `status` is not `published`, which is exactly the
 * definition the D1 gate needs.
 */
export function countPublishedDocs(collection: string): number {
  return readCollection(collection, baseFrontmatter).length;
}

/**
 * The nav as it should render right now. With `content/architecture`,
 * `content/frameworks` and `content/product-thinking` empty, this resolves to
 * Case Studies · Résumé · About.
 */
export function resolveNavItems(): NavItem[] {
  return filterNavItems(NAV_ITEMS, countPublishedDocs, NAV_GATE_MIN_DOCS);
}
