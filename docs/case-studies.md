# Case Studies Platform (Milestone 5, extended by Milestones 11 and 12)

This document covers `apps/website/src/app/work/` and everything it
composes: the `/work` landing page, the shared five-case-study detail
template, and the industry/technology/business-problem/search facet
routes — built as `apps/website/src/features/case-studies/*`, per
CLAUDE.md Part 21. It assumes `docs/architecture.md` (the general
layering contract) and `docs/solutions.md` (the established
feature-folder, sidebar/scrollspy, and AI/BuildPath-integration
conventions this milestone reuses) as background, and focuses on what's
specific to Case Studies.

Milestone 5 shipped this platform. Milestone 11 ("Work / Portfolio
Experience") and Milestone 12 ("Case Studies Platform") each extended it
rather than building a parallel experience — see "Milestone 11 — Work /
Portfolio Experience extension" and "Milestone 12 — Case Studies Platform
extension" near the end of this document for why, and for what each
phase added. Facts above those sections already reflect the current,
post-Milestone-12 state.

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
    ├── FeaturedProjectStory (primary)     M11 — cinematic single-story treatment, ProjectVisual band
    ├── ProjectGrid (Featured, additional) reuses the Proof Engine's ProjectGrid/ProjectCard
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
│       ├── CaseStudyBusinessContext       #business-context — market/model/existing tech (M12)
│       ├── CaseStudyDiscovery             #discovery — card grid
│       ├── CaseStudyProductThinking       #product-thinking — decisions + rejected ideas
│       ├── CaseStudyArchitecture          #architecture — selectable pipeline, staggered reveal (M11),
│       │                                    per-node technology tag + Technology Explorer link (M12)
│       ├── CaseStudyTechnologyDecisions   #technology-decisions — Accordion, links to /technology/[slug] (M11)
│       ├── CaseStudyEngineeringProcess    #engineering-process — Accordion, sequential reveal (M12)
│       ├── CaseStudyChallenges            #challenges — issue/resolution cards
│       ├── CaseStudyBeforeAfter           #before-after — parsed from real metrics, or nothing (M12,
│       │                                    not in sidebar — not guaranteed to render)
│       ├── CaseStudyResults               #results — approach/outcome/AnimatedMetric (M11)
│       ├── CaseStudyQuote                 M11 — real testimonial or nothing, not in sidebar
│       ├── CaseStudyLessonsLearned        #lessons-learned — three-column lists
│       ├── CaseStudyFutureRoadmap         #future-roadmap — client plan vs. Byld IQ recommendation (M12)
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

## Milestone 11 additions to the data/logic layer

- **`groundedReplies.ts`** — `buildCaseStudyGroundedReplies(caseStudy)`
  builds the AI Companion's "Ask Byld about this project" quick replies
  from real fields (`challenge`, `architecture`, `technologyDecisions`,
  `whatCouldImprove`) — see "AI Companion + BuildPath integration" below.
- **`@/utils/metric-value.ts`** — `parseMetricValue` extracts a countable
  number from a metric's free-text value (`"+17%"` → sign/magnitude/
  suffix/decimals), returning `null` for prose that isn't cleanly a
  number (`"Zero unplanned"`, `"2 days -> 12 min"`) rather than guessing.
  Consumed by `@/hooks/useAnimatedMetric` and the new
  `AnimatedMetric`/`AnimatedMetricValue` components
  (`apps/website/src/components/`), used by `CaseStudyResults`,
  `ProjectCard`, and `FeaturedProjectStory` for viewport-triggered
  count-up (CLAUDE.md Part 11: "metrics should animate when entering the
  viewport").
- **`@/hooks/useCountUp` decimal-precision fix.** Previously rounded to
  a whole number on every animation frame, including the final one — a
  target like `99.97` would land on `100`, not `99.97`. Fixed to return
  the unrounded value; callers (`MetricCard`, `AnimatedMetricValue`)
  already round for display via `toFixed`/`Math.round`. Caught while
  building `AnimatedMetric`, which relies on exact decimal metrics like
  uptime percentages being displayed correctly.

## Milestone 12 additions to the data/logic layer

- **Schema enrichment** (`data/case-study.schema.ts`) — three additions,
  all backed by real content for all five case studies (checked by new
  cases in `data/case-studies.test.ts`):
  - `architectureNodeSchema.technology?` — an optional tag naming the real
    technology a node maps to, when one applies. Deliberately shallower
    than the spec's full per-node alternatives/trade-offs list —
    `CaseStudyTechnologyDecisions` already covers that depth once per
    technology on the same page, so repeating it per architecture node
    would duplicate content rather than add it. See the schema file's own
    doc comment.
  - `businessContext` — `businessModel`/`market`/`existingTechnology`/
    `competitivePressure`, four required strings rendered by the new
    `CaseStudyBusinessContext`.
  - `futureRoadmap` — an array of `{ item, source: "client" |
"byld-recommendation" }`, rendered by the new `CaseStudyFutureRoadmap`
    with a badge distinguishing what the client already plans from what
    Byld IQ recommends — CLAUDE.md Part 21 asks for that distinction
    explicitly.
- **`@/utils/before-after.ts`** — `parseBeforeAfter(value)` extracts an
  existing `"before -> after"` pair already embedded in a metric's value
  string (matching `->` or `→`), returning `null` for any metric that
  isn't already phrased that way. `CaseStudyBeforeAfter` renders nothing
  when no metric parses — a genuinely empty section for 4 of 5 case
  studies, rather than inventing a "before" baseline that was never
  recorded (CLAUDE.md Part 7: "never fabricate numbers").
- **`estimateReadingTime.ts`** — sums word counts across every narrative
  field on a `CaseStudy` and divides by 200 wpm, `Math.max(1, ...)`-
  floored. Shown in `CaseStudyHero` as "N min read."
- **`groundedReplies.ts` — every technology decision, not just the
  first.** Previously only the case study's first-listed technology
  decision got a "Why {name}?" grounded reply; every technology now does,
  plus a new "What were the biggest technical challenges?" question
  grounded in the real `challenges` field. `getPageContextGreeting`
  (`engine/responses.ts`) caps the greeting's quick-reply chips to the
  first `MAX_GROUNDED_QUICK_REPLIES` (4) so this doesn't overflow the chat
  UI, but `getGroundedAnswer` still matches the full array — a visitor can
  ask about any technology by name and still get a real answer, even one
  not shown as a chip. See `AiCompanion.docs.md`'s "Grounded replies"
  section.
- **`useReadingProgress` + `ReadingProgressBar` promoted to shared.**
  Previously `features/knowledge`-local (`KnowledgeReadingProgress`);
  moved to `src/hooks/` and `src/components/` once Case Studies became a
  second real consumer (CLAUDE.md Part 27: "promote only after multiple
  real use cases"). `ReadingProgressBar` gained an `onComplete?` prop,
  fired once via a ref guard when progress reaches 100%, powering
  `case_study_reading_completed`.
- **`ShareButton`** (`src/components/`) — Web Share API with a
  clipboard-copy + toast fallback for browsers without it. Built
  case-study-agnostic from the start (no case-study coupling in its
  props), anticipating reuse anywhere else a "share this page" affordance
  is needed.

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
- **Grounded Q&A (Milestone 11).** `CaseStudyHero` also attaches
  `groundedReplies` (real Q&A pairs built by `buildCaseStudyGroundedReplies`
  from this case study's own data) to the page context. These become the
  AI Companion's opening quick replies, and `useAiCompanion` answers them
  directly from the real data — ahead of the generic keyword-matched
  engine — rather than a canned response that ignores the specific
  project. See `AiCompanion.docs.md`'s "Grounded replies" section for the
  full mechanism, which is generic (any page can supply
  `pageContext.groundedReplies`), not case-study-specific plumbing.

## Analytics

Declared in `features/case-studies/analytics.ts`: `work_search`,
`work_filter_changed`, `work_project_clicked`, `case_study_viewed`,
`case_study_architecture_node_selected`, `case_study_technology_clicked`,
`case_study_technology_explorer_clicked` (Milestone 11 — the
`/technology/[slug]` cross-link),
`case_study_engineering_stage_selected`, `case_study_faq_expanded`,
`case_study_solution_clicked`, `case_study_article_clicked`,
`case_study_cta_selected`, `case_study_buildpath_started`,
`case_study_section_viewed` (Milestone 12 — the sidebar's active section,
fired via `CaseStudySidebar`'s scrollspy), `case_study_reading_completed`
(Milestone 12 — scroll reaching 100%, via `ReadingProgressBar`'s
`onComplete`), `case_study_shared` (Milestone 12 — native share or
clipboard-copy fallback, via `ShareButton`). "AI questions" is covered by
the AI Companion's own events, not duplicated here.

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
- **A reproducible contrast bug found and fixed in Milestone 11.** An
  early version of `AnimatedMetric` wrapped its card in `Reveal` (a
  scroll-triggered `opacity: 0 -> 1` fade), and `ProjectGrid` animated
  each card's entrance the same way. Both caused genuine
  `color-contrast` failures across four Storybook stories
  (`CaseStudyResults`, `WorkExplorer`, `ProjectGrid`, `ProofEngine`):
  axe's scan runs before the fade completes, and caught `text-muted`/
  `text-accent` text partway through the transition, blended toward the
  white background at a measurably lower contrast ratio (axe reported
  ratios as low as 4.4-4.49 against the 4.5:1 AA requirement). Unlike the
  transition-colors case above, re-scanning after the transition settled
  wasn't the fix applied — an opacity-fade on text is a risk worth
  removing outright, not just confirming passes once settled, since
  Storybook's a11y gate scans on initial render with no guaranteed
  settle delay. Fixed by removing the opacity animations entirely —
  `AnimatedMetric` has no entrance animation of its own (the count-up
  itself, a text-content change, satisfies "animate when entering the
  viewport" honestly for parseable values), and `ProjectGrid`'s cards use
  only `layout` (a transform, not a color change). See
  `AnimatedMetric.docs.md` and `ProjectGrid.docs.md`.
- **The Milestone 11 lesson applied proactively in Milestone 12.**
  `CaseStudyEngineeringProcess`'s stages now reveal sequentially on scroll
  into view (CLAUDE.md Part 12: "timeline sequential reveal"), and each
  trigger's step-number badge uses the same marginal-contrast `text-muted`
  token the Milestone 11 regression involved. Rather than risk the same
  opacity-fade failure and catch it again by re-running axe,
  `staggerItemTransformOnly` (a new `motion-variants.ts` export) was used
  instead of the usual fade-based `staggerItem` — it animates `y` only and
  never touches `opacity`, so there's no partial-opacity state for axe to
  catch mid-transition. See `CaseStudyEngineeringProcess.docs.md`.

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

## Milestone 11 — Work / Portfolio Experience extension

Milestone 11's brief was a full "Work / Portfolio Experience": a
cinematic hero, structured project data, discovery/filtering, a featured
project presentation, richer project cards, a project detail preview,
architecture visualization, animated business metrics, a "Technology
Explorer" cross-link, AI Companion project awareness, and Knowledge
Center/BuildPath connections — nearly all of it already built by
Milestone 5's Case Studies Platform (this document) and Milestone 6's
Technology Explorer (`docs/technology.md`). As with Milestone 10's
relationship to Solutions, the choice was between duplicating an
already-complete platform under a new name or closing the genuine gaps
on top of it. The latter was chosen — `/work` remains the one Work
experience.

Seven phases closed the gaps that were real:

1. **Metric animation.** `useCountUp`'s decimal-rounding bug fixed;
   `parseMetricValue` + `useAnimatedMetric` + `AnimatedMetric`/
   `AnimatedMetricValue` added so metrics count up on scroll into view
   (CLAUDE.md Part 11) wherever a real number can be extracted, applied
   to `CaseStudyResults`, `ProjectCard`, and `FeaturedProjectStory`.
2. **Client quote.** `CaseStudyQuote` reuses the real `TestimonialCard` +
   `TESTIMONIALS` data (already grounded in each case study's own
   outcome) — renders nothing for the 2 of 5 case studies without one,
   rather than fabricating a quote.
3. **Architecture diagram entrance animation.** `CaseStudyArchitecture`'s
   nodes reveal in sequence on scroll into view
   (`staggerContainer`/`staggerItem`); selection stays click-only, not
   hover-only, to keep the diagram keyboard- and touch-operable.
4. **ProjectCard visual richness.** `ProjectVisual` (an accent gradient +
   `BlueprintGrid`, not fabricated photography — no real product images
   exist for the fictional companies) plus a "View project" arrow
   affordance, applied to `ProjectCard` and `FeaturedProjectStory`. The
   single most-featured case study on `/work` now gets
   `FeaturedProjectStory`'s cinematic treatment instead of a regular
   card, matching Part 11's Featured Project structure.
5. **Work → Technology Explorer cross-linking.** Each expanded
   technology decision links to the real `/technology/[slug]`
   (`docs/technology.md`) when that technology is in its 11-technology
   roster — 9 of the names case studies use have a match; the rest
   render as plain text, never a dead link.
6. **Project-aware AI grounded Q&A.** `pageContext` gained an optional
   `groundedReplies` field; `CaseStudyHero` populates it with real Q&A
   built from the case study's own data, and `useAiCompanion` answers
   from it directly, ahead of the generic keyword-matched engine — see
   "Milestone 11 additions to the data/logic layer" above and
   `AiCompanion.docs.md`.
7. **Filter grid motion + connections audit.** `ProjectGrid`'s cards
   reflow via `layout` on filter change. Knowledge Center
   (`CaseStudyRelatedKnowledge`) and BuildPath (`CaseStudyFinalCta`)
   connections were audited and found already complete — no changes
   needed there.

### What stayed honestly out of scope

- **No `projects/{slug}/project.json` + image directory structure**
  (Part 11's suggested data layout). `data/case-studies.ts` — one
  zod-validated array, the same "local typed data now, content-
  collections later" pattern every other platform in this codebase
  uses — already serves `/work` and every future Case Study page from
  one source; a per-project directory tree would fragment that for no
  functional gain, and would still have nothing to put in `gallery/`
  (see below).
- **No image gallery.** Still no real product photography for the
  fictional companies (the same gap `docs/case-studies.md`'s original
  scope table already named) — `ProjectVisual`'s gradient+grid substitute
  covers the "Project Image" slot honestly instead.
- **No `/work/[slug]/case-study` future route.** Part 11 describes the
  current detail page as a lighter "preview" ahead of a later, fuller
  Case Study milestone. In this codebase's actual build order, the full
  fourteen-section Case Study template (Part 21) already shipped in
  Milestone 5, ahead of Part 11's assumed sequence — so `/work/[slug]`
  already _is_ the complete story; a separate `/case-study` sub-route
  would only duplicate it.

## Milestone 12 — Case Studies Platform extension

Milestone 12's brief was a full "Case Studies Platform" spec: routes,
an MDX-based file content architecture, a fourteen-plus-section detail
page (Hero through Future Roadmap), an interactive Architecture Explorer
with per-node depth, Before/After comparisons, a "premium technical
publication" reading experience (sticky TOC, reading progress, reading
time, share), extensive motion, and a long analytics/testing/SEO
checklist — nearly all of it already built by Milestone 5's Case Studies
Platform (this document) and deepened by Milestone 11. As with Milestone
10 and Milestone 11's relationship to their own specs, the choice was
between duplicating an already-complete platform under new content
tooling or closing the genuine gaps on top of it. The latter was chosen —
`/work/[slug]` remains the one Case Study template.

The spec's own closing note explicitly permits this: "The exact
implementation can follow the existing repository architecture, but the
principle is mandatory: content and presentation must remain separate" —
already true of the existing zod-validated `data/case-studies.ts` model,
so it wasn't migrated to the spec's example MDX file layout (see "What
stayed honestly out of scope" below). The same note also warns against
"fake case studies just to make the interface look complete" — every new
field added this milestone (`businessContext`, `futureRoadmap`, the
architecture `technology` tags) was written from the same real, specific
facts already established for each of the five fictional companies in
Milestone 3, never generic filler.

Seven phases closed the gaps that were real:

1. **Schema enrichment.** `architectureNodeSchema.technology?`,
   `businessContext`, and `futureRoadmap` added to `data/case-study.schema.ts`
   and backed with real content for all five case studies — see
   "Milestone 12 additions to the data/logic layer" above.
2. **Business Context section.** `CaseStudyBusinessContext` renders
   `businessModel`/`market`/`existingTechnology`/`competitivePressure` —
   CLAUDE.md Part 21's "Business Context" section, previously covered
   only implicitly by the Executive Summary and Challenge fields.
3. **Architecture node depth + Before/After comparisons.**
   `CaseStudyArchitecture`'s detail panel now shows a node's `technology`
   tag and links to the real Technology Explorer when one exists (the
   same `TECHNOLOGY_EXPLORER_SLUGS` pattern `CaseStudyTechnologyDecisions`
   already used). `CaseStudyBeforeAfter` + `@/utils/before-after.ts`
   surface any metric already phrased as a before/after pair — genuinely
   empty for 4 of 5 case studies rather than fabricating one.
4. **Future Roadmap section.** `CaseStudyFutureRoadmap` renders each
   `futureRoadmap` item with a badge distinguishing "Client plan" from
   "Byld IQ recommendation" — CLAUDE.md Part 21 asks for that distinction
   explicitly, not just a flat list of next steps.
5. **Reading experience + analytics.** `estimateReadingTime`,
   `ReadingProgressBar` (promoted to shared, gained `onComplete`), and
   `ShareButton` (promoted to shared) — plus `case_study_section_viewed`,
   `case_study_reading_completed`, `case_study_shared`. See "Milestone 12
   additions to the data/logic layer" above.
6. **AI grounded replies enrichment + Hero polish.** Every technology
   decision (not just the first) now gets a "Why {name}?" grounded reply,
   plus a new "biggest technical challenges" question; `CaseStudyHero`
   gained the reading-time badge, an "Explore the architecture" link, and
   the Share button. See `AiCompanion.docs.md`'s "Grounded replies"
   section.
7. **Section entrance motion polish.** `CaseStudyEngineeringProcess`'s
   stages reveal sequentially on scroll into view, using a new
   transform-only stagger variant to avoid re-triggering the Milestone 11
   color-contrast regression — see "Accessibility" above.

### What stayed honestly out of scope

- **No MDX / `content/case-studies/*` file architecture.** The spec's own
  example content layout (`metadata.ts` + one `.mdx` file per section) was
  not adopted. The existing zod-validated `data/case-study.schema.ts` +
  `data/case-studies.ts` model already keeps content and presentation
  separate — the spec's stated mandatory principle — without the
  migration cost of moving five already-complete, richly cross-referenced
  case studies (each already linked from the homepage's Proof Engine, the
  Solutions Platform, and the Technology Explorer) into a parallel content
  pipeline this repository doesn't otherwise use anywhere yet.
- **No mobile tap-node-to-drawer pattern for the Architecture Explorer.**
  The spec suggests a dedicated mobile interaction (tap a node, a drawer
  opens with detail) distinct from desktop's inline detail panel.
  `CaseStudyArchitecture`'s existing selectable-button-row +
  inline-panel pattern already works on touch (it's tap-to-select, not
  hover-gated) and reflows naturally at every breakpoint; a separate
  drawer-based mobile variant would double the component's states for a
  presentation difference, not a functional gap.
- **No visual regression testing.** The spec's Testing section asks for
  it; this codebase has no visual-regression tooling anywhere yet (not
  even for the Design System's own component library), so adding it
  scoped to one platform would be inconsistent infrastructure rather than
  a real capability. The existing Storybook a11y gate + Playwright e2e
  axe scans are the testing surface this milestone extended instead.
- **No per-node "Alternatives"/"Trade-offs" depth on the Architecture
  Explorer.** The spec's node detail asks for the same alternatives/
  trade-offs breakdown `CaseStudyTechnologyDecisions` already provides
  once per technology, elsewhere on the same page. Repeating it per node
  (a node and a technology decision often reference the same technology)
  would duplicate content rather than deepen it — the node's `technology`
  tag + Explorer link covers the connection honestly instead. See
  `data/case-study.schema.ts`'s doc comment.

## Scope boundaries

Honest gaps, documented rather than silently shipped:

| What the spec asks for                                                      | What's actually built                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Trending projects" section (Part 21)                                       | Not implemented — there's no real traffic/engagement data yet to rank by, and fabricating an order would be exactly the "never fabricate numbers" principle applied to a ranking instead of a metric.                                                                                                                  |
| Team size/timeline/platform as filter facets (Part 21 lists them generally) | Not exposed as dropdowns — with only 5 real case studies, none of those fields has enough natural multi-value spread to make a dropdown functional rather than decorative. They remain visible as hero-section metadata.                                                                                               |
| "Related Technologies" as its own section (Part 21)                         | Not a separate section — `CaseStudyTechnologyDecisions` already covers every technology in full depth, and there's no Technology Explorer platform yet to link a shorter badge list out to.                                                                                                                            |
| Image gallery, downloadable PDF summary (Part 21's interactive features)    | Not built — no real product photography exists for fictional companies, and PDF export has no rendering pipeline yet; both would need to be fabricated or built from scratch, out of scope for this milestone.                                                                                                         |
| "Time on page" analytics (Part 21)                                          | No tracker exists anywhere in the codebase, including the homepage — noted honestly rather than half-implemented for this feature alone.                                                                                                                                                                               |
| A 404 status code for an unknown `/work/[slug]` or facet slug               | Renders the correct not-found UI but returns HTTP 200 — the same pre-existing Next.js 15 behavior documented in `docs/solutions.md`, reproduced identically here.                                                                                                                                                      |
| M11's `AnimatePresence`/exit animation for filtered-out cards               | Not built — `ProjectGrid`'s cards are removed from the DOM immediately on filter, not kept mounted mid-fade. Every existing test asserting synchronous removal already depends on that, and the layout reflow of the cards that _remain_ is the part of "layout animation" that's actually visible on a filter change. |
| M11's hover-gated metric reveal on `ProjectCard` (Part 11's hover sequence) | Metrics stay always-visible, not hidden until hover — this codebase's own UX philosophy (Part 4: "never hide critical information") outweighs matching the spec's hover-reveal sequence literally, and hover has no touch-device equivalent without a tap fallback the spec doesn't call for.                          |
| M12's MDX `content/case-studies/*` file architecture                        | Not adopted — the existing zod-validated data model already keeps content and presentation separate (the spec's own stated mandatory principle), and the spec explicitly permits following existing repository architecture. See "What stayed honestly out of scope" under Milestone 12.                               |
| M12's mobile tap-node-to-drawer pattern for the Architecture Explorer       | Not built — the existing selectable-button-row + inline-panel pattern already works on touch and reflows at every breakpoint without a separate mobile-only interaction.                                                                                                                                               |
| M12's visual regression testing                                             | Not built — no visual-regression tooling exists anywhere in this codebase yet; adding it scoped to one platform would be inconsistent infrastructure, not a real capability.                                                                                                                                           |
| M12's per-node Alternatives/Trade-offs depth on the Architecture Explorer   | Not built at the node level — `CaseStudyTechnologyDecisions` already covers alternatives/trade-offs once per technology on the same page; each node instead gets a `technology` tag + a link to the real Technology Explorer entry.                                                                                    |

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract. Milestone 11 added test files for every new
  component/hook (`CaseStudyQuote`, `AnimatedMetric`,
  `AnimatedMetricValue`, `ProjectVisual`, `useAnimatedMetric`,
  `useCountUp`'s decimal-precision case) plus `utils/metric-value.test.ts`
  and `groundedReplies.test.ts`, and extended existing test files
  (`CaseStudyTechnologyDecisions`, `CaseStudyHero`,
  `CaseStudyArchitecture`, `ProjectCard`,
  `FeaturedProjectStory`, `ProjectGrid`, `useAiCompanion`,
  `responses.test.ts`) to cover the new behavior. Milestone 12 added test
  files for every new component/util (`CaseStudyBusinessContext`,
  `CaseStudyBeforeAfter`, `CaseStudyFutureRoadmap`,
  `before-after.test.ts`, `estimateReadingTime.test.ts`,
  `ReadingProgressBar.test.tsx`, `ShareButton.test.tsx`) and extended
  existing ones (`data/case-studies.test.ts`, `CaseStudyArchitecture`,
  `CaseStudySidebar`, `CaseStudyHero`, `groundedReplies.test.ts`,
  `responses.test.ts`) to cover the new behavior.
- **Storybook a11y** (`vitest --project=storybook`): every component's
  stories pass the same axe gate as every design-system primitive,
  homepage module, and Solutions component — including, after the fix
  described above, the four stories an opacity-fade regression briefly
  broke during Milestone 11. Milestone 12's own Phase Final review caught
  one more instance of the same class of issue, in a different
  component: `ShareButton.stories.tsx` wrapped its story in a second,
  local `ToastProvider` on top of the global one every story already gets
  (`StorybookProviders`), producing two identically-labeled Sonner toast
  landmarks and a real axe `landmark-unique` violation — fixed by
  removing the redundant local provider, matching the pattern
  `Toast.stories.tsx` already used correctly.
- **E2E** (`e2e/work.spec.ts`, Playwright): the landing page's grid,
  search, and quick-filter interaction; the full detail-page template
  rendering; architecture node selection and technology-decision
  expansion; sidebar scrollspy; the BuildPath/AI Companion integrations;
  all four facet/search routes; the mega menu; unknown-slug fallbacks;
  and full-page axe scans on both the landing and detail pages. Also
  re-verified in Milestone 11: `e2e/technology.spec.ts` and
  `e2e/solutions.spec.ts` (both reuse `ProjectCard`) and
  `e2e/homepage.spec.ts` (reuses `ProjectCard`/`FeaturedProjectStory` via
  the Proof Engine). Milestone 12 added `"business-context"` and
  `"future-roadmap"` to the detail page's "renders every shared template
  section" assertion (`"before-after"` deliberately excluded — it isn't
  guaranteed to render for the `fieldnote-mvp` fixture that test uses).
- **A real test-environment bug found and fixed in Milestone 12's Phase
  Final review.** `CaseStudyHero.test.tsx`'s reading-completion test
  rendered the component before any scroll dimensions were established;
  jsdom defaults `document.documentElement.scrollHeight` to `0`, which
  (being less than `innerHeight`) reads as "nothing left to scroll" and
  fired `case_study_reading_completed` on mount, before the test's first
  scroll assertion — never possible in a real browser, which has already
  laid out the page by the time the effect runs. Fixed by establishing
  realistic scroll dimensions before rendering, not by changing
  `useReadingProgress` itself.
