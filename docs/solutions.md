# Solutions Platform (Milestone 4)

This document covers `apps/website/src/app/solutions/` and everything it
composes: the Solutions landing page and the shared nine-solution page
template, built as `apps/website/src/features/solutions/*`, per CLAUDE.md
Part 20. It assumes `docs/architecture.md` (the general layering
contract) and `docs/homepage.md` (the established feature-folder and
testing conventions this milestone reuses) as background, and focuses on
what's specific to Solutions.

## Routes

| Route               | Rendering                                            | Purpose                                                           |
| ------------------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| `/solutions`        | Static (SSG)                                         | Landing page: adaptive hero + the nine-card Solution Selector.    |
| `/solutions/[slug]` | Static (SSG via `generateStaticParams`, all 9 slugs) | One shared template rendering a `Solution` record's full content. |

## Component hierarchy

```
app/solutions/page.tsx                     Server Component
├── BreadcrumbList JSON-LD
├── SolutionsHero                          journey-aware, useJourneyContent
└── SolutionSelector                       grid of 9 SolutionCard, keyboard nav

app/solutions/[slug]/page.tsx              Server Component
├── BreadcrumbList + FAQPage JSON-LD
├── SolutionHero                           breadcrumb, h1, primary/secondary CTA
├── (grid: sidebar + content, lg breakpoint)
│   ├── SolutionSidebar                    sticky, useScrollSpy, desktop only
│   └── content column
│       ├── SolutionOverview               #business-problem/#business-outcomes/#engineering-philosophy
│       ├── CapabilityExplorer             #capabilities — Accordion
│       ├── ArchitectureExplorer           #architecture — selectable pipeline
│       ├── TechnologyExplorer             #technology — Accordion
│       ├── DeliveryFramework              #delivery — selectable pipeline (shared content)
│       ├── SuccessMetrics                 #success-metrics — static stat grid
│       ├── RelatedCaseStudies             #related-case-studies — reuses ProjectCard
│       ├── RelatedKnowledge               #related-knowledge — reuses ArticleCard
│       └── SolutionFaqSection             #faq — Accordion
└── SolutionFinalCta                       #get-started
```

Every component follows the standard per-component contract (CLAUDE.md
Part 27): `Name.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`,
`.docs.md`. Each component's own `.docs.md` is the source of truth for
that component's specific decisions (especially its scope notes); this
file only covers what's cross-cutting.

## Data model

One local, zod-validated content model drives everything —
`data/solution.schema.ts` + `data/solutions.ts`, the same "local typed
data now, content-collections later" approach as the homepage's case
studies and knowledge articles. `solutions.test.ts` validates every
record against the schema, checks slug/id uniqueness, and — importantly
— cross-references `relatedCaseStudySlugs`/`relatedArticleSlugs` against
the real case study and knowledge article data, so a broken reference
fails the test suite rather than silently 404ing in production.

`getRecommendedSolution(journey)` is an explicit `Record<Journey, string>`
map, not a derived lookup — 5 of the 9 solutions map 1:1 onto a homepage
journey; the other 4 (Cloud & Infrastructure, Automation, Product Design,
Custom Engineering) don't have a canonical journey, so mapping would
either be arbitrary or require expanding the 5-journey model. The map is
a deliberate editorial choice, not a gap.

## State

- **`useAppStore`'s `journey`** drives `SolutionsHero`'s adaptive copy
  and `SolutionSelector`'s "Recommended for you" badge — the same
  `useJourneyContent` pattern as the homepage.
- **`useAiCompanionStore`'s `pageContext`** (new in this milestone) is
  set by `SolutionHero` on mount and cleared on unmount, separate from
  `journey` — see "AI Companion + BuildPath integration," below.
- **`useScrollSpy`** (`src/hooks/useScrollSpy.ts`, new, generic) drives
  `SolutionSidebar`'s active-section highlight — a single
  `IntersectionObserver` watching all eleven section ids, reporting
  whichever is topmost in view.
- Everything else (which accordion item is open, which architecture node
  is selected) is local `useState`, per `docs/architecture.md`.

## AI Companion + BuildPath integration

Two small, deliberately separate extensions to existing homepage
infrastructure rather than new systems:

- **AI page context.** `ai-companion-store.ts` gained a `pageContext:
{ label, slug } | null` field, distinct from `journey`. `SolutionHero`
  sets it on mount so opening Byld from a solution page greets with that
  solution by name (`getPageContextGreeting`) — without silently
  overwriting the visitor's own journey choice, which stays an explicit
  action made elsewhere (Journey Selection Engine). Cleared on unmount so
  leaving the page falls back to the journey-based greeting.
- **BuildPath prefill.** `/buildpath` is still a "coming soon" placeholder
  (the full 11-stage wizard is out of scope for this milestone) — solution
  pages link to `/buildpath?solution={slug}`, and the placeholder page
  reads the param to honestly acknowledge the referring solution
  ("Continuing from {title}") rather than prefilling a questionnaire that
  doesn't exist yet.

## SEO

- `generateMetadata` on both routes sets `title`, `description`,
  `alternates.canonical`, `openGraph`, and `twitter` (CLAUDE.md Part 26's
  full metadata list).
- `lib/json-ld.ts` gained `breadcrumbJsonLd` and `faqPageJsonLd` (only
  `organizationJsonLd` existed before). Both solution routes render
  `BreadcrumbList`; `/solutions/[slug]` also renders `FAQPage` — generated
  from the same `faqs` data the page visibly renders as an accordion,
  never for unrendered content.
- `sitemap.ts` lists `/solutions` and all nine `/solutions/[slug]` routes.

## Accessibility

- **Radix `Accordion` and a shared selectable-pipeline pattern** (used by
  `CapabilityExplorer`, `TechnologyExplorer`, `SolutionFaqSection`, and
  `ArchitectureExplorer`/`DeliveryFramework` respectively) provide
  consistent keyboard/ARIA behavior across all four interactive
  "Explorer" sections, rather than four bespoke interaction patterns.
- **Bug found and fixed during this milestone:** `MegaMenu`'s Radix
  `Popover.Content` renders with `role="dialog"` but had no accessible
  name. Never caught before because `config/site.ts`'s `primaryNav` was
  empty until this milestone populated it with a real Solutions dropdown
  — `MegaMenu` had never been exercised with real content in a live axe
  scan. Fixed with `aria-label={`${item.label} menu`}`, with a regression
  test.
- **Verified, not assumed.** `e2e/solutions.spec.ts` runs a full
  `@axe-core/playwright` scan against both the landing page and a
  representative detail page (zero violations), in addition to the
  per-component Storybook a11y gate every component already passes in
  isolation, plus a live axe scan taken after every phase against the
  actual composed page with the phase's new interactive elements
  exercised (expanded, selected) — not just the default collapsed state.

## Navigation

`config/site.ts`'s `primaryNav` now lists only routes that actually exist
(`Knowledge`, `BuildPath`) — CLAUDE.md Part 8's full nav also names Work,
Process, Technology, About, and Contact, but those pages don't exist yet
and would be dead links ("No page should ever become a dead end"). The
Solutions mega menu (all nine solutions) is assembled in `app/layout.tsx`
instead, since it needs `SOLUTIONS` feature data and `config/site.ts` is
a dependency `PageShell` (a Shared-layer component) reads — Shared must
not depend on Features (CLAUDE.md Part 27). `PageShell` now takes
`navItems` as a prop rather than reading `config/site` internally.

`SolutionSidebar`'s eleven section links are a fixed, hand-authored list
rather than derived from `Solution` data, since the section structure
itself doesn't vary by solution (Part 20: "all pages must share the same
architecture") — only the content within each section does.

## Scope boundaries

Honest gaps, documented rather than silently shipped:

| What the spec asks for                                                | What's actually built                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Related case studies" per capability (Part 20)                       | Not implemented at that granularity — only 5 fictional case studies exist; fabricating a specific pairing per capability would manufacture relevance that isn't real. Solution-wide `RelatedCaseStudies` covers this honestly instead.                                                      |
| Delivery Process content "per solution"                               | `DeliveryFramework`'s nine stages are shared across all solutions (`data/delivery-stages.ts`) — the process doesn't actually differ by industry; nine distinct-but-equivalent versions would be padding.                                                                                    |
| BuildPath "automatically remembers... solution selected" (Part 20)    | `/buildpath` has no live questionnaire to prefill (out of scope this milestone) — the query param is read and acknowledged honestly instead of faking a prefilled form.                                                                                                                     |
| Full CLAUDE.md Part 8 nav (Work, Process, Technology, About, Contact) | `Knowledge`, `BuildPath`, `Solutions`, and (as of Milestone 5) `Work` are real — Process, Technology, and About/Contact still have no pages.                                                                                                                                                |
| A 404 status code for an unknown `/solutions/[slug]`                  | Renders the correct not-found UI but returns HTTP 200 — a pre-existing Next.js 15 behavior for statically-generated `[slug]` routes calling `notFound()`, reproduced identically on `/work/[slug]` (formerly `/case-studies/[slug]`). Framework-level, not a Solutions-specific regression. |

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract — 20 component test files plus
  `data/solutions.test.ts`, `useScrollSpy.test.tsx`, and
  `lib/json-ld.test.ts`.
- **Storybook a11y** (`vitest --project=storybook`): every component's
  stories pass the same axe gate as every design-system primitive and
  homepage module.
- **E2E** (`e2e/solutions.spec.ts`, Playwright): the landing page's card
  grid and navigation, the full detail-page template rendering, capability
  expansion, architecture node selection, sidebar scrollspy, the
  BuildPath/AI Companion integrations, the mega menu, an unknown-slug
  fallback, and full-page axe scans on both routes.
