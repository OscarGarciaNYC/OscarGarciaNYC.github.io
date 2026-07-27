/**
 * The front-matter block — the site's signature device.
 *
 * BLUEPRINT §1.1 says every route opens with a doc header rather than a hero,
 * and §3.1 specifies this block for Home. Promoting it to every document is
 * what makes the site read as a set of internal documents instead of a set of
 * pages: a reader meets the same labelled key-value strip at the top of
 * everything, the way they would in a spec or an ADR.
 *
 * Kicker labels in Inter, values in mono, hairline-separated rows. Rendered as
 * a real <dl> so the label/value relationship survives without sight.
 */
export type FrontMatterEntry = {
  label: string;
  value: React.ReactNode;
};

export function FrontMatter({ entries }: { entries: FrontMatterEntry[] }) {
  return (
    <dl className="front-matter">
      {entries.map((entry) => (
        <div key={entry.label} className="front-matter-row">
          <dt className="front-matter-label">{entry.label}</dt>
          <dd className="front-matter-value">{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}
