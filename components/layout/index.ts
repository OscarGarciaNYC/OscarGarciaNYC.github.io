/**
 * Layout chrome. `app/layout.tsx` should compose these as:
 *
 *   <body>
 *     <SkipLink />
 *     <SiteHeader />
 *     <main id={MAIN_CONTENT_ID} tabIndex={-1}>{children}</main>
 *     <Footer />
 *   </body>
 *
 * `MAIN_CONTENT_ID` is exported from `@/lib/nav`.
 * `ThemeScript.tsx` is owned by another agent and is not re-exported here.
 */
export { Footer } from "./Footer";
export { MobileMenu } from "./MobileMenu";
export { Nav } from "./Nav";
export { SiteHeader } from "./SiteHeader";
export { SkipLink } from "./SkipLink";
export { ThemeToggle } from "./ThemeToggle";
