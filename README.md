# Khaled Sanad — Portfolio

A personal portfolio of standalone browser-native analytical and decision-support artefacts, built entirely with HTML, CSS, and vanilla JavaScript. No build system, no framework, no node_modules, no package.json. Every artefact is a single self-contained file that runs directly in the browser and deploys to GitHub Pages without a compilation step.

The portfolio is designed to demonstrate applied capability in data architecture, analytics, AI-assisted development, strategic decision support, and executive-facing communication — not as a showcase of technical novelty, but as evidence of the ability to turn complex information into tools that actually get used.

---

## Client context — Asterion Grid

All artefacts are scoped to **Asterion Grid**, a fictional multinational blockchain-enabled commodity provenance and compliance infrastructure operator. Asterion Grid does not issue tokens or operate as a financial institution. Its core product is a permissioned blockchain platform that records tamper-evident supply-chain events — mine-of-origin declarations, shipment milestones, customs documents, carbon certificates, sanctions-screening outcomes, and regulatory evidence packs — for parties that do not fully trust each other.

The flagship programme is the **Critical Minerals Traceability Expansion FY26–FY28**, scaling from a regional pilot to a multinational platform covering lithium, nickel, rare earths, and ESG assurance records across Australia, Singapore, the EU, the US, and the Middle East. Customers include mining companies, agricultural exporters, logistics firms, customs brokers, insurers, manufacturers, auditors, and government-adjacent compliance bodies.

Using a consistent fictional client across every artefact serves a specific purpose: it gives each tool the specificity and operational grounding that generic demo data cannot. The analytical logic, risk frameworks, scoring models, and governance structures are real and transferable to any enterprise context. Asterion Grid simply provides the stakes.

---

## Architecture

The portfolio is served from GitHub Pages at `sanadzadeh.github.io/Portfolio`, from the `main` branch root. The repository structure is flat and deliberate:

```
/
├── index.html              # Portfolio shell
├── cv.html                 # Curriculum vitae
├── apps/
│   ├── forecasting-dashboard.html
│   ├── deployment-strategy-dashboard.html
│   ├── decision-matrix.html
│   ├── data-risk-assessment.html
│   ├── initiative-tracker.html
│   ├── stakeholder-mapping.html
│   ├── business-case-builder.html
│   └── ledger.html
└── TEMPLATE.html           # Blank artefact template
```

The portfolio shell (`index.html`) renders a grid of tiles. Clicking any tile opens the artefact in a full-screen overlay iframe via `openOverlay(href, title)`, which sets `overlayFrame.src` from the tile's `href` attribute and calls `history.pushState` exactly once. All three close paths — the overlay back button, browser back, and Escape key — navigate directly to `index.html` rather than calling `history.back()` in place, preventing history stack corruption across browsers.

No artefact may call `history.pushState`, `history.back()`, or modify `window.location` internally. Internal navigation within artefacts is implemented as class toggling (`hidden`/`active`) on sibling `div` elements. This constraint exists because any `pushState` or `location` change inside the iframe adds entries to the parent page's history stack, requiring multiple back-button presses to close the overlay.

All development happens on feature branches, not directly on `main`. Changes are submitted via pull request with descriptive, content-specific commit messages.

---

## Design system

The design reference for the entire suite is the **Decision Matrix** artefact. Every artefact inherits from a shared set of base tokens and conventions, with one unique `--accent` colour per artefact to give each tool its own identity within a coherent system.

### Typography

The font pairing is intentional and fixed across the suite:

- **Cormorant Garamond** — all headers, hero titles, large numerics, and executive interpretation text. Loaded at weights 300, 400, and 600. Weight 400 reads as confident rather than fragile at the current size range and is the correct weight for hero titles. Weight 300 is appropriate for body-level Cormorant use such as executive interpretation panels, where warmth matters more than authority.
- **DM Mono** — all body text, eyebrows, labels, descriptors, tags, and interactive elements. DM Mono signals precision and analytical rigour. At very small sizes on mobile it can feel tight; the minimum body size across the suite is `.72rem`.

### Colour tokens

```
--bg:           #141414   /* page background */
--surface:      #1c1c1c   /* card/panel background */
--surface-alt:  #222222   /* secondary surface */
--surface-hi:   #282828   /* elevated surface, active states */
--border:       rgba(255,255,255,0.07)
--border-soft:  rgba(255,255,255,0.04)
--ink:          #f5f2ed
--ink-2:        rgba(245,242,237,0.55)   /* secondary text */
--ink-3:        rgba(245,242,237,0.25)   /* tertiary text, labels */
```

Status colours carry consistent semantic meaning across all artefacts:

```
--green:  #5f9a78   /* healthy, complete, on track, low risk */
--amber:  #c49a55   /* at risk, moderate, caution */
--red:    #b4685d   /* critical, high risk, hard deadline */
--blue:   #6b8fa8   /* informational */
```

Each artefact declares its own `--accent`, `--accent-dim`, and `--accent-mid` in the `:root` block. The accent drives the artefact's recommendation strips, active states, filter pills, and badge colours.

### Layout conventions

The 1px hairline gap grid — achieved with `gap: 1px; background: var(--border)` on a grid container — is the suite's primary layout device. It creates visual separation between panels without visible borders, giving dashboards a tight, data-dense feel while maintaining clear spatial hierarchy.

Recommendation and interpretation boxes use `border-left: 3px solid var(--accent)` with `background: var(--surface)`. No icons are used anywhere in the suite; the `↗` glyph is the only non-alphabetic navigation symbol.

Scenario and section tabs use the manila-folder pattern: `border-bottom` is removed from the active tab, and the content panel's top border merges visually with the tab, creating the appearance of a folder opening into content.

---

## Artefacts

### CV (`cv.html`)

A single-page curriculum vitae consistent with the suite's visual conventions. The sticky header uses `position: sticky; top: 0; z-index: 50` and displays the name block alongside the contact details in a row on desktop, baseline-aligned. On mobile the layout collapses to a column, the full "Curriculum Vitae" subtitle is hidden, and a blinking gold dot appears inline after the name — implemented as a `<span class="blink-dot">` with a CSS `@keyframes blink` animation.

The page uses a two-column grid: a sticky sidebar containing skills, education, and certifications; and a main column containing the professional summary, portfolio tile grid, and experience. Each section has `scroll-margin-top: 160px` to ensure pill-driven navigation lands below the sticky header.

The sidebar skills are organised into five groups: Engineering, AI & Automation, Data & Architecture, Reporting & BI, and Delivery. The portfolio section sits between the summary and experience in the main column, presenting the six primary artefacts in a 2-column hairline grid. The Portfolio section label is a link to the live portfolio and carries the suite's blinking dot treatment.

Two mobile-only navigation pills — Experience and Credentials — appear in the header on screens below 900px. Skills is omitted because it is the first section visible on load.

---

### Forecasting Dashboard (`apps/forecasting-dashboard.html`)

A multi-scenario enterprise planning workspace modelling the Critical Minerals Traceability Expansion across four scenarios: Base Case, Accelerated Compliance, Regulatory Delay, and Supplier Resistance. Each scenario has a fully embedded data object containing chart data, KPI values, signal row text, and an executive interpretation template.

Scenario-specific slider defaults are stored in `SCENARIO_DEFAULTS` keyed by scenario ID. Switching scenarios resets all sliders to the target scenario's defaults; slider thumbs and value labels turn accent-coloured when they deviate from the current scenario default, providing immediate visual feedback on manual overrides.

Six assumption sliders drive live recalculation of all outputs: supplier onboarding rate, regulatory friction index, evidence failure rate, platform adoption curve, implementation cost variance, and audit exception rate. The chart is a canvas-drawn bar-plus-line composite computed by `computeChartData()`, which applies slider-driven scaling factors rather than static arrays — ensuring all visual elements respond to slider input rather than switching between pre-baked datasets.

The Sankey diagram is an inline SVG built by `drawSankey()` using filled bezier ribbon paths proportional to live computed flow values. It maps the flow of supplier evidence records through validation, anchoring, compliance checking, and audit resolution stages.

The executive interpretation panel uses `border-left: 3px solid var(--accent)` with Cormorant Garamond at `1.05rem` weight 300 — the only place in the suite where Cormorant appears as body text — following a four-sentence pattern: current state, key driver, implication, board action.

Scenario tabs use the manila-folder pattern. The footer reads "Khaled Sanad · Portfolio" left and "Asterion Grid · Critical Minerals Traceability Expansion · FY26–FY28" right — a convention shared across all artefacts.

---

### Deployment Strategy Dashboard (`apps/deployment-strategy-dashboard.html`)

A transformation governance dashboard tracking delivery of a blockchain settlement programme across a global wealth fund. Six tabbed views use the manila-folder pattern: Overview, Timeline, Workstreams, Risks, Budget, and Readiness.

The Overview tab presents a deployment confidence gauge (canvas-drawn semicircle), a roadmap snapshot with a mini Gantt, a programme context summary, workstream progress bars, and upcoming gate milestones. The confidence score is displayed in Cormorant Garamond against an amber arc, with blue and green markers indicating the forecast landing and go-live target respectively.

The Timeline tab presents a full-year Gantt table with month-cell segments, diamond-shaped gate markers, RAG status chips, and percentage completion columns. Red diamonds mark board, audit, custody, or go-live gates.

The Workstreams tab uses expandable accordion rows, each revealing a description, milestone list, and workstream-level RAG. The Risks tab provides a filterable risk table with severity scoring, mitigation notes, and RAG chips. The Budget tab presents a workstream-by-workstream cost breakdown with variance indicators. The Readiness tab scores five readiness dimensions — Custody, Legal, Liquidity, Operations, and Technology — against a 10-point scale with current, forecast, and target values displayed as bullet charts.

---

### Decision Matrix (`apps/decision-matrix.html`)

A weighted-criteria evaluation tool for Asterion Grid's Phase 2 jurisdiction prioritisation, comparing AU-First, SG-First, and EU-First rollout options across six criteria: Regulatory Readiness (25%), Supplier Density (22%), Implementation Risk (18%), Strategic Value (15%), Political Risk (12%), and Time to Value (8%).

AU-First scores 76.4/100 and is the recommended option. SG-First is the recommended fallback if AU supplier commitments cannot be secured. EU-First carries the highest strategic value but the lowest Implementation Risk score due to pending evidence schema acceptance.

The recommendation is conditional on three Tier 1 mining supplier commitments, AUSTRAC evidence schema acceptance in writing, and a confirmed delivery plan — surfaced in a conditional approval strip beneath the recommendation. The radar chart is canvas-drawn with six axes; the recommended option is drawn last to ensure it sits on top of competing overlays. Criteria weights are editable; the matrix and radar chart recompute live.

The Decision Matrix is the design reference for the entire suite. Its token values, typography scale, and component conventions are the baseline from which all other artefacts are derived.

---

### Data Risk Assessment (`apps/data-risk-assessment.html`)

A structured risk identification and scoring framework covering six risk domains: evidence integrity, oracle input reliability, jurisdictional data residency, access governance, third-party risk, and remediation confidence. The overall risk score is 71 (amber), with five critical findings, 58% control coverage, and a 45-day remediation window.

The heatmap is a 5×5 likelihood-by-impact grid with colour coding by composite score: ≤6 green, ≤12 amber, ≤18 red, above 18 critical. Risk dots scoring ≥80 carry a blinking CSS animation to signal items requiring immediate escalation.

The six bullet charts implement the Stephen Few bullet chart model: a horizontal track with three background bands (danger, caution, acceptable), an exposure bar, and a vertical target marker at 80% control coverage. Each chart is expandable to reveal contributing sub-risks and recommended actions.

The most operationally consequential risk is supplier evidence quality failure: blockchain immutability means there is no correction path after anchoring. Pre-submission schema validation must run before anchoring, with a pass rate target of 88%. Oracle risk is structurally distinct — the blockchain guarantees tamper-evidence for what was anchored, not accuracy at submission. Supplier ERP systems, customs APIs, IoT sensors, and certification registries can all submit inaccurate data that becomes a permanent record.

The GDPR Article 17 right-to-erasure conflict with blockchain immutability is the most time-critical architectural decision surfaced in this artefact. The recommended architecture separates personal data off-chain in a deletable datastore and anchors only hashes and non-personal identifiers on-chain. This must be resolved as a pre-condition to EU go-live and cannot be retrofitted.

---

### Initiative Tracker (`apps/initiative-tracker.html`)

A portfolio constellation view of 12 programme initiatives across four workstreams: Platform & Engineering, Data & Governance, Regulatory, and Commercial. The constellation chart plots all initiatives on a "Supplier Coverage vs Implementation Strain" axis with dot size proportional to funding footprint, giving leadership an immediate spatial read of where effort is concentrated and where strain is highest.

Six filter pills — All, Critical, At Risk, On Track, Regulatory, and Funding Review — are the single control surface for the entire artefact. Each filter state drives a complete `render()` call that simultaneously updates five KPIs, changes the portfolio signal text, reorders the decision queue, recalculates workstream load bars, refilters the board tiles, refreshes the selected initiative detail panel, and redraws the constellation chart. No partial updates; a single render pass ensures all views are always consistent with the active filter state.

Each filter state has a corresponding signal array providing dominant pressure, most exposed workstream, funding posture, and executive move language — written to be read aloud in a leadership review without modification. The decision queue surfaces items awaiting direction, ordered by urgency within the active filter. The initiative board tiles are colour-coded by status and clickable; selecting a tile populates a detail panel with initiative description, owner, funding, dependency heat score, and recommended escalation action.

---

### Stakeholder Mapping Tool (`apps/stakeholder-mapping.html`)

An influence-interest mapping tool for stakeholder segmentation and engagement strategy planning. Stakeholders are plotted on a 2×2 grid — influence on the vertical axis, interest on the horizontal — and automatically assigned to one of four engagement postures: Manage Closely (high influence, high interest), Keep Satisfied (high influence, low interest), Keep Informed (low influence, high interest), and Monitor (low influence, low interest).

The tool allows stakeholders to be added, edited, and removed, with the grid and engagement summary updating live. Each quadrant carries a default engagement strategy, and individual stakeholders can have custom notes and communication frequency assigned. The output is a clean governance summary suitable for inclusion in a programme initiation document or steering committee pack.

---

### Business Case Builder (`apps/business-case-builder.html`)

A structured investment justification builder that guides users through the standard consulting business case structure: problem statement, strategic context, options analysis (including a do-nothing baseline), cost-benefit breakdown, risk register, and recommendation. Each section is completed in a step-by-step form interface; the builder outputs a clean executive summary view formatted for a one-page leadership briefing.

The accent colour references gold — the suite's CV accent — positioning this artefact as the bridge between strategic analysis and executive communication. The executive summary view uses the same `border-left: 3px solid var(--accent)` recommendation strip convention as the Forecasting Dashboard and Decision Matrix.

---

### Ledger (`apps/ledger.html`)

A structured knowledge platform covering blockchain, DeFi, stablecoins, real-world assets, custody, tokenisation, regulation, and the financial infrastructure being rebuilt on crypto rails. Entries are organised into conceptual categories and tagged for cross-referencing. Each entry follows a consistent structure: a plain-language definition, a mechanical explanation, a worked example or analogy, and a "sits at" note locating the concept within the broader stack.

The Ledger is the suite's outlier in one respect: it includes a light/dark theme toggle, implemented via a class on the `<html>` element. All colour tokens have both dark (default) and light variants defined in the `:root` and `html.light` blocks respectively. All other artefacts are dark-only. The light theme uses an off-white background (`#f0efea`) and adjusted ink and surface values that preserve the typographic hierarchy of the dark theme.

Google Fonts is loaded via a `<link>` tag in `<head>` consistent with the rest of the suite.

---

## Development conventions

- All development on feature branches, never directly on `main`
- Changes submitted via pull request
- Commit messages are descriptive and content-specific
- `git rebase -i` with `reword` is the correct tool for rewriting commit messages after the fact, followed by `git push --force-with-lease`
- Internal artefact navigation is class-toggling only — no `history.pushState`, no `location` changes, no `history.back()` calls inside any artefact
- No icons anywhere in the suite; `↗` is the only non-alphabetic navigation symbol
