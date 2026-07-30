import Link from "next/link";
import { CaseStudyRow } from "@/components/ui/CaseStudyRow";
import { FrontMatter } from "@/components/ui/FrontMatter";
import { getCaseStudies } from "@/lib/content/case-studies";

/**
 * Home (§3.1). No hero image. The typographic jump from the headline to the
 * serif standfirst carries the first screen, then the front-matter block.
 *
 * The section ids below (#about #work #system #experience #toolkit #contact)
 * are the anchors in circulation from the previous version of this site.
 * Fragments never reach the server, so no redirect can rescue them; keeping
 * them as real ids is the only fix, and it costs one attribute per section.
 */
export default function Home() {
  const studies = getCaseStudies();

  return (
    <div className="page">
      <div className="home">
        <header className="doc-header" id="top">
          <h1 className="home-claim">
            I get enterprise AI past the security review, and build the systems
            that ship it.
          </h1>
          <p className="doc-lede">
            Most enterprise AI programs fail on readiness. I spend my time on
            the unglamorous half: what the data actually supports, who owns the
            decision, what the security review will block, and how much
            autonomy a team can afford to supervise.
          </p>
          <FrontMatter
            entries={[
              {
                label: "Focus",
                value:
                  "Enterprise AI · AI governance · integrations · data platforms",
              },
              {
                label: "Current",
                value: "Technical Product Manager, Boldyn Networks",
              },
              { label: "Building", value: "TreeTales (live in production)" },
              { label: "Open to", value: "AI product roles" },
              { label: "Based", value: "New York, NY" },
            ]}
          />
          <p className="home-actions">
            <Link className="home-cta" href="/case-studies">
              Read the case studies
            </Link>
            <Link className="home-cta-secondary" href="/resume">
              Résumé
            </Link>
          </p>
        </header>

        <section className="home-section" id="work">
          <h2 className="home-section-title">Selected work</h2>
          <ul className="cs-list">
            {studies.map((doc) => (
              <CaseStudyRow
                key={doc.slug}
                slug={doc.slug}
                frontmatter={doc.frontmatter}
              />
            ))}
          </ul>
        </section>

        <section className="home-section" id="system">
          <h2 className="home-section-title">How I work</h2>
          <ul className="home-principles">
            <li>
              <strong>Kill use cases before engineering commits to them.</strong>{" "}
              A prioritized pipeline is only worth having if things actually
              come off it.
            </li>
            <li>
              <strong>Name the constraint.</strong>{" "}
              Every system I&rsquo;ve shipped was shaped by something I
              couldn&rsquo;t do, and naming it early sets the sequence for
              everything after.
            </li>
            <li>
              <strong>Treat autonomy as a budget.</strong> Agents can produce
              work faster than one person can read it, so the review gate gets
              designed first.
            </li>
            <li>
              <strong>Say what a thing costs.</strong> An architecture decision
              without a stated cost is an advertisement.
            </li>
          </ul>
          <p className="home-more">
            <Link href="/about">More on how I work and what I disclose</Link>
          </p>
        </section>

        <section className="home-section" id="experience">
          <h2 className="home-section-title">Currently</h2>
          <p className="home-prose">
            At Boldyn Networks I work as the right hand to a Chief Digital &amp;
            Information Officer across data, AI, and enterprise technology. I
            built the enterprise AI operating model there — how a use case gets
            in, how it gets ranked, and what it has to clear in cyber, legal,
            and privacy review before engineering commits anything — along with
            the governance layer that lets the business run AI against
            contractual data residency obligations in two countries. Earlier I
            owned the integration work for a consolidation onto a single
            financial system of record, then defined the integration strategy
            the rest of the estate runs on.
          </p>
          <p className="home-prose">
            On my own time I build TreeTales, a collaborative Memory Book that
            is live in production. I run it solo with a multi-agent delivery
            system, which is where most of my opinions about agents come from.
          </p>
          <p className="home-more" id="toolkit">
            <Link href="/resume">
              Full experience and capabilities on the r&eacute;sum&eacute;
            </Link>
          </p>
        </section>

        <section className="home-section" id="contact">
          <h2 className="home-section-title">Contact</h2>
          <p className="home-prose">
            The best way to reach me is{" "}
            <a href="https://www.linkedin.com/in/oscargarcia-nyc/">LinkedIn</a>.
            I&rsquo;m glad to talk about enterprise AI, data and integration
            platforms, and 0→1 building, including the parts of the work above
            that I couldn&rsquo;t publish.
          </p>
        </section>
      </div>
    </div>
  );
}
