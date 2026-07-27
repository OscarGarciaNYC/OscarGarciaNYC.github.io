import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { Footer, SiteHeader, SkipLink } from "@/components/layout";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { MAIN_CONTENT_ID } from "@/lib/nav";
import "./globals.css";

/**
 * Fonts (docs/BLUEPRINT.md §2.1, D2).
 *
 * `next/font/google` downloads and self-hosts these at build time — no runtime
 * request to Google, which is what the self-hosting requirement is actually
 * about, and it works unchanged under `output: 'export'`. Latin subset,
 * variable axes, woff2, `display: swap`, and a metric-matched `size-adjust`
 * fallback that next/font generates automatically so the swap is nearly
 * invisible.
 *
 * SUBSTITUTION: the blueprint names Commit Mono, which is not on Google Fonts.
 * JetBrains Mono is the blueprint's own stated fallback.
 */
const sourceSerif = Source_Serif_4({
  variable: "--font-serif-src",
  subsets: ["latin"],
  display: "swap",
  // OPEN QUESTION for Oscar. Roman only. These three faces preload at 136.6KB,
  // which is what §2.1's "~140KB total" budget actually buys. Adding
  // `style: ["normal", "italic"]` costs a measured +50.3KB (186.9KB total,
  // 37% over) and buys true italic letterforms for <em> — a real serif italic
  // has a single-storey 'a' and a cursive 'e', where the browser's synthesised
  // oblique just slants the roman. On a reading-first site with a serif body
  // that difference is visible. Held to the stated budget rather than
  // overspending it unilaterally; it is a one-line change to opt in.
});

const inter = Inter({
  variable: "--font-sans-src",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono-src",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://oscargarcianyc.github.io";
const siteName = "Oscar Garcia";
const siteDescription =
  "Product writing on enterprise systems — case studies, architecture decisions, and frameworks from a technical product manager.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Product management, written down`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} — Product management, written down`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Product management, written down`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // ThemeScript writes `data-theme` before React hydrates. The server
      // never renders that attribute, so this is required — and it is scoped
      // to <html>'s own attributes, not to the tree below it.
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${inter.variable} ${jetBrainsMono.variable} h-full`}
    >
      <head>
        {/* Must run before first paint. Keep it first in <head>. */}
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <SiteHeader />
        <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
