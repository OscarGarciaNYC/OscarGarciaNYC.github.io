/**
 * The résumé is structured data, not MDX (BLUEPRINT §3.7).
 *
 * Three reasons: the content is structured rather than prose, so bullets get
 * reordered and filtered; the same objects feed the experience timeline
 * wherever else it appears, so a figure lives in exactly one place; and it
 * feeds JSON-LD `Person` with no parsing step.
 *
 * This is also the one surface where résumé language is correct. Everywhere
 * else on the site, an achievement bullet is banned.
 */

export type ResumeBullet = {
  text: string;
  /** Slug of a case study that tells this story properly. */
  caseStudy?: string;
};

export type ResumeRole = {
  title: string;
  start: string;
  end: string;
  bullets: ResumeBullet[];
};

export type ResumePosition = {
  org: string;
  orgNote?: string;
  location?: string;
  start: string;
  end: string;
  /** One entry for a single role; several for a progression at one employer. */
  roles: ResumeRole[];
};

/** How well Oscar knows a thing. A claim he can be interrogated on. */
export type Depth = "build" | "operate" | "evaluate" | "familiar";

export type Capability = {
  name: string;
  depth: Depth;
  /** Where the depth was earned. Empty for `familiar`. */
  where?: string;
};

export const DEPTH_LABEL: Record<Depth, string> = {
  build: "Build",
  operate: "Operate",
  evaluate: "Evaluate",
  familiar: "Familiar",
};

export const DEPTH_MEANING: Record<Depth, string> = {
  build: "I have built and shipped this myself.",
  operate: "I have owned this in production, working with the people who built it.",
  evaluate: "I can assess it, scope it, and tell a good implementation from a bad one.",
  familiar: "I have worked alongside it and can hold a conversation.",
};

const positions: ResumePosition[] = [
    {
      org: "Boldyn Networks",
      location: "New York, NY",
      start: "Oct 2023",
      end: "Present",
      roles: [
        {
          title: "Technical Product Manager — AI, Data & Integrations",
          start: "Oct 2023",
          end: "Present",
          bullets: [
            {
              text: "Right hand to the CDIO across data, AI, and enterprise technology, converting enterprise strategy into delivered programs.",
            },
            {
              text: "Created the agentic AI roadmap from scratch, turning stakeholder discovery into an ROI-ranked pipeline and killing low-readiness use cases before they consumed engineering.",
            },
            {
              text: "De-risked AI investment by personally prototyping working proofs-of-concept as product and solution architect.",
            },
            {
              text: "Led integrations for an ERP consolidation into Workday: 26 new integrations in 8 months, and the clean system of record downstream analytics now depends on.",
            },
            {
              text: "Defined canonical models and system-of-record decisions across CRM, lease, tax, payments, and project systems, eliminating semantic and validation conflicts.",
            },
          ],
        },
      ],
    },
    {
      org: "PandoLogic",
      orgNote: "a Veritone company",
      location: "New York, NY",
      start: "Jan 2019",
      end: "Sept 2023",
      roles: [
        {
          title: "Product Manager — Platform, TheJobNetwork",
          start: "Jan 2022",
          end: "Sept 2023",
          bullets: [
            {
              text: "Owned the platform roadmap for an AI-enabled recruitment product across competing customer, integration, and data constraints.",
            },
            {
              text: "Delivered JWT-based single sign-on for 5M+ users, removing login friction and unlocking enterprise partnerships gated on SSO.",
            },
            {
              text: "Secured major enterprise renewals by closing the security gaps blocking them, and cut release rollbacks and hotfixes 35% through stronger QA and rollout discipline.",
            },
          ],
        },
        {
          title: "GTM Operations & Product Lead",
          start: "Jan 2021",
          end: "Jan 2022",
          bullets: [
            {
              text: "Cut lead-to-cash cycle time ~21% as end-to-end systems and process architect across Salesforce, NetSuite, and MarTech.",
            },
            {
              text: "Reached 89% tool adoption among 200+ users within 90 days through cross-functional enablement.",
            },
          ],
        },
        {
          title: "Manager, Project Management & Technical Operations",
          start: "Jan 2019",
          end: "Jan 2021",
          bullets: [
            {
              text: "Automated Formstack → Salesforce workflows underpinning $150M+ in revenue operations.",
            },
            {
              text: "Accelerated enterprise go-lives by owning integration delivery and resolving cross-system data issues.",
            },
          ],
        },
      ],
    },
    {
      org: "TreeTales",
      location: "New York, NY",
      start: "2026",
      end: "Present",
      roles: [
        {
          title: "Founder — Product & Engineering",
          start: "2026",
          end: "Present",
          bullets: [
            {
              text: "Took a collaborative Memory Book product 0→1 as sole product manager and builder; live in production.",
              caseStudy: "review-gate-before-the-agent",
            },
            {
              text: "Designed and operate a multi-agent software delivery system under 13 architecture decision records, separation of duties, and a human as the only merge gate.",
              caseStudy: "review-gate-before-the-agent",
            },
          ],
        },
      ],
    },
    {
      org: "NYPACE",
      start: "Jun 2023",
      end: "Present",
      roles: [
        {
          title: "Business Advisor",
          start: "Jun 2023",
          end: "Present",
          bullets: [
            {
              text: "Advise early-stage founders on positioning, go-to-market, and product-scaling decisions through the New York Professional Advisors for Community Entrepreneurs.",
            },
          ],
        },
      ],
    },
    {
      org: "Earlier roles",
      start: "Aug 2016",
      end: "Jan 2019",
      roles: [
        {
          title: "Technical Lead & Team Manager",
          start: "Aug 2016",
          end: "Jan 2019",
          bullets: [
            {
              text: "Shaped product improvements by surfacing recurring failure patterns across 300+ B2B client integrations and onboardings.",
            },
          ],
        },
      ],
    },
];

const capabilities: Capability[] = [
    { name: "Multi-agent orchestration", depth: "build", where: "TreeTales" },
    { name: "Agentic development workflows", depth: "build", where: "TreeTales" },
    { name: "LLM application development", depth: "build", where: "TreeTales" },
    { name: "Postgres / row-level security", depth: "build", where: "TreeTales" },
    { name: "TypeScript, React, Next.js", depth: "build", where: "TreeTales" },
    { name: "AI guardrails & responsible-AI design", depth: "build", where: "TreeTales" },
    { name: "Enterprise integrations (Boomi, REST/SOAP, webhooks)", depth: "operate", where: "Boldyn, PandoLogic" },
    { name: "Canonical data modeling & lineage", depth: "operate", where: "Boldyn" },
    { name: "Identity: OAuth, SAML, JWT", depth: "operate", where: "PandoLogic" },
    { name: "Product discovery & roadmapping", depth: "operate", where: "Boldyn, PandoLogic" },
    { name: "Salesforce / NetSuite operations", depth: "operate", where: "PandoLogic" },
    { name: "Microsoft Fabric, Power BI", depth: "evaluate", where: "Boldyn" },
    { name: "Snowflake, BigQuery", depth: "evaluate" },
    { name: "Privacy & compliance: GDPR, CCPA, ISO 27001", depth: "evaluate", where: "Boldyn, PandoLogic" },
    { name: "Python", depth: "familiar" },
];

export const resume = {
  name: "Oscar Garcia",
  title: "Senior Technical Product Manager",
  location: "New York, NY",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/oscargarcia-nyc/" },
    {
      label: "oscargarcianyc.github.io",
      href: "https://oscargarcianyc.github.io",
    },
  ],

  summary:
    "Technical product manager working where enterprise data, AI, and systems of record meet. Ten years across 0→1 product creation and B2B SaaS at scale, most recently building an agentic AI roadmap from scratch and prototyping the proofs-of-concept personally. I ship production software with multi-agent workflows, which is why I am non-hype about what they can and cannot do.",

  positions,

  /**
   * Replaces the 60-chip skill wall on the previous site. A chip wall is an
   * assertion nobody can interrogate; a depth rating is a claim that survives
   * or fails in a forty-minute interview.
   */
  capabilities,

  education: [
    {
      credential: "MBA, Entrepreneurship & Leadership",
      institution: "Oneday.org, London, UK",
      year: "2025",
    },
    {
      credential: "BA, Psychology",
      institution: "Hunter College, New York, NY",
      year: "2015",
    },
  ],
};
