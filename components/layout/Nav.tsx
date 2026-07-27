"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveRoute, type NavItem } from "@/lib/nav";
import { cx, FOCUS_RING, HOVER_TRANSITION } from "./styles";

/**
 * Primary navigation — BLUEPRINT §1.4.
 *
 * "use client" is required for exactly one reason: marking the active route.
 * A root-layout Server Component has no access to the current pathname, so
 * `usePathname()` is the only way to set `aria-current` and the 2px accent
 * underline. `usePathname` is part of the App Router runtime that ships on
 * every page regardless, so this adds no meaningful bytes to the budget.
 *
 * The item list itself is resolved on the server by `SiteHeader` and passed
 * down as props, so the D1 count gate never reaches the client bundle.
 *
 * Active route gets a 2px accent underline — never a background pill.
 * 44px touch height comes from padding only, so nothing clips if a label
 * wraps or letter-spacing changes (WCAG 1.4.12).
 */
export function Nav({
  items,
  className,
  onNavigate,
  orientation = "horizontal",
  label = "Primary",
}: {
  items: readonly NavItem[];
  className?: string;
  /** Called after a link is activated — lets the mobile panel close itself. */
  onNavigate?: () => void;
  orientation?: "horizontal" | "vertical";
  /** Landmark name. Only one Nav is ever in the a11y tree at a time. */
  label?: string;
}) {
  const pathname = usePathname();
  const vertical = orientation === "vertical";

  return (
    <nav aria-label={label} className={className}>
      <ul
        className={cx(
          "flex",
          vertical ? "flex-col items-stretch gap-1" : "flex-row items-center gap-1",
        )}
      >
        {items.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                // `typedRoutes` is on and three of these routes have no page
                // file yet (D1 gates them out of the nav until they do), so the
                // href comes out of config as a plain string. `lib/nav.ts` is
                // the single place those strings are declared.
                href={item.href as Route}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={cx(
                  "inline-flex items-center border-b-2 px-3 py-[13px] no-underline",
                  vertical ? "w-full text-[17px] leading-6" : "text-[15px] leading-[18px]",
                  active
                    ? "border-accent text-primary"
                    : "border-transparent text-secondary hover:border-interactive hover:text-primary",
                  FOCUS_RING,
                  HOVER_TRANSITION,
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
