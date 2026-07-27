# Portfolio Blueprint — oscargarcianyc.github.io

**Status:** Draft for Oscar's approval. No code written. No files in the repo modified.
**Date:** 2026-07-27
**Produced by:** architect pass + product-designer pass, reconciled.

---

## Part 0 — Decisions

### Locked (Oscar, 2026-07-27)

| # | Decision | Consequence |
|---|---|---|
| **D1** | **Seven routes, count-gated nav.** All seven build from day one; Architecture, Frameworks, and Product Thinking appear in the nav only at ≥3 published documents each. | The full IA exists immediately; the nav can't ship half-written. No later redesign. |
| **D2** | **Serif body — Source Serif 4 Variable.** Inter restricted to headings, nav, tables, and diagram labels. | The "document, not portfolio" read lands in the first 200ms. Deviates deliberately from the sans-bodied Stripe/Vercel/Linear references. |
| **D3** | **Framer Motion stays, tightly scoped** to a single `components/motion/` module, with a hard budget of **≤15KB gzipped client JS per reading route.** | Motion can't leak across thirty components. The near-zero JS on a reading page is itself part of the evidence. |

### The editorial mandate (Oscar, 2026-07-27) — governs every page

This is the bar the writing has to clear, and it outranks the layout when the two conflict.

1. **Every page reads like something published by a senior product leader at Anthropic** — not like a portfolio entry.
2. **No resume language.** Achievement bullets are banned in prose. "Delivered 26 integrations in 8 months" is a resume line. "Finance close ran on the third business day, which meant no cutover window could exceed four hours — that one fact determined the sequencing of every integration" is product thinking. The second one is the only acceptable register.
3. **Every article teaches something.** A reader who has never met you should finish with a transferable idea they can use on their own problem. Demonstrating expertise is the *byproduct* of teaching well, never the goal of the piece.
4. **Prefer generalized enterprise examples.** Write the pattern, not the engagement. "A multi-entity portfolio consolidating multiple ERPs into a single financial system of record" teaches more, and risks less, than a named account with abstracted numbers.
5. **Avoid confidential information** — full stop, not "abstract it."
6. **Never exaggerate experience.** See the guardrail below; this is the one that has to be structurally enforced.

**The guardrail that makes 4 and 6 compatible.** Generalizing is a licence to remove identifying detail. It is *not* a licence to inflate scope, claim ownership you didn't have, or describe a pattern you observed as one you built. The rule, in one line:

> **Generalize the subject. Never generalize the verb.**

If you advised, the piece says advised. If you owned one integration surface out of eight, the piece says which. A generalized example that quietly upgrades your role is worse than a named one that's accurate, because it can't be checked and it will not survive a forty-minute interview.

**Schema enforcement.** Two new required frontmatter fields, both build-blocking:

- `teaches: string` (≤160 chars) — the transferable idea. If you can't write it, the piece isn't ready.
- `myRole: 'owned' | 'led' | 'contributed' | 'advised'` — rendered in the doc header on every document. Not editorial; structural.

### D4. Disclosure — LOCKED

**One standardized statement near the top of any case study that generalizes real work. No repeated inline disclosure markers anywhere.** Omitted entirely for purely conceptual articles and public frameworks.

Canonical wording, used verbatim every time:

> **Disclosure:** This case study generalizes details and omits confidential information while preserving the underlying product problem, constraints, and decision process.

**Implementation.** One frontmatter boolean, `generalizesRealWork: boolean`. True renders the `<Disclosure>` block directly beneath the doc header; false renders nothing. The string lives in one constant and is never edited per document — a disclosure that varies by page reads as negotiated rather than standing.

**What this replaces and retires:** the per-claim `public / approximate / directional / withheld` enum, the `≈` glyph, the dotted underline, and the required per-metric provenance line. All removed from the schema and the component library.

**One interpretation I'm flagging rather than assuming.** A source line on an *exact* number from your own product — `Source: live product data` on a TreeTales figure — is attribution, not a disclosure hedge. I'm keeping it available as an **optional** field, used only where the number is exact and checkable. If you read that as an inline disclosure marker, say so and it comes out entirely.

### D5. Progressive disclosure — LOCKED, and this is the permanent MDX authoring contract

**No persistent dual-register toggle. No separate simple and engineering versions of any section.** One document, one narrative, depth revealed inside it.

**The depth model — six sections, canonical:**

1. Executive summary
2. Product problem and stakes
3. Constraints and stakeholders
4. Decision process and tradeoffs
5. Technical architecture or implementation considerations
6. Outcome and lessons

Technical depth appears through clearly labeled sections, diagrams, callouts, and optional expandable details.

**The governing rule, and it is testable:**

> **The core narrative must be fully understandable with every expandable detail closed.**

That becomes a literal review step, not an aspiration: read the rendered page with all `<details>` collapsed. If any argument has a hole in it, the content is wrong — move the material up into prose, or cut it. Expandables carry *elaboration* — a schema, a config, a failure trace, the arithmetic — never a load-bearing step in the reasoning.

**Retired by this decision:** the `<Register>` component, the persisted register choice, and the tabs pattern that would have carried it. The Agent System section from the current site is rebuilt under this model instead — its "explain it simply" text becomes the prose, and its "show me the engineering" text becomes expandable detail beneath it.

---

## Part 1 — Site architecture

### 1.1 The organizing idea

> **Build it as an internal documentation site, not a portfolio.** Every page is a document with front matter, a revision date, stated confidence, and provenance on every number — so the reader spends their time evaluating artifacts instead of being pitched.

Concretely, that means:

- Every route opens with a **doc header**, not a hero. Title, role, org, period, `Updated`, confidence, reading time. The front-matter block *is* the visual interest on first screen.
- **Prose-first, single column, one measure.** 68ch of serif. Hairlines and whitespace separate; cards almost never appear.
- **Nothing asserts without provenance.** Enforced by the content schema, not by discipline.
- **Everything is anchorable.** Stable `#id` on every H2/H3 with a copy-link affordance. Documents get quoted and linked; marketing pages get scrolled past.

### 1.2 Route map

| Route | Type | Purpose in one line | Gate |
|---|---|---|---|
| `/` | Landing | Convince a skeptic to open one case study in 15 seconds | — |
| `/case-studies` | Index | Show the shape of the work at a glance | — |
| `/case-studies/[slug]` | Document | The full evidence for one engagement | — |
| `/resume` | Structured | Scannable career record + PDF | — |
| `/about` | Document | Who's behind the artifacts, and the disclosure policy | — |
| `/architecture` | Index | Systems and decision records | ≥3 docs |
| `/architecture/[slug]` | Document | One system, or one decision with its cost | — |
| `/frameworks` | Index | Reusable methods, with their failure modes | ≥3 docs |
| `/frameworks/[slug]` | Document | One method someone else could run | — |
| `/product-thinking` | Index | Positions and essays | ≥3 docs |
| `/product-thinking/[slug]` | Document | One argument, grounded in a named case study | — |
| `/topics/[topic]` | Cross-cut | Everything on one subject, across all four collections | auto |
| `/404` | Utility | Recover gracefully | — |

`/topics/[topic]` is the page that makes the site read as a knowledge base rather than a blog. It's generated entirely from the controlled vocabulary — roughly forty lines of code and zero ongoing maintenance.

### 1.3 The content graph — why nothing is duplicated

Your TreeTales agent-governance story is evidence for at least four routes. Retelling it four times is the signature failure of a bad portfolio.

**Rule: one canonical home per fact. Everything else is a typed reference.**

| Framing of the same story | Lives in |
|---|---|
| What happened, what came of it | `case-studies/treetales` |
| Why this shape, and what it cost | `architecture/agent-separation-of-duties` |
| How someone else could run it | `frameworks/governed-delivery-loop` |
| What I now believe because of it | `product-thinking/…` |

Those are genuinely different documents. **The schemas enforce the split:** architecture requires `tradeoffs`, frameworks require `steps` + `failureModes`, essays require a `thesis`. A document that can't fill its collection's required fields belongs in a different collection — and the build fails if it can't.

References are written in one direction only (`appliedIn`, `groundedIn`, `provenAt`); the reverse links are computed at build time. Hand-maintained back-links always decay. Every slug reference is validated — a dangling one fails `next build`.

The "Related evidence" rail **names the edge** — *Applied in*, *Proven at*, *Argued from* — never a generic "Related" list. Naming the relationship is what makes it read as a system.

### 1.4 Global navigation

**Header** — 56–64px, one hairline beneath, no backdrop blur.

```
Oscar Garcia   Senior Technical PM · New York          Case Studies  Architecture  Frameworks  Writing  Résumé  About  ◐
```

- Name is Inter 600/16px; the role sits beside it at 13px in secondary text. Drop the `.` after the name from the current site.
- Nav links: Inter 15px, 44px touch height via padding. Active route carries a 2px accent underline, not a background pill.
- Theme toggle is the only icon control, and it has an accessible name.
- Not sticky on reading routes below 1200px — a sticky header eats a phone screen. Where it is sticky, every heading gets `scroll-margin-top: calc(var(--header-h) + 16px)` so a deep link never lands a figure underneath it.
- **Mobile (<720px):** a labeled `Menu` button, not a bare hamburger, opening a full-screen panel with all links, the theme toggle, and a close button. The current site simply hides the nav below 680px with no replacement — that's a P0 not to repeat.

**Footer** — three lines, no columns, no social icon row.

```
Statically generated. Case studies written by me.
Source: github.com/OscarGarciaNYC/OscarGarciaNYC.github.io
Oscar Garcia · New York · Last deployed 2026-07-27
```

Linking the repo is the highest-leverage evidence-and-personality move on the whole site. It replaces "Built with a little help from my agents" with something checkable.

**Legacy anchors.** Six anchors are in circulation from the current site (`#about #work #system #experience #toolkit #contact`). Fragments never reach the server, so no redirect can rescue them. Keep them as real section IDs on the new Home page, each linking into its new route. Cost: one attribute per section.

---

## Part 2 — The systems every page inherits

### 2.1 Type scale (root 16px)

| Token | Family | Size | Line-height | Tracking | Measure |
|---|---|---|---|---|---|
| `display` | Inter | `clamp(2.625rem, 1.9rem + 3.1vw, 4rem)` | 1.04 | −0.028em | 18ch |
| `h1` | Inter | `clamp(1.875rem, 1.5rem + 1.7vw, 2.75rem)` | 1.10 | −0.022em | 22ch |
| `h2` | Inter | `clamp(1.5rem, 1.35rem + 0.6vw, 2rem)` | 1.20 | −0.018em | 30ch |
| `h3` | Inter | 21px | 1.30 | −0.012em | 40ch |
| `kicker` | Inter 550 | 12px | 1.20 | +0.10em, uppercase | — |
| `lede` | Serif | 22px | 1.50 | −0.005em | 60ch |
| `body` | Serif | **19px** | **1.65** | 0 | **68ch** |
| `caption` | Inter | 14px | 1.50 | +0.005em | 76ch |
| `meta` | Mono | 13px | 1.45 | +0.01em | — |
| `metric` | Inter 600, `tnum` | 32px | 1.05 | −0.02em | — |

Rules: `text-wrap: balance` on h1–h3, `pretty` on `p`. **`hyphens: none`** everywhere — hyphenation inside identifiers like `row-level-security` creates false breaks. No justified text. Paragraph spacing `1.1em`. H2 gets 96px above (64px mobile), H3 gets 40px. Spacing scale `4·8·12·16·24·32·48·64·96·128`, nothing off it. `font-variant-ligatures: none` in code — programming ligatures misrepresent the characters actually in the file.

Fonts self-hosted, Latin-subset, variable `.woff2` only, ~140KB total, `font-display: swap` with metric-matched `size-adjust` fallbacks so the swap is nearly invisible.

### 2.2 Color, dark-mode first

Near-monochrome, one accent, two strictly semantic signal colors. Color carries meaning here or it doesn't appear.

**Dark (default)** — canvas `#0D0E10`, raised `#141517`, sunken `#08090A`.

| Token | Value | Contrast on canvas |
|---|---|---|
| `text-primary` | `#EDEEF0` | 16.63 |
| `text-secondary` | `#A9AEB6` | 8.66 |
| `text-muted` | `#7E848D` | 5.12 (4.85 on raised) |
| `accent` | `#6FC3AE` | 9.28 |
| `signal-caveat` (abstracted / confidential) | `#E3B341` | 9.92 |
| `signal-regret` (what I'd change) | `#F0857D` | 7.68 |
| `border-interactive` | `#5C6169` | 3.10 |
| `stroke-diagram` | `#7C828B` | 4.99 |

**Light** — canvas `#FAF9F7` (warm paper, not white), raised `#FFFFFF`, sunken `#F1F0ED`.

| Token | Value | Contrast on canvas |
|---|---|---|
| `text-primary` | `#14161A` | 17.21 |
| `text-secondary` | `#4B5058` | 7.71 |
| `text-muted` | `#63686F` | 5.34 (4.93 on sunken) |
| `accent` | `#0F6E5C` | 5.86 |
| `signal-caveat` | `#7A5200` | 6.58 |
| `signal-regret` | `#A3322B` | 6.55 |
| `stroke-diagram` | `#767B82` | 4.05 |

Every text token clears 4.5:1 in both themes; every diagram stroke and control boundary clears 3:1. Tightest values are muted text at 4.85 and 4.93 — those surfaces can't move without re-checking. *(Ratios computed in the designer pass; re-verify with axe at build.)*

Syntax highlighting is deliberately **three tones only** — comments muted, strings/values accent, keywords primary at 600. Rainbow highlighting makes a document look like a screenshot of an IDE theme.

Theme must resolve **before first paint**. A white flash on a dark-first site undoes the entire tone; this is a design requirement, not an optimization.

### 2.3 Radius and separation

`4px` controls · `8px` containers · `6px` diagram nodes · `0` tables. Hairlines separate. Box-shadow is reserved for exactly one genuinely floating layer: the mobile menu.

### 2.4 Motion doctrine

**The complete allowed list:**

| Where | Spec |
|---|---|
| Hover/focus on links, rows, nav | 120ms `cubic-bezier(0.2,0,0,1)` — color, border-color, underline-offset only |
| `<details>` disclosure | 180ms height + opacity |
| TOC active indicator | 150ms transform on a 2px rule |
| Home doc-header, first load only | 200ms opacity + 4px rise, once, never on scroll |
| Diagram "trace a request" | User-initiated, **defaults to paused**, ≤5s, max 3 loops |

Nothing exceeds 240ms. Nothing bounces, springs, or overshoots.

**Banned outright:** scroll-triggered reveals of any kind (P0 removal from the current site — they delay reading, break Cmd+F, and make deep-linked anchors land on invisible content), canvas particle backgrounds, scroll progress bars, count-up numbers, parallax, scroll-jacking, sticky pinned sections, card lift-on-hover, staggered list entrances, typewriter effects, page-transition animations, animated theme crossfade.

**`prefers-reduced-motion: reduce`:** all transforms → none; opacity transitions ≤100ms or removed; `scroll-behavior: auto`. The diagram trace is **replaced by a Prev/Next step-through, not disabled** — the information stays reachable by another mechanism.

### 2.5 Accessibility contract

- **Focus:** `:focus-visible` only. `box-shadow: 0 0 0 2px var(--surface-canvas), 0 0 0 4px var(--focus-ring)` so the ring reads on raised, sunken, and tinted surfaces alike. WCAG 2.2 §2.4.11: `scroll-margin-top` on every heading and focusable target.
- **Headings:** exactly one `<h1>` per page. No skipped levels. Kickers are never headings.
- **Landmarks:** `header / nav / main / aside(aria-label="On this page") / footer`. `Skip to content` is the first tab stop; case studies add `Skip to summary`.
- **Keyboard:** every interactive element is a real `<button>` or `<a>`. Toggles are a `<fieldset>` of radios or a correct tabs pattern with roving tabindex and arrow keys. Scroll regions get `tabindex="0"` + `role="group"` + `aria-label`.
- **Targets:** ≥44×44px for every control. No fixed-height buttons, chips, or table rows — padding only, so nothing clips at 1.5 line-height / 0.12em letter-spacing (WCAG 1.4.12).
- **Non-color encoding everywhere:** dashed strokes for async edges, word verdicts in tradeoff tables, `≈` + dotted underline for abstracted metrics, text status tokens instead of colored pills.
- **Link text:** "Read more" is banned. Links read `Read the ERP consolidation case study`.
- **Reflow:** readable at 400% zoom / 320px equivalent. No two-dimensional scrolling except diagram containers, which is the permitted exception.

### 2.6 The evidence pattern library

Seven components. Each is designed so its *structure* is the trust signal.

| Component | Treatment | Why it earns trust |
|---|---|---|
| **`<Metric>`** | Value Inter 600/32px `tnum`; label 14px. Hairline-separated cells, no boxes, no accent on the number. **Optional** source line (13px mono, muted), used only for exact checkable figures from Oscar's own products. | The label carries the insight; the number only confirms it. Under D4 there are no inline hedges — generalized pieces simply carry fewer numbers, which is the honest outcome. |
| **`<DecisionRecord>`** | Hairline block, fixed five-field grid: **Context / Decision / Alternatives considered / Consequences / Status.** Kicker labels in a 130px left column. `ADR-007` in mono top-left. Status as text: `Accepted 2026-03` or `Superseded by ADR-011`. | "Alternatives considered" is the field a fabricated ADR always omits. |
| **`<TradeoffTable>`** | Real `<table>`. Horizontal hairlines only, no zebra, no vertical rules. Verdicts are **words** (`Chosen`, `Rejected — operational cost`), never ✓/✗. Numeric columns `tnum`, right-aligned. | Icon verdicts hide the reasoning; a phrase forces you to state the cost. |
| **`<SystemDiagram before after>`** | Stacked vertically below 1024px, never side-by-side on mobile. Each has its own `<figcaption>`. A **required delta list** in prose below the pair: what moved, what was retired, what got harder. | The delta list is the argument; the diagram illustrates it. A reader who can't see the SVG loses nothing. |
| **`<Constraint>`** | 2px `border-interactive` left rule, no fill, kicker heading. States the limit and who imposed it. | Naming what you couldn't do is the cheapest reliable credibility signal in a case study — and the plainest treatment on the page, so it reads as fact rather than a brag about difficulty. |
| **`<WhatIdDoDifferently>`** | 2px `signal-regret` left rule. Required three parts: what I'd change, why, what it would have cost. **Opens §6, ahead of the outcome narrative.** | Burying the regret at the end reads as a compliance checkbox. Ahead of the wins, it reads as calibration. |
| **`<Disclosure>`** | One per document, under the doc header. 14px, muted, hairlines above and below, no fill, no icon. Text is a constant — never authored per page. | Answers the confidentiality question once, in identical words every time. A statement that varies by page reads as negotiated rather than standing. |
| **`<Details>`** | Native `<details>`/`<summary>`. Summary in Inter 15px with a rotating chevron; content indented behind a 2px hairline rule so the expansion reads as a branch off the narrative rather than a new section. 180ms open. Never nested. | It is the entire depth mechanism under D5. The hairline rule is what signals "elaboration," not "the part you skipped." |

None of these use a drop shadow. All break out to 860px while prose stays at 68ch, so they read as artifacts inserted into a document.

**The `<Details>` review rule, restated because it's the one that gets violated under time pressure:** collapse everything, read the page top to bottom, confirm no argument has a hole in it. Expandables hold schemas, configs, failure traces, and arithmetic. They never hold a step in the reasoning.

### 2.7 Diagram rendering

Hand-authored inline SVG components, colored entirely with CSS custom properties. No runtime diagram library, no PNG exports, no literal hex in the SVG.

- Strokes: 1.25px containment, 1.75px flow, 2.5px emphasis. Node fill = raised surface, radius 6px, arrowheads as `<marker>` inheriting the edge stroke.
- Node **type is carried by shape** (rect = service, rounded = store, hexagon = gate) plus a label. Never by color alone. Async edges are dashed with a legend.
- Labels are real `<text>`, never text-as-path. Never scale below 100%: set `viewBox` + `width:100%` + `min-width`, let the container scroll.
- **Every diagram ships a text equivalent**, always present in the DOM so Cmd+F finds it, in a `<details>` that is open by default below 768px. If the text equivalent is optional in the schema, it will not get written.
- Diagrams over 7 nodes ship a `Diagram / Steps` toggle defaulting to **Steps** below 768px.

---

## Part 3 — Page blueprints

Every page below is specified across the twelve dimensions you asked for.

---

### 3.1 `/` — Home

**Purpose.** Get a skeptical reader to open one case study within fifteen seconds, and establish before they scroll that this is a document site, not a pitch.

**Audience.** Primary: a hiring manager or Director/VP of Product at an AI-forward company, arriving from LinkedIn or a referral, on desktop, giving it ninety seconds. Secondary: a recruiter screening for keywords. Tertiary: a peer PM who followed a link to one of your essays.

**Key message.** *I own AI products end to end, and I build the systems that ship them — under governance I can show you.*

**Sections.**

1. Top rail (name, role, nav, theme)
2. H1 claim + standfirst
3. Front-matter block
4. Primary CTA + résumé link
5. Selected evidence — three rows
6. How I work — four principles
7. Currently — two present-tense paragraphs
8. Contact — one line
9. Footer / colophon

**Navigation.** Full nav in the rail. Evidence rows are whole-block links to case studies. Each of the four principles links into a Writing or Architecture document. Legacy anchor IDs (`#about #work #system #experience #toolkit #contact`) attach to the nearest equivalent sections.

**Call to action.** One button, one text link. `Read the case studies →` (filled, accent) and `Résumé (PDF, 84KB)`. Noting the file size is a small cheap signal that you think about the reader.

**Visual hierarchy.** The typographic jump from a 64px Inter headline to a 22px serif standfirst carries the entire first screen. Then the mono front-matter block, then a hairline grid. **No hero image, no illustration, no canvas.** Total page length ~1.5 screens of scroll.

**Content hierarchy.** Claim → qualification → verifiable facts → evidence → method → current state → contact. Every step down the page is more specific than the one above it.

**Reading flow.** H1 (2s) → standfirst (6s) → front-matter scan (4s) → decision point at the CTA (3s). A reader who scrolls past the CTA is browsing evidence rows, and each row is self-contained enough to be entered from a mid-page scroll.

**Interaction ideas.** Evidence rows are whole-block link targets with a 2px arrow shift and hairline color change on hover/focus. The front-matter block's `UPDATED` value is a real deploy date pulled at build. Theme toggle persists. That's the whole interaction budget for this page — deliberately.

**Animation ideas.** One: the doc-header block fades in over 200ms with a 4px rise, **on first load only**, never on scroll, never repeated. Nothing else on this page moves.

**Example copy.**

> # I own AI products end to end — and build the systems that ship them.
>
> Most enterprise AI programs fail on readiness, not on models. I spend my time on the unglamorous half: what the data actually supports, who owns the decision, what the security review will block, and how much autonomy a team can afford to supervise. I write here about the problems I've had to solve that way.

That standfirst is deliberately not a bio. It states a position, and the position is what a reader can disagree with. The biography lives on `/about`, where someone goes once they already care.

Alternate H1s if you want it sharper: *"Agentic delivery, with a human as the merge gate."* · *"Enterprise AI that passes the security review."*

Front-matter block:

```
FOCUS      Enterprise AI · identity · integrations · data platforms
CURRENT    Boldyn Networks — Technical PM, AI, Data & Integrations
BUILDING   TreeTales (live in production)
UPDATED    July 2026
OPEN TO    AI product roles
```

An evidence row:

```
TREETALES · OWNED · 2026–PRESENT · LIVE

Building the review gate before building the agent

Agent autonomy is bounded by review capacity, not model capability. Designing
for that first is what made a one-person product shippable.

35 people wrote something for someone else · 4 books printed     Exact, live data

separation of duties · draft-PR-only · anonymous-first identity        Read →
```

"How I work" principles — one sentence each, each a link:

> **Kill use cases before engineering commits to them.** An ROI-ranked pipeline is only useful if things actually come off it.
> **Name the constraint, not the win.** Every system I've shipped was shaped by something I couldn't do.
> **AI proofreads, never ghostwrites.** Guardrails belong in the product promise, not the launch post.
> **A human is the merge gate.** Autonomy is a budget you spend deliberately, not a default.

---

### 3.2 `/case-studies` — Index

**Purpose.** Let a reader see the shape and range of the work in one screen, and choose the one that matches their hiring problem.

**Audience.** Hiring managers comparing you against a role spec. They're pattern-matching: consumer or enterprise? 0→1 or scale? Did they build it or manage it?

**Key message.** *Four distinct problem types, four different modes of ownership — not four versions of the same job.*

**Sections.** (1) Doc header with count and last-updated. (2) A one-paragraph orientation. (3) The disclosure policy link. (4) The list.

**Navigation.** Filter by topic via the controlled vocabulary — as real links to `/topics/[topic]`, not client-side chips, so filters are shareable URLs. Sorted by recency by default.

**Call to action.** Each row is the CTA. No secondary buttons.

**Visual hierarchy.** Rows, not a card grid. Full-bleed to 860px, separated by hairlines. The mono meta line (org · role · period · disclosure level) sits *above* each title — it's what a scanner uses to triage.

**Content hierarchy.** Meta line → title → one-line problem → outcome strip → decision chips → arrow.

**Reading flow.** Vertical scan of meta lines first, then a second pass on titles. Designed so the meta column alone answers "is any of this relevant to me?"

**Interaction ideas.** Topic links in the header. Hover/focus changes hairline color and shifts the arrow 2px. No filtering JS at launch.

**Animation ideas.** None beyond hover transitions. This page is a directory.

**Example copy.**

> ## Case studies
> Four engagements, 2016–present. Each one states what I could measure, what I could only observe, and what I'm not able to disclose. [How I handle confidentiality →](/about#disclosure)

---

### 3.3 `/case-studies/[slug]` — Case study document

This is the template that has to carry the site. Anatomy is fixed so that every case study is comparable.

**Purpose.** Convert "interesting claim" into "I believe this person did this, and I can see how they think."

**Audience.** Two readers on the same page: a **skimmer** with four minutes who will read the summary block and the metrics, and a **deep reader** — likely your future manager or a staff engineer — who will read all of it and look for the seam where the story stops being credible.

**Key message.** Per-case, but always structurally: *here is the constraint, here is what I decided, here is what it cost, here is what I'd change.*

**Sections.** The six H2s below are **canonical and fixed** (D5, locked 2026-07-27). Every case study uses all six, in this order, with these names. Uniformity is the point: it makes engagements comparable, and it makes a missing section visible.

| # | Section | ~Words | Serves | What it must do |
|---|---|---|---|---|
| 0 | Doc header — title, `myRole`, period, `Updated`, reading time, **`teaches`** | — | Both | State the transferable idea before the reader commits |
| 0b | `<Disclosure>` — the standard statement, if `generalizesRealWork` | 1 block | Both | Appear once, verbatim, then never again on the page |
| 1 | **Executive summary** | ~150 | **The skimmer's entire experience** | Be the whole page in miniature. Prose, no sub-headings, no bullets. |
| 2 | **Product problem and stakes** | 350 | Both | The failure, and what it cost that it went unsolved. Stated without the solution in it. |
| 3 | **Constraints and stakeholders** | 350 | Both | What was immovable, and *who* made it immovable. `<Constraint>` blocks. |
| 4 | **Decision process and tradeoffs** | 500 | Both | `<DecisionRecord>` + `<TradeoffTable>`. Alternatives considered is mandatory. Contains the required strategy subsection below. |
| 5 | **Technical architecture or implementation considerations** | 450 | Deep | Diagram + text equivalent + required delta list. Deepest expandables live here. |
| 6 | **Outcome and lessons** | 400 | Both | What happened, then the teaching payload. |
| — | Artifacts, links, footnotes | — | Deep | — |

**Where product strategy went — flagging this rather than deciding it silently.** Your nine-section list included *Product Strategy*; the six-section depth model has no slot for it. It's the section most portfolios skip and the clearest Principal-versus-Senior signal, so I've kept it as a **required H3 inside §4**, titled *What this unlocked, and what it foreclosed*. Reasoning: strategy is forward-looking, so it belongs with the decision rather than with the retrospective in §6. Say the word if you'd rather it be a seventh H2 or live in §6 instead.

**Notes on the sections that are easiest to write badly:**

- **§1 Executive summary is prose, not a template.** Five or six sentences a busy reader can absorb standing up. If it needs bullets to be clear, the piece isn't clear.
- **§3 names people, not just limits.** "The window was four hours" is a constraint. "The window was four hours because the controller owned close and close doesn't move" is a stakeholder map. The second one teaches.
- **§4 states the cost before the choice looks good.** The tradeoff table's cost column must contain something you'd rather not admit. A row with a soft cost is a row that hasn't been thought about.
- **§6 is not a humility ritual.** If Lessons reads as "I learned to communicate more," cut the piece and write a different one.

**The progressive-disclosure contract applies to every section**, and §5 most of all: schemas, configs, failure traces, and arithmetic go inside `<Details>`. The section's argument must survive with all of them closed.

**Navigation.** Sticky right-rail TOC at ≥1200px (200px wide, 14px Inter, `aria-current="location"` scroll-spy, active item marked by a 2px accent rule that slides 150ms). Below 1200px it becomes a closed `<details>` "On this page" under the header. Every H2/H3 has an anchor link — `opacity: 0` until hover/focus on desktop, permanently at `.4` on touch. A "Related evidence" rail at the foot, edges named.

**Call to action.** At the foot: the next case study, plus one line — *"If you want the parts I can't publish, that's a conversation."* linking to LinkedIn. Deliberately not a button.

**Visual hierarchy.** Prose at 68ch (~660px), evidence components breaking out to 860px, code at 760px, full-bleed never. A single hairline above top-level H2s only — enough to signal a chapter, not enough to fragment the page. 96px above H2 (64px mobile).

**Content hierarchy.** The five-line summary is the page in miniature. Everything after it is elaboration, in decreasing order of what a hiring decision depends on.

**Reading flow.** The contract that makes one page serve both readers: **the first sentence of every H2 section is the answer to that section**, set in serif at body size, weight 600. Reading only first sentences yields a coherent eight-sentence abstract. This belongs in the writing guide, not just the design.

**Interaction ideas.** Anchor-link copy on every heading. `<Details>` expandables carrying the technical depth, all closed on load. Diagram `Diagram / Steps` toggle. Footnote references jump both ways. No toggle persists across routes — every page opens in the same state for every reader.

**Animation ideas.** TOC active indicator slide (150ms). Details disclosure (180ms). Optional user-initiated diagram trace, paused by default. Nothing else.

**Example copy.** Doc header, showing the two new required fields:

> # Building the review gate before building the agent
> `Role: Owned · TreeTales · 2026–present · Updated Jul 2026 · 11 min`
> **Teaches:** Agent autonomy is bounded by review capacity, not by model capability — so the throughput ceiling is a human one, and you should design it first.

Summary block, in the product-thinking register rather than the achievement register:

> A collaborative Memory Book needs many people writing about one person, and group-gift products die the moment contributing feels like homework. I built it alone, which meant the constraint wasn't engineering capacity — it was how much generated work one person could review before trusting it. So the delivery system came first: separate architect, builder, and reviewer agents, no agent able to both write and approve, all output landing as draft pull requests. That decision capped overnight throughput at my morning reading speed, on purpose. The thing I got wrong was sequencing: I wrote the decision records after the third architectural argument instead of before the first, and re-litigated two of them.

A `<Constraint>`, generalized — the pattern survives, the account doesn't:

> **Constraint**
> In a multi-entity finance consolidation, close runs on the third business day and it does not move. No cutover window can exceed a few hours, and no entity can be down during another entity's close. That single scheduling fact, not any technical dependency, determines the order in which every integration ships — which is why sequencing in this kind of program is a finance decision wearing an engineering costume.

A `<Metric>`, written as evidence rather than as a bullet. Note the label carries the insight; the number is just the number:

> **35** people wrote something for someone else
> The metric that actually predicts whether a collaborative gift product works — not signups, not sessions.
> `Source: live product data · Exact`

And the counter-example, so the bar is unambiguous. **Banned:**

> ~~Delivered 26 integrations in 8 months across an 8-ERP consolidation, unblocking portfolio-level reporting.~~

That sentence belongs on `/resume` and nowhere else. It reports scope; it teaches nothing.

---

### 3.4 `/architecture` and `/architecture/[slug]`

**Purpose.** Prove the systems judgment. This is the section that separates a technical PM from a PM who says "technical."

**Audience.** The staff engineer or principal PM in your loop who is deciding whether you'd be a peer or a passenger. Also the hiring manager who needs to justify a Principal-level offer to their own leadership.

**Key message.** *I make architectural decisions, I record them, and I state what each one cost.*

**Sections (detail page).** Doc header · Context (the constraint that forced it) · Decision · System diagram + text equivalent · **Tradeoffs — required, ≥1 gained/gave-up pair** · Consequences observed · Status (`active` / `superseded` / `exploratory`, with `supersededBy`) · Applied in (links to case studies).

**Navigation.** Index groups by kind: **Systems** (how a thing is built), **Decisions** (ADR-style), **Patterns** (recurring shapes). Each detail page links to the case studies it was applied in; those link back automatically.

**Call to action.** None conventional. The end-of-document action is a link to the framework derived from the decision, or to the case study where it was applied.

**Visual hierarchy.** The diagram is the visual anchor, but the **tradeoff table is the credibility anchor**. Give the table equal weight — 860px breakout, generous row padding, word verdicts.

**Content hierarchy.** Constraint → decision → shape → cost → outcome → status. Note that cost comes before outcome. That ordering is the whole argument of the section.

**Reading flow.** A reader should be able to stop after the tradeoff table and have gotten the value.

**Interaction ideas.** `Diagram / Steps` toggle. Optional "trace a request" — user-initiated, paused by default, ≤5s, three loops maximum, and replaced by a Prev/Next step-through under `prefers-reduced-motion`.

**Animation ideas.** Only the trace, and only on request.

**Example copy.**

> ## Separation of duties for autonomous agents
> `ADR-004 · Accepted 2026-02 · Active`
>
> **Context.** An overnight orchestrator can open more pull requests than one person can review before work starts the next morning.
> **Decision.** Architect, builder, and reviewer are separate agents with separate context. No agent may both write and approve. All agent output lands as draft PRs. A human is the sole merge gate.
>
> | | Gained | Gave up |
> |---|---|---|
> | Separate reviewer agent | Caught scope drift the builder couldn't see in its own diff | Roughly 40% more tokens per change |
> | Draft-PR-only output | No unreviewed code ever reached main | Overnight throughput is capped by my morning review capacity |
> | Hard dispatch budget | Cost is bounded and predictable | Some runs stop mid-task and resume the next night |

---

### 3.5 `/frameworks` and `/frameworks/[slug]`

**Purpose.** Show that your thinking generalizes — that you have transferable method, not just anecdotes.

**Audience.** The hiring manager asking "what would this person bring to my team on day one?" and peers who might actually use one.

**Key message.** *Here is a method you could run on Monday, including where it breaks.*

**Sections.** Doc header · **Use when** (one line) · Inputs required · **Steps — required, ≥2** · **Failure modes — required, ≥1** · Maturity (`battle-tested` / `used-once` / `proposed`) · Proven at (case study links).

The schema rule that keeps this section honest: **`battle-tested` requires a non-empty `provenAt`.** You cannot claim a framework is proven without naming where.

**Navigation.** Index is a table, not cards: Framework · Use when · Maturity · Proven at. Sortable by maturity so a reader can go straight to what's been used for real.

**Call to action.** "Where this was used" → case study.

**Visual hierarchy.** The `Failure modes` section gets the same visual weight as `Steps`, not a smaller footnote treatment. That parity *is* the credibility.

**Content hierarchy.** When to use it → what you need → how to run it → when it fails → where it's been proven.

**Reading flow.** "Use when" is a filter — a reader decides in one sentence whether to continue.

**Interaction ideas.** Steps are a numbered `<ol>` with anchor links so a step can be cited directly. Copy-link on each step.

**Animation ideas.** None. This is a reference page.

**Example copy.**

> ## The readiness screen
> **Use when** stakeholders are bringing you AI use cases faster than engineering can evaluate them.
> **Maturity** Battle-tested · Proven at [Boldyn Networks](/case-studies/agentic-ai-roadmap)
>
> ### Failure modes
> 1. It kills good ideas that have a data problem rather than a value problem. Add a "revisit when" date to every rejection or you'll re-litigate the same use case in six months.
> 2. Stakeholders learn to game the readiness questions. Score the evidence, not the answers.

---

### 3.6 `/product-thinking` and `/product-thinking/[slug]`

**Purpose.** Show the point of view. This is where a Principal-level signal comes from — not "I shipped X" but "here's what I now believe, and here's the evidence that changed my mind."

**Audience.** Peers and senior leaders. This is the section people share.

**Key message.** *I hold positions, I ground them in things I actually built, and I revise them in public.*

**Sections.** Doc header with **thesis** (≤180 chars, the claim the piece argues) · the argument · **grounded in** (case study links) · counter-argument taken seriously · what would change my mind.

**Navigation.** Index leads with the *thesis*, not the title — a reader should be able to disagree with you before clicking. A `supersedes` field links a revised position back to the older one; both stay live. Publicly revising a position is a stronger signal than never having been wrong.

**Call to action.** Discussion via LinkedIn. Related evidence rail.

**Visual hierarchy.** Longest-form reading on the site. Serif at 19px/1.65, 68ch, generous 96px section breaks. The thesis sits in the doc header at lede size (22px), the only element above body weight before the first H2.

**Content hierarchy.** Thesis → why it matters now → the argument → the strongest objection → what evidence would move you.

**Reading flow.** Pure linear read. No TOC below 1200px; these are shorter than case studies.

**Interaction ideas.** Anchor links, footnotes, and a "grounded in" rail. Nothing else.

**Animation ideas.** None.

**Example copy.**

> **Thesis.** Agent autonomy isn't a capability question, it's a review-capacity question. Ship the merge gate before you ship the agent.
>
> **What would change my mind.** A reviewer agent whose false-negative rate on scope drift is low enough to audit by sampling rather than by reading every diff. I haven't seen one; I'd like to be wrong.

---

### 3.7 `/resume`

**Purpose.** Survive the recruiter screen and the ATS, and be printable without looking like a web page someone printed.

**Audience.** Recruiters, ATS parsers, and a hiring manager who wants dates and titles in ten seconds.

**Key message.** *Ten years, three companies, an escalating pattern of technical ownership.*

**Sections.** Header (name, title, location, links) · Summary (3 lines) · Experience (reverse chronological, with sub-roles nested under PandoLogic) · Selected outcomes · Skills — **as a depth table** · Education · Advisory.

**Navigation.** In-page only. Job titles link to the corresponding case study where one exists.

**Call to action.** `Download PDF` at the top right of the doc header, with file size. LinkedIn in the header block.

**Visual hierarchy.** Two columns on desktop — a 130px mono date column, and content. Single column on mobile and in print. Dates and companies in mono so they align into a scannable spine down the left edge.

**Content hierarchy.** Most recent first, most senior first, and within each role: scope, then outcome, then mechanism.

**Reading flow.** Designed for the left-edge date spine to be scannable in isolation.

**Interaction ideas.** Print stylesheet drops nav, motion, and dark theme, and expands links to footnoted URLs so "Save as PDF" works day one with zero dependencies.

**Animation ideas.** None. Ever. On any page, but especially this one.

**Anti-pattern to kill from the current site.** The Toolkit section is sixty-plus chips across six groups. That's an unfalsifiable assertion. Replace with ~15 rows and a **Depth** column: `build / operate / evaluate / familiar`.

> | Capability | Depth | Where |
> |---|---|---|
> | Multi-agent orchestration | Build | TreeTales |
> | Postgres row-level security | Build | TreeTales |
> | Canonical data modeling | Operate | Boldyn |
> | JWT / SAML / OAuth | Operate | PandoLogic |
> | Microsoft Fabric | Evaluate | Boldyn |
> | Python | Familiar | — |

A depth rating is a claim you can be interrogated on in an interview. A chip wall is one you can't.

**Note on the PDF.** Generate it in CI by printing the real `/resume` page with headless Chromium, and write it into the deploy artifact. It's never committed, so it can't drift from the site. Make that step non-blocking — a broken PDF generator must never take down the deploy.

---

### 3.8 `/about`

**Purpose.** Put a person behind the artifacts, and — more importantly — host the **disclosure policy** that every case study links to.

**Audience.** Someone who has read one or two case studies and is now deciding whether to reach out.

**Key message.** *I'm calm and non-hype about AI. Here's exactly what I will and won't tell you about work I've done for employers.*

**Sections.** (1) Who I am, three paragraphs. (2) **How I handle confidentiality** — the canonical policy, anchored at `#disclosure`. (3) How I work — the four principles, expanded. (4) Also — the personal line. (5) Colophon — how the site is built. (6) Contact.

**Navigation.** `#disclosure` is the anchor the `<Disclosure>` block on every generalized case study points to.

**Call to action.** LinkedIn, one line, no card.

**Visual hierarchy.** Straight prose. No stat tiles, no photo grid. A single headshot is optional and, if used, small, square, and unstyled — not a full-bleed portrait.

**Content hierarchy.** Identity → policy → method → person → colophon.

**Reading flow.** Linear.

**Interaction ideas.** None.

**Animation ideas.** None.

**Example copy — the disclosure policy.** This is the most important paragraph on the site:

> ### How I handle confidentiality
> Case studies drawn from client and employer work carry this line at the top: *this case study generalizes details and omits confidential information while preserving the underlying product problem, constraints, and decision process.*
>
> That's a real constraint, not a formality, and it shapes what you'll find here. Account names, internal scale, and system specifics are generalized. The problem, the constraints, the alternatives, and the reasoning are not — those are the parts worth reading anyway, and they're the parts that transfer to your situation rather than describing mine. Work on my own products is exact and checkable, and says so. What I never do is generalize my own role: where a piece says I advised, I advised.

**Personality calibration.** "Off the clock" moves here from Home, as one sentence of running prose. No emoji, no chips. But pull **the church production role out of the hobby list** — running live production for a weekly service is real operational ownership under an immovable deadline with volunteer staffing. Give it its own line, framed as what it is.

> **Also.** I've been production lead at my church for several years — live sound and video, a fixed Sunday deadline, and a volunteer crew, which has taught me more about rollout planning than most retrospectives. Off the clock: fishing, gardening, a serious matcha habit, and a golf swing that is still under active development.

---

### 3.9 `/topics/[topic]`

**Purpose.** Make the site legible as a body of work on a subject rather than a list of jobs.

**Audience.** A reader who has decided they care about one thing — agentic systems, identity, data platforms — and wants everything you have on it.

**Key message.** *This isn't one anecdote. It's a position with case evidence, an architecture, and a method behind it.*

**Sections.** Topic name, count, then documents grouped by collection: Case studies · Architecture · Frameworks · Writing.

**Navigation.** Generated from the controlled vocabulary. Linked from every document's topic list.

**Call to action.** The documents themselves.

**Visual hierarchy.** Four hairline-separated groups, each with a kicker header. Rows identical to the case-study index.

**Content hierarchy.** Evidence first (case studies), then reasoning (architecture), then method (frameworks), then opinion (writing).

**Reading flow.** Scan-and-pick.

**Interaction ideas / animation.** None. It's an index.

---

### 3.10 `/404`

**Purpose.** Recover a reader who followed a stale anchor or a mistyped URL.

**Sections.** One line, plus the four highest-value links.

**Example copy.**

> **That page doesn't exist.** If you followed a link from an older version of this site, the content probably moved rather than disappeared. Start with the [case studies](/case-studies), the [résumé](/resume), or [what I'm building now](/about).

---

## Part 4 — What survives from the current site

**Keep the substance.** The TreeTales multi-agent narrative, the 13 ADRs, "AI proofreads, never ghostwrites," and the constraint language ("hard dispatch budgets, draft-PR-only output, human as sole merge gate") are exactly the raw material this design exists to display.

**Keep and rebuild.** The Agent System section (currently `index.html` ~lines 1109–1147) already models the architect/builder/reviewer loop with a plain-language and a technical description per node. That's the strongest single asset on the current site — and under D5 the toggle disappears while the content survives: **the plain-language text becomes the prose, the technical text becomes a `<Details>` expandable beneath it.** Same material, no mode switch, and the node data becomes a typed object feeding `architecture/agent-separation-of-duties`.

**Cut.**

| Element | Why |
|---|---|
| Canvas particle field (`#net`) | Banned category. Decorative motion on a reading site. |
| All `.reveal` scroll animations | P0. Delays reading, breaks Cmd+F, deep links land on invisible content. |
| Scroll progress bar | Banned category. |
| The 60+ chip Toolkit wall | Unfalsifiable assertion. Replaced by the depth table. |
| Emoji chips in "Off the clock" | The single most "personal portfolio" element on the site. |
| The `.` after the brand name, the `—` in the H1 | Affectation. |
| "Built with a little help from my agents" | Replaced with the checkable colophon + repo link. |
| **The "Ask about Oscar" chat FAB** | See below. |

**On the chat widget — the designer's verdict, and I agree.** It's a keyword-matched script that must announce "not a live AI" on a site whose entire thesis is *I build real agentic systems*. It's the weakest technical artifact on the site occupying the most prominent, permanently visible position — a skeptical reviewer will open it first. And a floating 💬 FAB is the Intercom convention, precisely the marketing register you banned.

Two honest replacements:

- **If you want the interactive-AI signal:** make it a first-class page — a retrieval-grounded Q&A over your own case studies, presented as an artifact, with its architecture diagram, eval set, known failure modes, cost per query, and refusal behavior documented on the same page. Then the demo *is* the evidence and its limits are the point. Built to that bar it's the strongest page on the site. Built below it, ship nothing. (Note: this is the one feature that would require leaving static hosting.)
- **Cheap middle path:** an inline, non-floating "Common questions" `<details>` list at the foot of Home. Same content, zero JS, no false AI claim.

---

## Part 5 — Content inventory

Code is not the bottleneck here. Writing is. Increment 2's entire value is whether those documents say something non-obvious.

Titles are written as **the idea taught**, not the engagement. That's the editorial mandate applied to the inventory itself.

| Working title | Collection | Source material | Status |
|---|---|---|---|
| Building the review gate before building the agent | case-studies | Rich — current site + your own repo. Exact numbers, nothing to generalize. | **Rewrite to new anatomy** |
| Sequencing a consolidation around a date you don't control | case-studies | The ERP work. Generalize the account; the finance-close constraint is the teaching. | Needs writing |
| Single sign-on is a sales unblock disguised as an auth project | case-studies | The identity work. Teaches how to price a platform investment by what it unblocks. | Needs writing |
| Killing AI use cases before engineering commits | case-studies | **Not currently a case study — it should be.** The ROI-ranked pipeline and readiness screen is your strongest Principal-level evidence and it's currently three résumé bullets. | **Net new — highest value** |
| Separation of duties for agents | architecture | Strong, exists in ADRs | Needs writing |
| Canonical model & system-of-record | architecture | Strong, from Workday work | Needs writing |
| Anonymous-first identity + RLS | architecture | Strong, from TreeTales | Needs writing |
| The readiness screen | frameworks | From the roadmap work | Needs writing |
| Governed delivery loop | frameworks | From TreeTales | Needs writing |
| ROI-ranked use-case pipeline | frameworks | From Boldyn | Needs writing |
| 2–3 positions | product-thinking | — | Net new |

**The content split that keeps you honest:** TreeTales carries the exact numbers and does the proof work. The employer case studies carry **mechanism and decisions**. Don't ask Boldyn or PandoLogic to bear metric weight they can't legally carry — their job is showing how you decided, which is exactly what the architecture collection exists for.

---

## Part 6 — Build sequence

You asked to build this page by page. Each step below produces one reviewable page, and **you're the gate on each one before the next starts.**

| Step | Deliverable | Why this order |
|---|---|---|
| **0 — Foundation** (½ day, no page) | Scaffold Next + TS + Tailwind. Prove exactly two things: static export deploys to Pages with the root URL intact, and one MDX doc compiles in a Server Component under export. Ship a near-empty page. | If either fails, the plan changes. Day one is when you want to know. |
| **1 — Design system, on one real page** | Type scale, both themes, the seven evidence components, motion module — rendered on the About page, because it's the shortest page that exercises prose, callouts, and the disclosure policy. | Every later page is assembly. Building the system against real content stops it becoming decoration. |
| **2 — Case study #1: TreeTales** | The full nine-section anatomy on your own product, where the numbers are exact and nothing needs generalizing. | It's the template. Get the hardest page right before replicating it four times. |
| **3 — Case study index + Home** | Both are surfaces *for* case study #1, so they can't be designed honestly before it exists. | Home is written last of the three on purpose — you can't summarize work you haven't written. |
| **4 — Case studies #2 and #3** | The generalized enterprise pieces. This is where the generalization guardrail gets its real test. | — |
| **5 — Resume** | Structured data, HTML + print stylesheet, the depth table replacing the chip wall. | The one page where resume language is not only allowed but correct. |
| — | **Ship it.** Nav shows Case Studies / Resume / About. Strictly better than what's live today. | |
| **6 — Architecture ×3, Frameworks ×3** | The differentiator. Taxonomy and `/topics/[topic]` land here, because they need ≥6 documents to mean anything. | Unlocks two more nav items via the D1 count gate. |
| **7 — Proof** | OG images, JSON-LD, sitemap, search, CI-generated PDF, Lighthouse + axe pass. | — |
| **8 — Optional** | Product Thinking essays · the Agent System interactive · the AI Q&A decision. | Unlocks the seventh nav item. |

**The honest constraint on this schedule: writing is the bottleneck, not code.** Step 6 is about a day of engineering and several days of thinking. Plan the calendar around the writing.

**One settings change you'll need to make yourself** (it's a GitHub UI action, not a command): Settings → Pages → Source → **GitHub Actions**. Right now it's set to the legacy branch build, which won't run a Next.js build.

**A trap worth recording now:** if you ever add a custom domain, the `CNAME` file must live in `public/` so the export copies it into the deploy artifact. Deploying via Actions without it silently wipes the custom domain setting on every deploy. Not an issue today — you have no custom domain — but it's the failure that bites people six months later.

---

## Part 7 — Open risks

1. **`next-mdx-remote` v6 RSC on Next 16.2 under `output: 'export'` is unverified.** Version and publish date confirmed; compatibility not. That's why Increment 0 tests it first. Pre-chosen fallback: `@content-collections/core`.
2. **Content volume versus ambition.** Seven routes implies breadth that isn't written yet. Mitigated by the count-gated nav in D1.
3. **Motion, accessibility, and print collide on the same components.** All motion funnels through one module behind a single reduced-motion gate. Ad-hoc motion across thirty components quietly violates both contracts.
4. **Dark-mode flash on a static export.** Theme must resolve before first paint, and reconcile with a print stylesheet that forces light. Small, and always discovered last.
5. **Nothing here needs a server.** The real AI Q&A page is the one thing that would, and it's the trigger to revisit hosting. Build the config escape hatch on day one so that move is a DNS change, not a rewrite.

---

## Waiting on you

**All five decisions are locked.** D1 seven count-gated routes · D2 Source Serif 4 body · D3 Framer Motion scoped to one module · D4 single standardized disclosure statement · D5 progressive disclosure in one document, six canonical sections. D5 is the permanent MDX authoring contract.

Two things left for Oscar, neither blocking:

1. **Where product strategy lives.** Currently a required H3 inside §4, titled *What this unlocked, and what it foreclosed*. It could instead be a seventh H2 or fold into §6. See §3.3.
2. **Whether an optional source line on exact figures counts as an inline disclosure marker** under D4. Currently kept, restricted to exact checkable numbers from Oscar's own products. See D4.

Next: **Step 0 in Part 6** — half a day of scaffolding that proves static export and MDX-under-export both work, before any page is designed against them.
