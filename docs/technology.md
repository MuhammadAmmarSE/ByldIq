# Technology Explorer Platform (Milestone 6)

This document covers `apps/website/src/app/technology/` and everything it
composes: the `/technology` landing page, the shared eleven-technology
detail template, the Comparison Engine, the Decision Framework, and the
category/search routes — built as `apps/website/src/features/technology/*`,
per CLAUDE.md Part 22. It assumes `docs/architecture.md` (the general
layering contract) and `docs/solutions.md`/`docs/case-studies.md` (the
established feature-folder, sidebar/scrollspy, and AI/BuildPath-integration
conventions this milestone reuses) as background, and focuses on what's
specific to the Technology Explorer.

## Content scope: general engineering education, not "things Byld IQ has done"

Unlike Solutions and Case Studies — which describe Byld IQ's own
(fictional but realistic) capabilities and client work — the Technology
Explorer's job is to teach accurate, honest engineering decision-making.
A technology's content here isn't scoped to "has Byld IQ used this," it's
scoped to "is this true and useful." Related Solutions/Case Studies/
Article slugs are still cross-referenced against real data
(`technologies.test.ts`), but are genuinely allowed to be empty (see
below) rather than fabricating a connection that doesn't exist.

## Routes

| Route                             | Rendering                                         | Purpose                                                                                                  |
| --------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `/technology`                     | Static (SSG)                                      | Landing page: hero + search + category filtering + popular comparisons + decision framework link + grid. |
| `/technology/[slug]`              | Static (SSG via `generateStaticParams`, 11 slugs) | One shared template rendering a `Technology` record's full sixteen-section content.                      |
| `/technology/category/[category]` | Static (SSG, only `POPULATED_CATEGORIES`)         | `TechnologyExplorer` pre-seeded with a category filter, its own `<h1>` and meta description.             |
| `/technology/compare`             | Dynamic (reads `?a=`/`?b=`)                       | Side-by-side comparison of any two technologies — never a declared winner.                               |
| `/technology/decision-framework`  | Static (SSG)                                      | Two-question guided narrowing to real candidates (see "Decision Framework" below).                       |
| `/technology/search`              | Dynamic (reads `?q=`)                             | `TechnologyExplorer` pre-seeded with a search query — a deep-linkable results view, not a second UI.     |

## Component hierarchy

```
app/technology/page.tsx                        Server Component
├── BreadcrumbList JSON-LD
└── TechnologyExplorer                         client component, owns filter state
    ├── TechnologyHero                         search, quick category filter, AI entry
    ├── "Popular comparisons"                  links into ComparisonEngine with a pair preselected
    ├── "Not sure where to start?"             link into DecisionWizard
    └── TechnologyGrid (filtered)              reuses TechnologyCard

app/technology/category/[category]/page.tsx    Server Component
└── BreadcrumbList JSON-LD + <TechnologyExplorer initialCategoryFilter, headline, supportingCopy />

app/technology/search/page.tsx                 Server Component
└── <TechnologyExplorer initialQuery={q} />

app/technology/compare/page.tsx                Server Component
└── BreadcrumbList JSON-LD + <ComparisonEngine initialSlugA, initialSlugB />

app/technology/decision-framework/page.tsx     Server Component
└── BreadcrumbList JSON-LD + <DecisionWizard />

app/technology/[slug]/page.tsx                 Server Component
├── BreadcrumbList + FAQPage JSON-LD
├── TechnologyDetailHero               breadcrumb, h1, category/maturity/learning-curve, AI context, BuildPath CTA
├── (grid: sidebar + content, lg breakpoint)
│   ├── TechnologySidebar              sticky, useScrollSpy, desktop only
│   └── content column
│       ├── TechnologyBusinessValue    #business-problem/#why-organizations-adopt/#business-and-engineering-fit
│       ├── TechnologyStrengthsWeaknesses  #strengths/#weaknesses — equal visual weight
│       ├── TechnologyTradeOffExplorer #trade-off-explorer — quick facts + Best For/Avoid When/Alternatives tabs
│       ├── TechnologyArchitecture     #architecture — selectable request-flow diagram
│       ├── TechnologyDeepDive         #performance/#security/#accessibility/#scalability/#cost-analysis
│       ├── TechnologyRelatedSolutions #related-solutions — reuses SolutionCard, renders nothing if empty
│       ├── TechnologyRelatedCaseStudies #related-case-studies — reuses ProjectCard, renders nothing if empty
│       ├── TechnologyRelatedKnowledge #related-knowledge — reuses ArticleCard, renders nothing if empty
│       └── TechnologyFaqSection       #faq — Accordion
└── TechnologyFinalCta                 #get-started
```

Every component follows the standard per-component contract (CLAUDE.md
Part 27): `Name.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`,
`.docs.md`. Each component's own `.docs.md` is the source of truth for
that component's specific decisions; this file only covers what's
cross-cutting.

## Data model

One local, zod-validated content model — `data/technology.schema.ts` +
`data/technologies.ts` — covering: overview (maturity, learning curve,
typical projects), business value, strengths/weaknesses (min 3 each), the
Trade-Off Explorer (`bestFor`/`avoidWhen`/`alternatives`/`cost`/
`complexity`/`teamSize`/`scalability`), architecture nodes, five deep
narrative sections (performance/security/accessibility/scalability/cost —
richer than the trade-off's short scannable values, see the schema's doc
comment on why both exist), related content, and FAQs.
`data/technologies.test.ts` validates every record against the schema,
checks slug uniqueness, and cross-references `category` against
`TECHNOLOGY_CATEGORIES` and the related-content arrays against the real
Solutions/Case Studies/Knowledge data.

**Roster selection.** All 11 technologies (Next.js, Remix, PostgreSQL,
MongoDB, Supabase, Kubernetes, Terraform, Shopify Plus, OpenAI, LangChain,
React Native) were chosen because each is already named somewhere real on
the site — a Solution's technology list or a Case Study's technology
decision — rather than invented from a blank slate.

**Category taxonomy vs. real routes.** `data/categories.ts` declares the
full 20-category taxonomy from CLAUDE.md Part 22 for future extensibility,
but `data/facets.ts`'s `POPULATED_CATEGORIES` (only categories with ≥1
real technology) is what actually drives filter chips, category routes,
and `generateStaticParams` — an empty category page or filter option
would be the dead end CLAUDE.md Part 8 warns against.

## Trade-Off Explorer vs. Decision Framework

Both exist because they answer different questions, and neither
substitutes for the other:

- **Trade-Off Explorer** (`TechnologyTradeOffExplorer`, on each detail
  page): "is this technology right for _my_ situation?" — shown per
  technology, with real bestFor/avoidWhen/alternatives content.
- **Decision Framework** (`DecisionWizard`, its own route): "which
  technology should I even be looking at?" — a category-first narrowing
  tool for visitors who haven't picked a technology yet.

**Neither is a scoring algorithm.** The Decision Framework in particular
was designed around a specific risk: `bestFor`/`avoidWhen`/`teamSize` are
honest prose, not structured tags. A naive keyword match against that
prose is unsafe — e.g. Kubernetes's `teamSize` text says it's unsuited to
"very small teams" but still contains the word "small"; matching on
"small" would incorrectly recommend Kubernetes, contradicting the very
sentence matched. The Decision Framework narrows only by the one
genuinely structural field (`category`), then surfaces the technology's
own real narrative field for whichever concern the visitor picked
(Performance/Security/Accessibility/Scalability/Cost) — see
`DecisionWizard.docs.md` for the full reasoning.

## Comparison Engine

`ComparisonEngine` (`/technology/compare`) renders a real `<table>` —
dimensions as row headers, technologies as column headers — never
declaring a winner (CLAUDE.md Part 22: "No winner. Only recommendations.").
"Popular comparisons" only offers the two pairs the real dataset supports
well (Next.js vs Remix, both frontend frameworks; PostgreSQL vs MongoDB,
both databases); the two `Select` dropdowns still allow comparing any two
technologies. `?a=`/`?b=` make any comparison deep-linkable, falling back
to the default pair for an unknown or missing slug rather than 404ing —
the base route is meant to always render something, unlike a `[slug]`
route.

## State

- **`TechnologyExplorer`'s filter state** (query, category) is local
  `useState`, seeded from optional `initialQuery`/`initialCategoryFilter`
  props — this is what lets the category and search routes and
  `/technology` itself share one component.
- **`ComparisonEngine`'s selected pair** and **`DecisionWizard`'s
  category/concern answers** are local `useState`, seeded from
  `initialSlugA`/`initialSlugB` props for the former.
- **`useAiCompanionStore`'s `pageContext`** — set by `TechnologyDetailHero`
  on mount to the technology's plain `name` (unlike Case Studies' noun
  phrase, since "Looks like you're exploring Next.js." reads naturally as
  a direct technology name) and cleared on unmount.
- **`useScrollSpy`** drives `TechnologySidebar`, identical to
  `SolutionSidebar`/`CaseStudySidebar`.
- Everything else (which trade-off tab is active, which architecture node
  or FAQ item is selected) is local `useState`, per `docs/architecture.md`.

## AI Companion + BuildPath integration

Same pattern as Solutions and Case Studies (`docs/solutions.md`,
`docs/case-studies.md`):

- **AI page context** via `TechnologyDetailHero`, described above.
- **BuildPath prefill.** `/buildpath` now also reads `?technology={slug}`
  alongside its existing `?solution=`/`?caseStudy=` handling, and honestly
  acknowledges the referring technology with one real reason it's often
  chosen (`technology.tradeOff.bestFor[0]`) — rather than prefilling a
  questionnaire that doesn't exist yet. `TechnologyDetailHero` and
  `TechnologyFinalCta` both link there.

## Analytics

Declared in `features/technology/analytics.ts`: `technology_viewed`,
`technology_search`, `technology_category_selected`,
`technology_card_clicked`, `technology_comparison_viewed`,
`technology_architecture_node_selected`, `technology_trade_off_expanded`,
`decision_wizard_answered`, `decision_wizard_completed`,
`technology_faq_expanded`, `technology_solution_clicked`,
`technology_case_study_clicked`, `technology_article_clicked`,
`technology_cta_selected`, `technology_buildpath_started` — all fifteen
verified to actually fire somewhere in the feature during this milestone's
review, no gaps found.

## SEO

- `generateMetadata`/`metadata` on every route sets `title`, `description`,
  `alternates.canonical`, `openGraph`, and `twitter` (CLAUDE.md Part 26's
  full metadata list) — except `/technology/search`, which skips
  OpenGraph/Twitter and canonicalizes to the bare path, same reasoning as
  `/work/search`.
- `/technology/[slug]` renders `BreadcrumbList` + `FAQPage` (generated
  from the same `faqs` data the page visibly renders as an accordion).
  The landing page, category routes, and `/technology/compare`/
  `/technology/decision-framework` render `BreadcrumbList` only.
- `sitemap.ts` lists `/technology`, all 11 `/technology/[slug]` routes,
  all 8 `/technology/category/[category]` routes, `/technology/compare`,
  and `/technology/decision-framework`. `/technology/search` is
  deliberately excluded.

## Accessibility

- **Radix `Tabs`** drives `TechnologyTradeOffExplorer`; **Radix
  `Accordion`** drives `TechnologyFaqSection`; the shared
  selectable-pipeline pattern (from Solutions/Case Studies) drives
  `TechnologyArchitecture` — chosen per section based on whether the
  content is mutually exclusive views (tabs) or one-at-a-time disclosure
  (accordion) or selection among alternatives (pipeline).
- **A real bug caught during this review:** `/technology/compare` and
  `/technology/decision-framework` each render only an `h2` as their
  top heading, assuming (incorrectly) that some other component on the
  page would own the `<h1>` — but neither route composes a hero component
  that does. `e2e/technology.spec.ts`'s axe scans caught this
  (`page-has-heading-one`, moderate impact) on both routes; fixed by
  promoting `ComparisonEngine`'s and `DecisionWizard`'s top heading to
  `variant="display"` (which renders as `<h1>`) and shifting their
  internal subheading levels down by one to keep the hierarchy correct.
- **Verified, not assumed.** `e2e/technology.spec.ts` runs a full
  `@axe-core/playwright` scan against the landing page, a representative
  detail page, `/technology/compare`, and `/technology/decision-framework`
  (zero violations after the fix above), in addition to the per-component
  Storybook a11y gate every component passes in isolation.

## Navigation

The Technology mega menu (all 11 technologies, by name) is assembled in
`app/layout.tsx` next to the Solutions and Work mega menus, for the same
reason (`config/site.ts`, read by the Shared-layer `PageShell`, must not
depend on feature data).

`TechnologySidebar`'s sixteen section links are a fixed, hand-authored
list rather than derived from `Technology` data — the section structure
doesn't vary by technology (CLAUDE.md Part 22: every technology page
shares the same architecture), only the content within each section does.
Related-content links are included even for technologies where that
section renders nothing (deriving a per-technology sidebar just to hide a
link isn't worth the complexity). `get-started` (the final CTA) is
excluded from the list since it renders full-width outside the sidebar
grid.

## Scope boundaries

Honest gaps, documented rather than silently shipped:

| What the spec asks for                                                                           | What's actually built                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Decision Framework questions: team size, budget, timeline, traffic, compliance, SEO, offline, AI | Reduced to two structurally-answerable questions (what you're building, what matters most) rather than all eight — the omitted concerns have no structured per-technology data to narrow by honestly; see the Trade-Off Explorer/Decision Framework section above. |
| An "Architecture Explorer" landing-page link, separate from per-technology architecture          | Not built — `/technology/architecture` doesn't exist as a standalone route; each technology's own `#architecture` section already covers this, and a second global explorer would need a cross-technology architecture model that doesn't exist yet.               |
| Real third-party technology logos                                                                | Not used — no logo assets exist for any of the 11 technologies (confirmed via repo-wide search), and CLAUDE.md Part 28 forbids fabricating brand assets. Category badges and text stand in.                                                                        |
| Related Solutions/Case Studies/Articles for every technology                                     | Genuinely absent for some (MongoDB has none of the three; Remix has no related case study) — left empty rather than fabricated, per this platform's content-scope decision above.                                                                                  |
| A 404 status code for an unknown `/technology/[slug]` or category slug                           | Renders the correct not-found UI but returns HTTP 200 — the same pre-existing Next.js 15 behavior documented in `docs/solutions.md`, reproduced identically here.                                                                                                  |

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract, plus `data/technologies.test.ts`,
  `data/categories.test.ts`, and `data/facets.test.ts`.
- **Storybook a11y** (`vitest --project=storybook`): every component's
  stories pass the same axe gate as every design-system primitive,
  homepage module, Solutions, and Case Studies component.
- **E2E** (`e2e/technology.spec.ts`, Playwright): the landing page's grid,
  search, and quick-filter interaction; the full detail-page template
  rendering; trade-off tab switching and architecture node selection; FAQ
  expansion; sidebar scrollspy; the BuildPath/AI Companion integrations;
  the Comparison Engine (default pair, popular comparisons, deep-linking);
  the Decision Framework; the category and search routes; the mega menu;
  unknown-slug fallbacks; and full-page axe scans on the landing page, a
  detail page, the compare page, and the decision-framework page.
