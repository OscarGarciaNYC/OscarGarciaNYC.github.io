import type { NextConfig } from "next";

// The site deploys as a static export to GitHub Pages, but every server-only
// feature stays one env var away. `STATIC_EXPORT=true` is set by the deploy
// workflow; without it this builds as a normal server app, so `vercel deploy`
// of the same repo works unchanged if we ever need route handlers.
// See docs/BLUEPRINT.md, Part 6 and Part 7.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,

  // The Pages file server resolves `/case-studies/treetales/` to
  // `out/case-studies/treetales/index.html`. Without the trailing slash it
  // looks for an extensionless file and 404s.
  trailingSlash: true,

  images: {
    // No image optimization server exists under export. Most visual evidence
    // on this site is inline SVG, which is unaffected.
    unoptimized: isStaticExport,
  },

  typedRoutes: true,
};

export default nextConfig;
