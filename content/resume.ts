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
 *
 * SOURCE OF TRUTH: ~/Documents/Resumes/Oscar_Garcia_Resume_Product -
 * Anthropic.docx, synced 2026-07-27. Wording follows the document so a
 * recruiter reading the PDF and the page sees the same claims. When the docx
 * changes, this file changes with it — nothing here is authored independently.
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

/**
 * Which of the three sections a position belongs to. The source document
 * separates employment from the TreeTales build and from unpaid advisory work,
 * and that separation is a claim in itself: TreeTales is a project, so listing
 * it as a job would overstate it.
 */
export type PositionKind = "employment" | "project" | "advisory";

export type ResumePosition = {
  org: string;
  kind: PositionKind;
  orgNote?: string;
  location?: string;
  start: string;
  end: string;
  /** One entry for a single role; several for a progression at one employer. */
  roles: ResumeRole[];
};

export const KIND_HEADING: Record<PositionKind, string> = {
  employment: "Experience",
  project: "Selected project — agentic AI build",
  advisory: "Advisory & community leadership",
};

export const KIND_ORDER: PositionKind[] = ["employment", "project", "advisory"];

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
    kind: "employment",
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
            text: "Trusted advisor to the Chief Digital & Information Officer, translating enterprise strategy into product roadmaps spanning AI, enterprise platforms, integrations, reporting, and business transformation.",
          },
          {
            text: "Established the enterprise AI operating model — intake, prioritization, and the cross-functional path through cyber, legal, and privacy review — now governing a backlog of ~50 use cases sourced from sales, legal, and marketing.",
          },
          {
            text: "Secured Microsoft and partner funding to launch enterprise AI delivery with no internal budget, prioritizing four use cases and enabling three delivered agents, including a bid agent and a market intelligence agent.",
          },
          {
            text: "Built the governance layer that lets the business deploy AI against contractual data residency and sovereignty obligations across U.S. and U.K. deployments, defining requirements for PII tokenization and proxy architectures.",
          },
          {
            text: "Serving as technical advisor on AI feasibility and post-delivery ownership, reducing shadow IT by giving business teams a governed path to build.",
          },
          {
            text: "Prototyping a local LLM capability for internal experimentation under budget constraints, partnering with an internal data science team already running local models in production for network operations and agent governance.",
          },
          {
            text: "Delivered 28 ERP integrations in 8 months, then defined the enterprise integration strategy spanning Microsoft Fabric, Workday, OneVizion, NetSuite, Salesforce, Boomi, and finance specialist applications.",
          },
          {
            text: "Established the governed data foundation for enterprise reporting, cutting reporting latency from ~72 hours to under one hour.",
          },
        ],
      },
    ],
  },
  {
    org: "PandoLogic",
    kind: "employment",
    orgNote: "a Veritone company, acquired 2021",
    location: "New York, NY",
    // Dates and titles here follow LinkedIn rather than the source docx. The
    // docx dates the product-management title to Jan 2020, which runs it back
    // over the GTM operations and technical operations roles; LinkedIn is the
    // record a recruiter reads alongside this page, and it is the one HR can
    // verify. Seven years at one employer across three roles is also the
    // stronger claim — the compressed version hides two internal promotions.
    start: "Aug 2016",
    end: "Sept 2023",
    roles: [
      {
        title: "Platform Product Manager — TheJobNetwork",
        start: "Sept 2021",
        end: "Sept 2023",
        bullets: [
          {
            text: "Owned product strategy and roadmap for a white-label enterprise hiring platform supporting a ~$14M ARR business, serving ~400K monthly job seekers through 250 publisher partners and enterprise employers.",
          },
          {
            text: "Expanded the platform from approximately 140 to 160 active white-label implementations by partnering with customers, publishers, and internal stakeholders to prioritize high-impact platform capabilities and accelerate partner onboarding.",
          },
          {
            text: "Led continuous discovery with enterprise customers and publisher partners, translating customer needs, commercial priorities, and technical constraints into roadmap investments spanning APIs, authentication, analytics, workflow automation, and partner integrations.",
          },
          {
            text: "Delivered JWT-based single sign-on, enabling secure enterprise authentication across partner job boards serving more than 5 million users while strengthening identity capabilities and improving user experience.",
          },
          {
            text: "Directed migration of 91 enterprise customers to the Jobiqo platform, maintaining business continuity while modernizing the platform architecture and partner experience.",
          },
          {
            text: "Partnered across engineering, sales, customer success, and operations to prioritize platform investments, contributing to a 14% increase in monthly job applications and supporting growth through customer renewals, strategic partnerships, and higher-margin direct employer traffic.",
          },
          {
            text: "Maintained roadmap execution and cross-functional alignment throughout Veritone's acquisition of PandoLogic, keeping delivery uninterrupted across customers, partners, and engineering teams.",
          },
        ],
      },
      {
        title: "GTM Operations & Product Lead",
        start: "Jan 2021",
        end: "Sept 2021",
        bullets: [
          {
            text: "Owned the systems and workflows connecting sales, marketing, and product across the lead-to-cash lifecycle, redesigning Salesforce and internal handoffs and rolling the new processes out to more than 200 users.",
          },
          {
            text: "Advised leadership on build-versus-buy platform decisions and introduced structured release coordination between the go-to-market and engineering teams.",
          },
        ],
      },
      {
        title: "Manager, Technical Operations",
        start: "Aug 2016",
        end: "Jan 2021",
        bullets: [
          {
            text: "Led onboarding and technical operations for a large B2B customer base, standardizing the onboarding process to improve time-to-value and coordinating integrations across internal teams and partners.",
          },
        ],
      },
    ],
  },
  {
    org: "TreeTales",
    kind: "project",
    location: "New York, NY",
    start: "2025",
    end: "Present",
    roles: [
      {
        title: "Founder — Product & Agentic Engineering",
        start: "2025",
        end: "Present",
        bullets: [
          {
            text: "Built a production AI-assisted storytelling platform from 0→1 using Claude Code, Next.js, React, TypeScript, and Supabase, accelerating delivery through agentic development workflows while holding architectural quality and human oversight.",
            caseStudy: "review-gate-before-the-agent",
          },
          {
            // No case-study link here: the bullet above already points at the
            // same document, and two identical links in one entry read as a
            // template rather than a reference.
            text: "Established reusable AI engineering standards including architecture decision records, prompt libraries, and specialized coding agents, reducing implementation effort for new features while improving consistency and maintainability.",
          },
        ],
      },
    ],
  },
  {
    org: "New York Professional Advisors for Community Entrepreneurs",
    kind: "advisory",
    orgNote: "NYPACE",
    start: "Jun 2023",
    end: "Present",
    roles: [
      {
        title: "Business Advisor",
        start: "Jun 2023",
        end: "Present",
        bullets: [
          {
            text: "Advise early-stage founders on product strategy, AI adoption, go-to-market planning, and scaling technology products from concept to commercialization.",
          },
        ],
      },
    ],
  },
  {
    org: "Cornerstone Church NYC",
    kind: "advisory",
    start: "2013",
    end: "Present",
    roles: [
      {
        title: "Production Lead",
        start: "2013",
        end: "Present",
        bullets: [
          {
            text: "Lead and mentor a cross-functional volunteer production team supporting live broadcast operations, standardizing technical processes, improving operational resilience, and coordinating execution across audio, video, lighting, and streaming.",
          },
        ],
      },
    ],
  },
];

const capabilities: Capability[] = [
  { name: "Enterprise AI operating model & governance", depth: "build", where: "Boldyn" },
  { name: "Data residency & sovereignty governance", depth: "build", where: "Boldyn" },
  { name: "Multi-agent orchestration", depth: "build", where: "TreeTales" },
  { name: "Agentic development workflows", depth: "build", where: "TreeTales" },
  { name: "LLM application development", depth: "build", where: "TreeTales" },
  { name: "Prompt design & prompt libraries", depth: "build", where: "TreeTales" },
  { name: "AI guardrails & human-in-the-loop design", depth: "build", where: "TreeTales" },
  { name: "Product discovery & roadmapping", depth: "build", where: "Boldyn, PandoLogic" },
  { name: "TypeScript, React, Next.js", depth: "build", where: "TreeTales" },
  { name: "Supabase / Postgres row-level security", depth: "build", where: "TreeTales" },
  { name: "Enterprise integration strategy & delivery", depth: "operate", where: "Boldyn" },
  { name: "Canonical data modeling & lineage", depth: "operate", where: "Boldyn" },
  { name: "Governed reporting foundation (Microsoft Fabric, Power BI)", depth: "operate", where: "Boldyn" },
  { name: "Identity: OAuth, SAML, JWT, Entra ID", depth: "operate", where: "PandoLogic, Boldyn" },
  { name: "Platform product management at scale", depth: "operate", where: "PandoLogic" },
  { name: "iPaaS & workflow tooling (Boomi, n8n, Power Automate)", depth: "operate", where: "Boldyn, PandoLogic" },
  { name: "Salesforce / NetSuite as integration endpoints", depth: "operate", where: "Boldyn, PandoLogic" },
  { name: "AI evaluations", depth: "operate", where: "Boldyn, TreeTales" },
  { name: "Model Context Protocol (MCP)", depth: "operate", where: "TreeTales" },
  { name: "PII tokenization & proxy architectures", depth: "evaluate", where: "Boldyn" },
  { name: "Local LLM deployment", depth: "evaluate", where: "Boldyn" },
  { name: "Retrieval-augmented generation", depth: "evaluate" },
  { name: "Snowflake, BigQuery, Looker", depth: "evaluate" },
  { name: "Privacy & compliance: GDPR, CCPA, ISO 27001", depth: "evaluate", where: "Boldyn, PandoLogic" },
  { name: "GraphQL", depth: "familiar" },
  { name: "Python", depth: "familiar" },
];

export const resume = {
  name: "Oscar Garcia",
  title: "Technical Product Manager — enterprise AI platforms and data products",
  location: "New York, NY",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/oscargarcia-nyc/" },
    { label: "GitHub", href: "https://github.com/OscarGarciaNYC" },
    { label: "oscarmgarcia.nyc@gmail.com", href: "mailto:oscarmgarcia.nyc@gmail.com" },
    {
      label: "oscargarcianyc.github.io",
      href: "https://oscargarcianyc.github.io",
    },
  ],

  summary:
    "Technical Product Manager specializing in enterprise AI platforms, enterprise software, and data products. Partner to executive leadership on AI strategy, platform modernization, and enterprise architecture, translating complex security, governance, privacy, and infrastructure challenges into scalable product capabilities that enable trusted AI adoption.",

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
      year: "May 2025",
    },
    {
      credential: "BA, Psychology",
      institution: "Hunter College, New York, NY",
      year: "May 2015",
    },
  ],
};
