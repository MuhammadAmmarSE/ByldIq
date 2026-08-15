# Solutions Platform (Milestone 4, extended by Milestone 10)

This document covers `apps/website/src/app/solutions/` and everything it
composes: the Solutions landing page and the shared twelve-solution page
template, built as `apps/website/src/features/solutions/*`, per CLAUDE.md
Part 20. It assumes `docs/architecture.md` (the general layering
contract) and `docs/homepage.md` (the established feature-folder and
testing conventions this milestone reuses) as background, and focuses on
what's specific to Solutions.

Milestone 4 shipped the original nine-solution platform. Milestone 10
("Services Ecosystem") extended it rather than building a parallel
`/services` route — see "Milestone 10 — Services Ecosystem extension"
near the end of this document for why, and for what each of its seven
phases added. Facts above that section (routes, hierarchy, data model)
already reflect the current, post-Milestone-10 state.

## Routes

| Route                            | Rendering                                             | Purpose                                                                                                                   |
| -------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `/solutions`                     | Static (SSG)                                          | Landing page: adaptive hero, twelve-card Solution Selector, AI Advisor, Industries, Engagement Models, comparison engine. |
| `/solutions/[slug]`              | Static (SSG via `generateStaticParams`, all 12 slugs) | One shared template rendering a `Solution` record's full content.                                                         |
| `/solutions/industry/[industry]` | Static (SSG via `generateStaticParams`, all 10 slugs) | One shared template rendering an `Industry` record (Milestone 10 phase 3).                                                |

## Component hierarchy

```
app/solutions/page.tsx                     Server Component
├── BreadcrumbList JSON-LD
├── SolutionsHero                          journey-aware, useJourneyContent
├── SolutionSelector                       grid of 12 SolutionCard, keyboard nav
├── SolutionsAiAdvisor                     M10 phase 6 — real Byld exchange preview
├── IndustriesSection                      M10 phase 3 — grid of 10 industry cards
├── EngagementModelsSection                M10 phase 4 — accordion of 5 models
└── SolutionComparisonEngine               M10 phase 5 — side-by-side solution table

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
│       ├── EngagementSnapshot             #engagement-snapshot — M10 phase 1 (timeline/team/investment)
│       ├── SuccessMetrics                 #success-metrics — static stat grid
│       ├── RelatedCaseStudies             #related-case-studies — reuses ProjectCard
│       ├── RelatedKnowledge               #related-knowledge — reuses ArticleCard
│       └── SolutionFaqSection             #faq — Accordion
└── SolutionFinalCta                       #get-started — BuildPath / Book Discovery (M10 phase 7) / Talk to Byld

app/solutions/industry/[industry]/page.tsx  Server Component — M10 phase 3
├── BreadcrumbList JSON-LD
└── IndustryDetail                          challenges, recommended SolutionCards,
                                             example ProjectCards or honest empty state,
                                             sets AI pageContext on mount
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
map, not a derived lookup — 5 of the 12 solutions map 1:1 onto a homepage
journey; the rest don't have a canonical journey, so mapping would either
be arbitrary or require expanding the 5-journey model. The map is a
deliberate editorial choice, not a gap.

Milestone 10 added two more local, zod-validated content models,
following the exact same pattern:

- **`data/industry.schema.ts` + `data/industries.ts`** — 10 industries.
  `exampleCaseStudySlugs` has no `min()` constraint and is deliberately
  empty for 6 of the 10 (Healthcare, FinTech, Manufacturing, Education,
  and others) — there is no real case study to point to yet, and
  inventing one to fill every slot would violate CLAUDE.md's honesty
  principle. `IndustryDetail` renders an explicit empty state for those
  instead of hiding the section. `industries.test.ts` asserts at least
  one industry has an empty array, so a future "helpful" fabrication
  would fail the suite, not just slip through review.
- **`data/engagement-model.schema.ts` + `data/engagement-models.ts`** — 5
  models (Fixed-Scope, Agile Team, Dedicated Team, Staff Augmentation,
  Product Partnership). `relatedSolutionSlug` is optional and only set on
  Dedicated Team, which links to the `dedicated-teams` solution page —
  the other four engagement models don't have a single corresponding
  solution, so the field is left unset rather than pointed at an
  arbitrary one.

`Solution` itself also gained three fields in Milestone 10 phase 1 —
`deliveryTimeline`, `teamComposition`, and `investmentGuidance` — the
last of which is always qualitative prose, never a dollar figure or
range. CLAUDE.md Part 7 explicitly rejects fabricated numbers, and a
real number would require a real quoting process this codebase doesn't
have; every solution's `investmentGuidance` instead explains the shape of
the investment and points to BuildPath for a scoped answer.

## State

- **`useAppStore`'s `journey`** drives `SolutionsHero`'s adaptive copy
  and `SolutionSelector`'s "Recommended for you" badge — the same
  `useJourneyContent` pattern as the homepage.
- **`useAiCompanionStore`'s `pageContext`** (new in Milestone 4) is set
  by `SolutionHero` on mount and cleared on unmount, separate from
  `journey` — see "AI Companion + BuildPath integration," below.
  Milestone 10 phase 6 applied the identical pattern to `IndustryDetail`,
  prefixing the slug (`industry-{slug}`) so an industry page's context
  can never collide with a solution page's context sharing the same
  underlying string (e.g. the "enterprise" solution vs. the "enterprise"
  industry).
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
- `sitemap.ts` lists `/solutions`, all twelve `/solutions/[slug]` routes,
  and (Milestone 10) all ten `/solutions/industry/[industry]` routes.

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
Solutions mega menu (all twelve solutions) is assembled in `app/layout.tsx`
instead, since it needs `SOLUTIONS` feature data and `config/site.ts` is
a dependency `PageShell` (a Shared-layer component) reads — Shared must
not depend on Features (CLAUDE.md Part 27). `PageShell` now takes
`navItems` as a prop rather than reading `config/site` internally.

`SolutionSidebar`'s eleven section links are a fixed, hand-authored list
rather than derived from `Solution` data, since the section structure
itself doesn't vary by solution (Part 20: "all pages must share the same
architecture") — only the content within each section does.

## Milestone 10 — Services Ecosystem extension

Milestone 10's brief was a full "Services Ecosystem" IA: twelve service
categories, a technology matrix, industries, engagement models, an
interactive comparison, deeper AI integration, and a final CTA — largely
describing surface area the Solutions platform (Milestone 4) already
covered. Presented with that overlap, the choice was between building a
parallel `/services` route duplicating most of `/solutions`, or treating
the brief as a punch list of genuine gaps to close on the existing
platform. The latter was chosen — no `/services` route exists, and
nothing here duplicates a `/solutions/[slug]` page under a different URL.

Seven phases closed the gaps that were real:

1. **Schema extension.** `deliveryTimeline`, `teamComposition`, and
   `investmentGuidance` added to every existing solution (see "Data
   model," above) via `EngagementSnapshot`.
2. **Three new solutions.** SaaS Development, Mobile Development
   (journey: `startup`), and Dedicated Teams (journey: `enterprise`) —
   real, full solution pages, bringing the total from 9 to 12.
3. **Industries section + `/solutions/industry/[industry]`.** 10
   industries, each with challenges, recommended solutions, and — where a
   real one exists — example case studies (4 of 10; the other 6 render an
   honest empty state rather than a fabricated project).
4. **Engagement Models section.** 5 models as an accordion on the
   landing page, cross-linking to the one solution (Dedicated Teams) that
   has a direct match.
5. **Solution comparison engine.** A side-by-side table across 4 curated
   pairs of real solutions (`SolutionComparisonEngine`), replacing the
   spec's example "AI Automation vs. Manual Workflow" — the second side
   of that pairing isn't a solution this codebase has, so it isn't one of
   the four.
6. **Deeper AI integration.** `SolutionsAiAdvisor` (landing page) shows a
   real Byld exchange rather than fabricated demo copy — the greeting
   plus reply are read from the actual `GREETINGS`/`RESPONSES` data the
   floating companion itself uses. `IndustryDetail` also gained page-context
   awareness (see "State," above).
7. **Final CTA audit.** `SolutionFinalCta` gained a "Book Discovery"
   button (reusing the homepage Conversion Experience's real
   `CalendarPreview`) alongside the existing BuildPath and Talk to Byld
   paths. The spec's fourth path, "Contact Sales," was deliberately not
   added — CLAUDE.md Part 16 states Byld AI is explicitly not a sales
   channel, and "Book Discovery" already is this site's real
   human-conversation path in that voice; a differently-labeled button to
   the same outcome would be redundant, not a fourth option.

### A collision this extension surfaced (and how it was fixed)

Adding the Industries section (phase 3) put a card labeled "Enterprise"
(the _industry_) on the same landing page as the "Enterprise" _solution_
card from `SolutionSelector` — both legitimate, both correctly named,
now sharing a page. `e2e/solutions.spec.ts`'s heading lookup wasn't
scoped, so it broke under Playwright's strict-mode duplicate-match rule
once both existed. The fix was scoping the test's locator to
`SolutionSelector`'s `role="list"` landmark (`aria-label="Explore
solutions by business need"`) rather than renaming either card to
something less accurate — the same "fix the test's precision, not the
content" approach used for the Milestone 9 mega-menu collision.

### AI Companion mock fragility, fixed defensively

Adding `SolutionsAiAdvisor` to the widely-imported `@/features/solutions`
barrel broke two unrelated test files (`WorkExplorer.test.tsx`,
`KnowledgeExplorer.test.tsx`) that partially mock
`@/features/homepage/ai-companion` (only `useAiCompanion`, no
`GREETINGS`/`RESPONSES`). The cause: `SolutionsAiAdvisor` originally read
`GREETINGS`/`RESPONSES` properties at module scope, which evaluates at
import time — before any test gets a chance to render anything. Moved
inside the component body (deferred to render time) in both
`SolutionsAiAdvisor` and, defensively, the homepage's
`AiCompanionHighlight` (Milestone 9), which had the identical latent
fragility even though nothing had yet imported it into a module graph
that would trigger it.

## Scope boundaries

Honest gaps, documented rather than silently shipped:

| What the spec asks for                                                | What's actually built                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Related case studies" per capability (Part 20)                       | Not implemented at that granularity — only 5 fictional case studies exist; fabricating a specific pairing per capability would manufacture relevance that isn't real. Solution-wide `RelatedCaseStudies` covers this honestly instead.                                                      |
| Delivery Process content "per solution"                               | `DeliveryFramework`'s nine stages are shared across all solutions (`data/delivery-stages.ts`) — the process doesn't actually differ by industry; nine distinct-but-equivalent versions would be padding.                                                                                    |
| BuildPath "automatically remembers... solution selected" (Part 20)    | `/buildpath` has no live questionnaire to prefill (out of scope this milestone) — the query param is read and acknowledged honestly instead of faking a prefilled form.                                                                                                                     |
| Full CLAUDE.md Part 8 nav (Work, Process, Technology, About, Contact) | `Knowledge`, `BuildPath`, `Solutions`, and (as of Milestone 5) `Work` are real — Process, Technology, and About/Contact still have no pages.                                                                                                                                                |
| A 404 status code for an unknown `/solutions/[slug]`                  | Renders the correct not-found UI but returns HTTP 200 — a pre-existing Next.js 15 behavior for statically-generated `[slug]` routes calling `notFound()`, reproduced identically on `/work/[slug]` (formerly `/case-studies/[slug]`). Framework-level, not a Solutions-specific regression. |
| M10's "Contact Sales" final CTA                                       | Not added as a separate button — CLAUDE.md Part 16 rules out sales framing for Byld AI, and "Book Discovery" already is the real human-conversation path in that voice. See "Milestone 10" above.                                                                                           |
| M10's "AI Automation vs. Manual Workflow" example comparison          | Not one of `SolutionComparisonEngine`'s 4 pairs — "Manual Workflow" isn't a solution this codebase has, and inventing one to match the spec's example would fabricate a product that doesn't exist. All 4 pairs compare real solutions.                                                     |
| M10's example case study per industry                                 | Only 4 of 10 industries have a real, relevant case study to point to; the other 6 render an honest empty state instead of a fabricated project.                                                                                                                                             |
| M10's dollar-figure investment ranges                                 | `investmentGuidance` is always qualitative prose pointing to BuildPath for a scoped number — no dollar figure exists anywhere in this codebase for a solution's cost, because no real quoting process produced one.                                                                         |

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract. Milestone 10 added test files for every new
  component (`IndustriesSection`, `IndustryDetail`, `EngagementSnapshot`,
  `EngagementModelsSection`, `SolutionComparisonEngine`,
  `SolutionsAiAdvisor`) plus `data/industries.test.ts` and
  `data/engagement-models.test.ts`, each validating schema conformance,
  slug uniqueness, the exact expected slug set, and that every
  cross-reference (`recommendedSolutionSlugs`, `exampleCaseStudySlugs`,
  `relatedSolutionSlug`) points to real, existing data.
- **Storybook a11y** (`vitest --project=storybook`): every component's
  stories pass the same axe gate as every design-system primitive and
  homepage module.
- **E2E** (`e2e/solutions.spec.ts`, Playwright): the landing page's card
  grid and navigation, the full detail-page template rendering, capability
  expansion, architecture node selection, sidebar scrollspy, the
  BuildPath/AI Companion integrations, the mega menu, an unknown-slug
  fallback, and full-page axe scans on both routes. The landing-page card
  lookup is scoped to `SolutionSelector`'s list landmark (see "A
  collision this extension surfaced," above).
