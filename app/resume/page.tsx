import type { Metadata } from "next";
import Link from "next/link";
import { DEPTH_LABEL, DEPTH_MEANING, resume } from "@/content/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${resume.title} — ${resume.summary.slice(0, 140)}…`,
};

const DEPTH_ORDER = ["build", "operate", "evaluate", "familiar"] as const;

export default function ResumePage() {
  const byDepth = DEPTH_ORDER.map((depth) => ({
    depth,
    items: resume.capabilities.filter((c) => c.depth === depth),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="page">
      <article className="resume">
        <header className="doc-header">
          <h1>{resume.name}</h1>
          <p className="doc-lede">{resume.title}</p>
          <p className="doc-meta resume-contact">
            {resume.location}
            {resume.links.map((link) => (
              <span key={link.href}>
                {" · "}
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </p>
          {/* Print produces the PDF, so there is one artifact rather than two
              that can drift apart. */}
          <p className="resume-print-hint no-print">
            Use your browser&rsquo;s print dialog to save a PDF — the print
            stylesheet lays this out for paper.
          </p>
        </header>

        <section className="resume-section">
          <h2>Summary</h2>
          <p className="resume-summary">{resume.summary}</p>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          {resume.positions.map((position) => (
            <div key={position.org} className="resume-entry">
              <div className="resume-spine">
                <span className="resume-dates">
                  {position.start} — {position.end}
                </span>
                {position.location && (
                  <span className="resume-location">{position.location}</span>
                )}
              </div>
              <div className="resume-body">
                <h3 className="resume-org">
                  {position.org}
                  {position.orgNote && (
                    <span className="resume-org-note">
                      {" "}
                      ({position.orgNote})
                    </span>
                  )}
                </h3>
                {position.roles.map((role) => (
                  <div key={role.title} className="resume-role">
                    <p className="resume-role-title">
                      {role.title}
                      <span className="resume-role-dates">
                        {" "}
                        · {role.start} – {role.end}
                      </span>
                    </p>
                    <ul className="resume-bullets">
                      {role.bullets.map((bullet) => (
                        <li key={bullet.text}>
                          {bullet.text}
                          {bullet.caseStudy && (
                            <>
                              {" "}
                              <Link
                                className="resume-case-link no-print"
                                href={`/case-studies/${bullet.caseStudy}`}
                              >
                                Read the case study
                              </Link>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Capabilities</h2>
          <p className="resume-note">
            Grouped by how well I know each one, because a list of names is a
            claim nobody can interrogate. These are the ones I expect to be
            asked about.
          </p>
          <dl className="depth-legend">
            {DEPTH_ORDER.map((depth) => (
              <div key={depth} className="depth-legend-row">
                <dt>{DEPTH_LABEL[depth]}</dt>
                <dd>{DEPTH_MEANING[depth]}</dd>
              </div>
            ))}
          </dl>
          <table className="depth-table">
            <caption className="visually-hidden">
              Capabilities grouped by depth, with where each was earned
            </caption>
            <thead>
              <tr>
                <th scope="col">Capability</th>
                <th scope="col">Depth</th>
                <th scope="col">Where</th>
              </tr>
            </thead>
            <tbody>
              {byDepth.map((group) =>
                group.items.map((item) => (
                  <tr key={item.name}>
                    <th scope="row">{item.name}</th>
                    <td>{DEPTH_LABEL[group.depth]}</td>
                    <td>{item.where ?? "—"}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          {resume.education.map((entry) => (
            <div key={entry.credential} className="resume-entry">
              <div className="resume-spine">
                <span className="resume-dates">{entry.year}</span>
              </div>
              <div className="resume-body">
                <p className="resume-role-title">{entry.credential}</p>
                <p className="resume-note">{entry.institution}</p>
              </div>
            </div>
          ))}
        </section>
      </article>
    </div>
  );
}
