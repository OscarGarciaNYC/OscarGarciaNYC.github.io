import type { ReactNode } from "react";

/**
 * The entire depth mechanism under D5. Technical elaboration goes in here;
 * a step in the reasoning never does. The page must read completely with
 * every one of these closed.
 */
export function Details({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className="my-6 border-l-2 border-neutral-700 pl-4">
      <summary className="cursor-pointer text-[15px] font-medium">
        {summary}
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
