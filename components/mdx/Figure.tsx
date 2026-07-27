import type { ReactNode } from "react";
import s from "./mdx.module.css";

/** Constant, so the affordance is worded identically on every diagram. */
const TEXT_EQUIVALENT_SUMMARY = "Text description of this diagram";

/**
 * `<Figure>` — BLUEPRINT.md §2.7.
 *
 * The wrapper every hand-authored inline SVG diagram goes through. It owns the
 * `<svg>` element itself rather than accepting one, which is the only way to
 * guarantee that `role="img"`, `<title>`, `<desc>`, the viewBox and the
 * min-width are always present. Children are the diagram's shapes.
 *
 * `textEquivalent` is REQUIRED. §2.7 is explicit that if it is optional in the
 * schema it will not get written — and it is the only thing a reader who
 * cannot see the SVG has.
 *
 * The text equivalent is always in the DOM so Cmd+F finds it, and is open by
 * default below 768px. Two `<details>` are rendered and exactly one is
 * displayed; the other is `display: none`, so it is out of the accessibility
 * tree and out of find-in-page. That is what lets this component honour a
 * viewport-dependent default state with zero client JavaScript.
 *
 * Colour comes entirely from custom properties inherited from the wrapper —
 * §2.7 bans literal hex in the SVG. Shapes should use `stroke="currentColor"`
 * and rely on the inherited defaults. Node type is carried by SHAPE (rect =
 * service, rounded = store, hexagon = gate) plus a label, never by colour.
 */
export function Figure({
  title,
  desc,
  caption,
  textEquivalent,
  viewBox,
  minWidth = 640,
  children,
}: {
  /** Accessible name of the diagram. Becomes `<title>`. */
  title: string;
  /** What the diagram shows, one or two sentences. Becomes `<desc>`. */
  desc: string;
  /** The visible caption. Says what the reader should take from it. */
  caption: ReactNode;
  /** Required. The diagram in prose — see above. */
  textEquivalent: ReactNode;
  /** e.g. `"0 0 720 360"`. */
  viewBox: string;
  /** §2.7 — never scale below 100%; below this width the container scrolls. */
  minWidth?: number;
  /** The diagram's shapes, labels and markers. */
  children: ReactNode;
}) {
  return (
    <figure data-breakout className={`${s.breakout} ${s.figure}`}>
      {/*
        §2.5 — diagram containers are the one permitted two-dimensional scroll
        region on the site, so this is keyboard reachable and named.
      */}
      <div
        role="group"
        tabIndex={0}
        aria-label={title}
        className={`${s.diagramScroll} ${s.focusable}`}
      >
        <svg
          className={s.diagramSvg}
          viewBox={viewBox}
          role="img"
          aria-label={title}
          style={{ minWidth: `${minWidth}px` }}
        >
          <title>{title}</title>
          <desc>{desc}</desc>
          {children}
        </svg>
      </div>

      <figcaption className={`${s.caption} ${s.figcaption}`}>
        {caption}
      </figcaption>

      <div className={s.equivalentWide}>
        <TextEquivalent open={false}>{textEquivalent}</TextEquivalent>
      </div>
      <div className={s.equivalentNarrow}>
        <TextEquivalent open>{textEquivalent}</TextEquivalent>
      </div>
    </figure>
  );
}

/**
 * Deliberately not `<Details>`: that component is reserved for D5 progressive
 * disclosure inside the narrative, and this is an accessibility affordance
 * attached to a figure. Same visual treatment, different contract — and a
 * `<Details>` here could end up nested inside one, which §2.6 forbids.
 */
function TextEquivalent({
  open,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) {
  return (
    <details className={`${s.details} ${s.equivalent}`} open={open}>
      <summary className={`${s.summary} ${s.focusable}`}>
        <svg
          className={s.chevron}
          viewBox="0 0 12 12"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M4 2.5 L8 6 L4 9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{TEXT_EQUIVALENT_SUMMARY}</span>
      </summary>
      <div className={s.detailsContent}>
        <div className={s.body}>{children}</div>
      </div>
    </details>
  );
}

/**
 * `<SystemDiagram>` — BLUEPRINT.md §2.6.
 *
 * A before/after pair. Stacked vertically below 1024px, never side by side on
 * mobile, each half carrying its own `<figcaption>` via its own `<Figure>`.
 *
 * `delta` is REQUIRED and is the argument: what moved, what was retired, what
 * got harder. The diagrams only illustrate it, which is why a reader who
 * cannot see the SVG loses nothing.
 */
export function SystemDiagram({
  before,
  after,
  delta,
}: {
  /** A `<Figure>` showing the prior shape. */
  before: ReactNode;
  /** A `<Figure>` showing the shape after the change. */
  after: ReactNode;
  /** Required. What moved, what was retired, what got harder. */
  delta: ReactNode;
}) {
  return (
    <div data-breakout className={s.breakout}>
      <div className={s.diagramPair}>
        {before}
        {after}
      </div>
      <div className={s.delta}>
        <p className={s.kicker}>What changed</p>
        <div className={`${s.body} ${s.deltaBody}`}>{delta}</div>
      </div>
    </div>
  );
}
