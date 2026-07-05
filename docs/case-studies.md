# Case Studies Platform (Milestone 5)

This document covers `apps/website/src/app/work/` and everything it
composes: the `/work` landing page, the shared five-case-study detail
template, and the industry/technology/business-problem/search facet
routes — built as `apps/website/src/features/case-studies/*`, per
CLAUDE.md Part 21. It assumes `docs/architecture.md` (the general
layering contract) and `docs/solutions.md` (the established
feature-folder, sidebar/scrollspy, and AI/BuildPath-integration
conventions this milestone reuses) as background, and focuses on what's
specific to Case Studies.

## Routes

| Route                              | Rendering                                             | Purpose                                                                                        |
| ---------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `/work`                            | Static (SSG)                                          | Landing page: adaptive hero + search + multi-facet filtering + project grid.                   |
| `/work/[slug]`                     | Static (SSG via `generateStaticParams`, all 5 slugs)  | One shared template rendering a `CaseStudy` record's full fourteen-section content.            |
| `/work/industry/[industry]`        | Static (SSG, all industry slugs used by real stories) | `WorkExplorer` pre-seeded with an industry filter, its own `<h1>` and meta description.        |
| `/work/technology/[technology]`    | Static (SSG, all technology slugs used)               | Same, pre-seeded with a technology filter.                                                     |
| `/work/business-problem/[problem]` | Static (SSG, all 5 business-problem slugs)            | Same, pre-seeded with a business-problem filter.                                               |
| `/work/search`                     | Dynamic (reads `?q=`)                                 | `WorkExplorer` pre-seeded with a search query — a deep-linkable results view, not a second UI. |

`/case-studies/:slug` permanently redirects to `/work/:slug`
(`next.config.ts`) — the platform was renamed to match CLAUDE.md Part
21's required routes rather than duplicating content at two URLs.

## Component hierarchy

```
app/work/page.tsx                          Server Component
├── BreadcrumbList JSON-LD
└── WorkExplorer                           client component, owns all filter state
    ├── WorkHero                           search, quick industry filter, AI entry, featured pointer
    ├── ProjectGrid (Featured)             reuses the Proof Engine's ProjectGrid/ProjectCard
    ├── WorkFilterBar                      industry/technology/business-problem/AI-only Selects
    └── ProjectGrid (All, filtered)

app/work/industry/[industry]/page.tsx      Server Component
app/work/technology/[technology]/page.tsx  Server Component
app/work/business-problem/[problem]/page.tsx Server Component
└── each: BreadcrumbList JSON-LD + <WorkExplorer initial*Filter, headline, supportingCopy />

app/work/search/page.tsx                   Server Component
└── <WorkExplorer initialQuery={q} />

app/work/[slug]/page.tsx                   Server Component
├── BreadcrumbList + Article + FAQPage JSON-LD
├── CaseStudyHero                          breadcrumb, h1, key facts, AI context, BuildPath CTA
├── (grid: sidebar + content, lg breakpoint)
│   ├── CaseStudySidebar                   sticky, useScrollSpy, desktop only
│   └── content column
│       ├── CaseStudyOverview              #executive-summary/#business-challenge
│       ├── CaseStudyDiscovery             #discovery — card grid
│       ├── CaseStudyProductThinking       #product-thinking — decisions + rejected ideas
│       ├── CaseStudyArchitecture          #architecture — selectable pipeline
│       ├── CaseStudyTechnologyDecisions   #technology-decisions — Accordion
│       ├── CaseStudyEngineeringProcess    #engineering-process — Accordion
│       ├── CaseStudyChallenges            #challenges — issue/resolution cards
│       ├── CaseStudyResults               #results — approach/outcome/metrics
│       ├── CaseStudyLessonsLearned        #lessons-learned — three-column lists
│       ├── CaseStudyRelatedSolutions      #related-solutions — reuses SolutionCard
│       ├── CaseStudyRelatedKnowledge      #related-knowledge — reuses ArticleCard
│       └── CaseStudyFaqSection            #faq — Accordion
└── CaseStudyFinalCta                      #get-started
```

Every component follows the standard per-component contract (CLAUDE.md
Part 27): `Name.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`,
`.docs.md`. Each component's own `.docs.md` is the source of truth for
that component's specific decisions; this file only covers what's
cross-cutting.

## Data model

One local, zod-validated content model — `data/case-study.schema.ts` +
`data/case-studies.ts` — covering the full fourteen-section structure
(executive summary through FAQs) for the same five fictional companies
introduced in Milestone 3, deepened rather than replaced with new
projects. `data/case-studies.test.ts` validates every record against the
schema, checks slug/id uniqueness, and cross-references
`relatedSolutionSlugs`/`relatedArticleSlugs` against the real Solutions
and Knowledge data.

**Data ownership moved in this milestone.** `CASE_STUDIES` and
`FICTIONAL_COMPANIES` previously lived under the homepage's Proof Engine
(the first consumer, from Milestone 3). Once a third consumer appeared —
this platform, alongside the homepage's Proof Engine and the Solutions
Platform's `RelatedCaseStudies` — the data moved to
`features/case-studies/data/`, its own dedicated owner, rather than
leaving one consumer as the de facto source of truth for data it doesn't
conceptually own (the same promotion CLAUDE.md Part 27 describes for
components: "promote only after multiple real use cases").

`data/facets.ts` derives `INDUSTRIES` and `TECHNOLOGIES` (slug/label
pairs) from `CASE_STUDIES` once, shared by `WorkExplorer` and the
industry/technology route's `generateStaticParams` — computed in one
place instead of duplicated three times. `BUSINESS_PROBLEMS` is a small,
hand-authored list (not derived) since it's a fixed taxonomy, not
something that grows automatically with the data.

## State

- **`WorkExplorer`'s filter state** (query, industry, technology,
  business-problem, AI-only) is local `useState`, seeded from optional
  `initialQuery`/`initial*Filter` props — this is what lets the four
  facet routes and `/work` itself share one component instead of four.
- **`useAiCompanionStore`'s `pageContext`** — the same field the
  Solutions Platform introduced — is set by `CaseStudyHero` on mount to
  `the {company.name} case study` (a noun phrase, not the full-sentence
  headline, since it completes `getPageContextGreeting`'s "Looks like
  you're exploring ___." template) and cleared on unmount.
- **`useScrollSpy`** drives `CaseStudySidebar`, identical to
  `SolutionSidebar`.
- Everything else (which accordion item is open, which architecture node
  or technology decision is selected) is local `useState`, per
  `docs/architecture.md`.

## AI Companion + BuildPath integration

Same pattern as the Solutions Platform (`docs/solutions.md`):

- **AI page context** via `CaseStudyHero`, described above.
- **BuildPath prefill.** `/buildpath` (still a "coming soon" placeholder)
  now also reads `?caseStudy={slug}` alongside its existing `?solution=`
  handling, and honestly acknowledges the referring case study's
  industry, business challenge, and technologies — rather than
  prefilling a questionnaire that doesn't exist yet. `CaseStudyHero` and
  `CaseStudyFinalCta` both link there.

## Analytics

Declared in `features/case-studies/analytics.ts`: `work_search`,
`work_filter_changed`, `work_project_clicked`, `case_study_viewed`,
`case_study_architecture_node_selected`, `case_study_technology_clicked`,
`case_study_engineering_stage_selected`, `case_study_faq_expanded`,
`case_study_solution_clicked`, `case_study_article_clicked`,
`case_study_cta_selected`, `case_study_buildpath_started`. "AI questions"
is covered by the AI Companion's own events, not duplicated here.

**Scroll depth gap found and fixed during this milestone's review.** The
Phase 0 analytics doc comment claimed "time on page and scroll depth
reuse the homepage's existing infrastructure," but `useScrollDepth`/
`ScrollDepthTracker` (`features/homepage/shared` — despite the folder
name, generic) were never actually mounted anywhere outside the
homepage. Fixed by:

- Widening the shared `scroll_depth_reached` event with an optional
  `page` field, so events from different pages are distinguishable in
  the analytics stream (previously every caller would have collided into
  one undifferentiated stream).
- Mounting `<ScrollDepthTracker page="..." />` on every `/work` route and
  updating the homepage's own call site to pass `page="home"` for
  consistency.

"Time on page" still has no tracker anywhere in the codebase (not even
on the homepage) — this is noted honestly in `analytics.ts` rather than
fabricated; it should land as its own generic addition to
`features/homepage/shared` when scoped, not as one-off case-study code.

## SEO

- `generateMetadata`/`metadata` on every route sets `title`,
  `description`, `alternates.canonical`, `openGraph`, and `twitter`
  (CLAUDE.md Part 26's full metadata list) — except `/work/search`,
  which skips OpenGraph/Twitter (a query-driven results page isn't meant
  to be shared socially) and canonicalizes to the bare `/work/search`
  path regardless of `?q=`, to avoid treating every query as distinct
  indexable content.
- `lib/json-ld.ts` gained `articleJsonLd` (schema.org has no dedicated
  "CaseStudy" type; `Article` is the closest valid one).
  `datePublished`/`dateModified` are deliberately omitted — the content
  model has no real authored dates, and CLAUDE.md Part 7's "never
  fabricate numbers" applies equally to fabricated dates.
- `/work/[slug]` renders `BreadcrumbList` + `Article` + `FAQPage`
  (generated from the same `faqs` data the page visibly renders as an
  accordion). The facet routes and `/work` itself render `BreadcrumbList`
  only.
- `sitemap.ts` lists `/work`, all five `/work/[slug]` routes, and every
  industry/technology/business-problem facet route. `/work/search` is
  deliberately excluded.

## Accessibility

- **Radix `Accordion` and the shared selectable-pipeline pattern**
  (the same two interaction patterns the Solutions Platform established)
  cover every interactive section: `CaseStudyTechnologyDecisions`,
  `CaseStudyEngineeringProcess`, `CaseStudyFaqSection` use the Accordion;
  `CaseStudyArchitecture` uses the selectable pipeline — chosen
  deliberately per section based on whether the spec's own wording
  describes disclosure ("expandable") or selection among alternatives
  ("clickable diagram").
- **Verified, not assumed.** `e2e/work.spec.ts` runs a full
  `@axe-core/playwright` scan against the landing page and a
  representative detail page (zero violations), in addition to the
  per-component Storybook a11y gate every component passes in isolation,
  plus a live axe scan taken after every phase against the actual
  composed page with that phase's new interactive elements exercised
  (expanded, selected, filtered) — not just the default collapsed state.
  One transient false positive was caught this way: a `color-contrast`
  violation that only appeared when axe scanned mid-`transition-colors`
  CSS transition, immediately after a click with no wait — confirmed not
  a real defect by re-scanning after the transition settled.

## Navigation

The Work mega menu (all five case studies, by company name) is assembled
in `app/layout.tsx` next to the Solutions mega menu, for the same reason
(`config/site.ts`, read by the Shared-layer `PageShell`, must not depend
on feature data).

`CaseStudySidebar`'s thirteen section links are a fixed, hand-authored
list rather than derived from `CaseStudy` data — the section structure
doesn't vary by case study (CLAUDE.md Part 21: "every case study follows
the same architecture"), only the content within each section does.
`get-started` (the final CTA) is excluded from the list since it renders
full-width outside the sidebar grid.

## Scope boundaries

Honest gaps, documented rather than silently shipped:

| What the spec asks for                                                      | What's actually built                                                                                                                                                                                                    |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "Trending projects" section (Part 21)                                       | Not implemented — there's no real traffic/engagement data yet to rank by, and fabricating an order would be exactly the "never fabricate numbers" principle applied to a ranking instead of a metric.                    |
| Team size/timeline/platform as filter facets (Part 21 lists them generally) | Not exposed as dropdowns — with only 5 real case studies, none of those fields has enough natural multi-value spread to make a dropdown functional rather than decorative. They remain visible as hero-section metadata. |
| "Related Technologies" as its own section (Part 21)                         | Not a separate section — `CaseStudyTechnologyDecisions` already covers every technology in full depth, and there's no Technology Explorer platform yet to link a shorter badge list out to.                              |
| Image gallery, downloadable PDF summary (Part 21's interactive features)    | Not built — no real product photography exists for fictional companies, and PDF export has no rendering pipeline yet; both would need to be fabricated or built from scratch, out of scope for this milestone.           |
| "Time on page" analytics (Part 21)                                          | No tracker exists anywhere in the codebase, including the homepage — noted honestly rather than half-implemented for this feature alone.                                                                                 |
| A 404 status code for an unknown `/work/[slug]` or facet slug               | Renders the correct not-found UI but returns HTTP 200 — the same pre-existing Next.js 15 behavior documented in `docs/solutions.md`, reproduced identically here.                                                        |

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract — 18 component test files plus
  `data/case-studies.test.ts`, `data/business-problems.test.ts`,
  `data/facets.test.ts`, `data/fictional-companies.test.ts`, and
  `utils/slugify.test.ts`.
- **Storybook a11y** (`vitest --project=storybook`): every component's
  stories pass the same axe gate as every design-system primitive,
  homepage module, and Solutions component.
- **E2E** (`e2e/work.spec.ts`, Playwright): the landing page's grid,
  search, and quick-filter interaction; the full detail-page template
  rendering; architecture node selection and technology-decision
  expansion; sidebar scrollspy; the BuildPath/AI Companion integrations;
  all four facet/search routes; the mega menu; unknown-slug fallbacks;
  and full-page axe scans on both the landing and detail pages.
