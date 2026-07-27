import { cx, FOCUS_RING, HOVER_TRANSITION } from "./styles";

/**
 * Global footer — BLUEPRINT §1.4. Three lines, no columns, no social icon row.
 * Linking the repo is the point: it makes "statically generated" checkable
 * rather than a claim.
 *
 * Server Component. `BUILD_DATE` is evaluated once when this module is first
 * loaded during `next build`, and under `output: "export"` that value is baked
 * into the emitted HTML — so it is genuinely the deploy date, not a render-time
 * clock read in the browser.
 */

const REPO_PATH = "github.com/OscarGarciaNYC/OscarGarciaNYC.github.io";
// The full URL is 370px wide with no break opportunity, which overflowed a
// 360px viewport (WCAG 1.4.10). Allow it to break anywhere.
const REPO_URL = `https://${REPO_PATH}`;

/** ISO `YYYY-MM-DD` in UTC, so the date does not shift with the build host. */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

export function Footer() {
  return (
    <footer className="w-full border-t border-hairline bg-canvas font-sans">
      <div className="mx-auto w-full max-w-[1120px] px-4 py-12 min-[720px]:px-6">
        <p className="text-[14px] leading-[1.7] text-secondary">
          Statically generated. Case studies written by me.
        </p>
        <p className="text-[14px] leading-[1.7] text-secondary">
          Source:{" "}
          <a
            href={REPO_URL}
            className={cx(
              "rounded-[4px] underline decoration-interactive underline-offset-[3px]",
              "text-secondary",
              "hover:text-primary hover:decoration-accent hover:underline-offset-[4px]",
              FOCUS_RING,
              HOVER_TRANSITION,
            )}
          >
            {REPO_PATH}
          </a>
        </p>
        <p className="text-[14px] leading-[1.7] text-muted">
          Oscar Garcia · New York · Last deployed{" "}
          <time dateTime={BUILD_DATE}>{BUILD_DATE}</time>
        </p>
      </div>
    </footer>
  );
}
