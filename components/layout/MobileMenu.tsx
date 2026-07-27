"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/lib/nav";
import { Nav } from "./Nav";
import { ThemeToggle } from "./ThemeToggle";
import { cx, FOCUS_RING, HOVER_TRANSITION } from "./styles";

/**
 * Mobile navigation below 720px — BLUEPRINT §1.4.
 *
 * A labelled `Menu` button, not a bare hamburger, opening a full-screen panel
 * carrying every link, the theme toggle and a labelled close button. The
 * current site simply hides the nav below 680px with no replacement; that is
 * the P0 this exists to not repeat.
 *
 * "use client" is required: open/closed state, a focus trap, an Escape
 * handler, body scroll locking and returning focus to the trigger are all
 * runtime browser behaviour.
 *
 * Accessibility: `aria-expanded` + `aria-controls` on the trigger, the panel is
 * a modal dialog, Tab and Shift+Tab wrap inside it, Escape closes, and focus
 * returns to the trigger on close.
 *
 * The panel is the one element on the site permitted a box-shadow (§2.3). It
 * has no entrance animation — page-transition animation is banned by §2.4.
 */

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  // On open: move focus into the panel and lock background scroll.
  // On close (or unmount): restore both, and hand focus back to the trigger.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  // Escape to close, Tab/Shift+Tab trapped inside the panel.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      const outside = !(active instanceof Node) || !panel.contains(active);

      if (event.shiftKey && (outside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // If the viewport grows past the mobile breakpoint while the panel is open,
  // close it — otherwise a full-screen overlay strands a desktop reader.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 720px)");
    function onChange() {
      if (query.matches) setOpen(false);
    }
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="min-[720px]:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cx(
          "inline-flex items-center rounded-[4px] border px-4 py-[13px]",
          "border-hairline",
          "font-sans text-[15px] leading-[18px] text-primary",
          "hover:border-interactive hover:text-accent",
          FOCUS_RING,
          HOVER_TRANSITION,
        )}
      >
        Menu
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={cx(
            "fixed inset-0 z-[90] flex flex-col overflow-y-auto",
            "bg-canvas font-sans",
          )}
        >
          <div
            className={cx(
              "flex items-center justify-between gap-4 border-b px-4 py-2",
              "border-hairline",
            )}
          >
            <span className="text-[16px] font-semibold leading-5 text-primary">
              Oscar Garcia
            </span>
            <button
              type="button"
              onClick={close}
              className={cx(
                "inline-flex items-center rounded-[4px] border px-4 py-[13px]",
                "border-hairline",
                "text-[15px] leading-[18px] text-primary",
                "hover:border-interactive hover:text-accent",
                FOCUS_RING,
                HOVER_TRANSITION,
              )}
            >
              Close
            </button>
          </div>

          <Nav
            items={items}
            orientation="vertical"
            onNavigate={close}
            className="px-2 py-4"
          />

          <div
            className={cx(
              "mt-auto flex items-center gap-3 border-t px-4 py-3",
              "border-hairline",
            )}
          >
            <ThemeToggle />
            <span className="text-[14px] leading-5 text-secondary">
              Color theme
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
