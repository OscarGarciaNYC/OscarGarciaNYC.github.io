/**
 * Route config for global navigation — BLUEPRINT §1.2 (route map) and §1.4.
 *
 * Implements decision D1: all seven routes build from day one, but
 * Architecture, Frameworks and Writing (/product-thinking) only appear in the
 * nav once their collection holds at least three published documents.
 *
 * This module is deliberately free of Node built-ins so it can be imported
 * from Client Components. The real document count lives in `lib/nav.server.ts`,
 * which reads the filesystem via `lib/content/loader.ts` and feeds it to
 * `filterNavItems` below.
 */

/** The id the skip link targets. `app/layout.tsx` must put this on `<main>`. */
export const MAIN_CONTENT_ID = "main-content";

/** D1 threshold: a gated collection joins the nav at this many published docs. */
export const NAV_GATE_MIN_DOCS = 3;

export type NavItem = {
  /** Route href. */
  readonly href: string;
  /** Visible link text. Self-describing on its own — §2.5. */
  readonly label: string;
  /**
   * Directory under `content/` whose published-document count gates this item.
   * Undefined means the item is always shown.
   */
  readonly gatedByCollection?: string;
};

/**
 * The full nav, in header order — BLUEPRINT §1.4.
 *
 * Note on the label "Writing": §1.4's header spec and §3.9's grouping both
 * label the `/product-thinking` route "Writing" in navigation contexts.
 * The route, the collection directory and the index page keep the
 * `product-thinking` name; only the nav label differs.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/architecture", label: "Architecture", gatedByCollection: "architecture" },
  { href: "/frameworks", label: "Frameworks", gatedByCollection: "frameworks" },
  { href: "/product-thinking", label: "Writing", gatedByCollection: "product-thinking" },
  { href: "/resume", label: "Résumé" },
  { href: "/about", label: "About" },
] as const;

/** Returns the number of published documents in a content collection. */
export type DocCounter = (collection: string) => number;

/**
 * Applies the D1 count gate. Ungated items always survive; gated items survive
 * only when `countDocs` reports at least `minDocs` published documents.
 */
export function filterNavItems(
  items: readonly NavItem[],
  countDocs: DocCounter,
  minDocs: number = NAV_GATE_MIN_DOCS,
): NavItem[] {
  return items.filter(
    (item) =>
      item.gatedByCollection === undefined ||
      countDocs(item.gatedByCollection) >= minDocs,
  );
}

/**
 * True when `href` is the current route or an ancestor of it, so
 * `/case-studies/treetales` marks the "Case Studies" item active.
 * `/` only matches exactly.
 */
export function isActiveRoute(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}
