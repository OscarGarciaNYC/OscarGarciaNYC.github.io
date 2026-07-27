import Link from "next/link";
import { resolveNavItems } from "@/lib/nav.server";
import { MobileMenu } from "./MobileMenu";
import { Nav } from "./Nav";
import { ThemeToggle } from "./ThemeToggle";
import { cx, FOCUS_RING, HOVER_TRANSITION } from "./styles";

/**
 * Global header — BLUEPRINT §1.4.
 *
 * Server Component. It resolves the D1 count gate at build time by reading the
 * real content directories (`lib/nav.server.ts` → `lib/content/loader.ts`) and
 * hands the surviving items to the two client components as plain props, so
 * neither the gate nor `node:fs` ever reaches the browser.
 *
 * 56px tall, 64px from 720px up. One hairline beneath, and deliberately no
 * backdrop blur. Sticky only from 1200px — a sticky header eats a phone
 * screen. Where it is sticky, headings need
 * `scroll-margin-top: calc(var(--header-h) + 16px)`; that rule belongs in
 * `app/globals.css`.
 */
export function SiteHeader() {
  const items = resolveNavItems();

  return (
    <header
      className={cx(
        "w-full border-b border-hairline bg-canvas font-sans",
        "min-[1200px]:sticky min-[1200px]:top-0 min-[1200px]:z-40",
      )}
    >
      <div
        className={cx(
          "mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4",
          "min-h-[56px] px-4 py-1 min-[720px]:min-h-[64px] min-[720px]:px-6",
        )}
      >
        <div className="flex min-w-0 items-baseline gap-3">
          <Link
            href="/"
            className={cx(
              "shrink-0 rounded-[4px] py-3 text-[16px] font-semibold leading-5 no-underline",
              "text-primary hover:text-accent",
              FOCUS_RING,
              HOVER_TRANSITION,
            )}
          >
            Oscar Garcia
          </Link>
          <span className="hidden truncate text-[13px] leading-5 text-secondary min-[480px]:inline">
            Senior Technical PM · New York
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Nav items={items} className="hidden min-[720px]:block" />
          {/* Wrapped rather than given a `hidden` class of its own: the toggle
              sets `inline-flex` on itself, and Tailwind emits `.inline-flex`
              after `.hidden`, so the two would collide on source order and the
              control would stay visible below 720px. Below that it lives in
              the mobile panel instead. */}
          <div className="hidden min-[720px]:block">
            <ThemeToggle />
          </div>
          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  );
}
