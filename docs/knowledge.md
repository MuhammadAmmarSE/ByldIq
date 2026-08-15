# Knowledge Center Platform (Milestone 7)

This document covers `apps/website/src/app/knowledge/` and everything it
composes: the `/knowledge` landing page, the shared article template,
Learning Paths, Playbooks, three honest content-type placeholders, and
the category/search routes — built as
`apps/website/src/features/knowledge/*`, per CLAUDE.md Part 18. It
assumes `docs/architecture.md` and `docs/technology.md` (the established
feature-folder, sidebar/scrollspy, and AI/BuildPath-integration
conventions this milestone reuses) as background, and focuses on what's
specific to the Knowledge Center.

## Content scope: five real articles, not a padded catalog

CLAUDE.md Part 18 names a large content taxonomy (Articles, Playbooks,
Whitepapers, Interactive Tutorials, Videos, Workshops, Checklists,
Templates, Courses) and eight named Learning Path audiences. This
milestone ships exactly what has real content behind it — five articles
(`data/articles.ts`) covering MVP validation, architecture
(monolith vs. microservices), AI (RAG vs. fine-tuning), commerce
(Shopify Plus), and accessibility — and is explicit everywhere else about
what doesn't exist yet rather than fabricating volume to look complete.
See "Scope boundaries" below for the full list of gaps and why each one
is left open rather than papered over.

## Routes

| Route                              | Rendering                                        | Purpose                                                                              |
| ---------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `/knowledge`                       | Static (SSG)                                     | Landing page: hero + search + category filtering + featured guide + grid.            |
| `/knowledge/[slug]`                | Static (SSG via `generateStaticParams`, 5 slugs) | One shared template rendering a `KnowledgeArticle` record's full section content.    |
| `/knowledge/category/[category]`   | Static (SSG, only `POPULATED_CATEGORIES`)        | `KnowledgeExplorer` pre-seeded with a category filter, its own `<h1>` and metadata.  |
| `/knowledge/search`                | Dynamic (reads `?q=`)                            | `KnowledgeExplorer` pre-seeded with a search query — a deep-linkable results view.   |
| `/knowledge/learning-paths`        | Static (SSG)                                     | Landing list of Learning Paths.                                                      |
| `/knowledge/learning-paths/[slug]` | Static (SSG via `generateStaticParams`, 1 slug)  | One path's ordered article sequence, progress bar, and per-step completion.          |
| `/knowledge/playbooks`             | Static (SSG)                                     | Articles filtered to `type: "playbook"` — a playbook is an article, not a new model. |
| `/knowledge/whitepapers`           | Static (SSG)                                     | Honest placeholder — no whitepapers exist yet.                                       |
| `/knowledge/videos`                | Static (SSG)                                     | Honest placeholder — no video pipeline exists yet.                                   |
| `/knowledge/tutorials`             | Static (SSG)                                     | Honest placeholder — no interactive tutorial engine exists yet.                      |

## Component hierarchy

```
app/knowledge/page.tsx                          Server Component
├── BreadcrumbList JSON-LD
└── KnowledgeExplorer                            client component, owns filter state
    ├── KnowledgeHero                            search, quick category filter, AI entry
    ├── "Prefer a guided path?"                  links to Learning Paths and Playbooks
    ├── "Featured guide"                         FeaturedGuideCard (reused from homepage preview)
    └── "All articles"                           KnowledgeGrid (filtered, reuses ArticleCard)

app/knowledge/category/[category]/page.tsx       Server Component
└── BreadcrumbList JSON-LD + <KnowledgeExplorer initialCategoryFilter, headline, supportingCopy />

app/knowledge/search/page.tsx                    Server Component
└── <KnowledgeExplorer initialQuery={q} />

app/knowledge/[slug]/page.tsx                    Server Component
├── BreadcrumbList + Article JSON-LD
├── ReadingProgressBar                   fixed top progress bar tied to scroll position (shared component)
├── KnowledgeArticleHero                 breadcrumb, h1, category/difficulty/reading-time,
│                                        AI context, BuildPath CTA, KnowledgeBookmarkButton
├── (grid: sidebar + content, lg breakpoint)
│   ├── KnowledgeSidebar                 sticky, useScrollSpy, desktop only
│   └── content column
│       ├── KnowledgeExecutiveSummary    #who-this-is-for / #what-youll-learn
│       ├── KnowledgeWhyItMatters        #problem / #why-it-matters /
│       │                                #business-and-engineering-context / #real-world-relevance
│       ├── KnowledgeCoreConcepts        #core-concepts — definition list
│       ├── KnowledgeWalkthrough         #interactive-learning — selectable step sequence
│       ├── KnowledgeRealExamples        #real-examples
│       ├── KnowledgeCommonMistakes      #common-mistakes
│       ├── KnowledgeRelatedTechnologies #related-technologies — reuses TechnologyCard, renders nothing if empty
│       ├── KnowledgeRelatedCaseStudies  #related-case-studies — reuses ProjectCard, renders nothing if empty
│       └── KnowledgeRelatedLearning     #related-learning — reuses ArticleCard, renders nothing if empty
└── KnowledgeFinalCta                    #get-started

app/knowledge/learning-paths/page.tsx            Server Component
└── BreadcrumbList JSON-LD + KnowledgeLearningPaths (landing list, reuses Card)

app/knowledge/learning-paths/[slug]/page.tsx     Server Component
└── BreadcrumbList JSON-LD + KnowledgeLearningPathDetail
    (ordered steps, Progress bar, per-step Checkbox completion)

app/knowledge/playbooks/page.tsx                 Server Component
└── BreadcrumbList JSON-LD + KnowledgePlaybooks (reuses KnowledgeGrid, filtered to type: "playbook")

app/knowledge/{whitepapers,videos,tutorials}/page.tsx   Server Components
└── BreadcrumbList JSON-LD + KnowledgeContentTypePlaceholder
    (shared component, type-specific copy, links to real content)
```

Every component follows the standard per-component contract (CLAUDE.md
Part 27): `Name.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`,
`.docs.md`. Each component's own `.docs.md` is the source of truth for
that component's specific decisions; this file only covers what's
cross-cutting.

## Data model

One local, zod-validated content model — `data/knowledge-article.schema.ts`

- `data/articles.ts` — covering: overview (category, `type`, difficulty,
  reading time), audience/learning outcomes, business and engineering
  context, core concepts, an interactive walkthrough sequence, real
  examples, common mistakes, and related content (technologies, case
  studies, articles). `data/articles.test.ts` validates every record
  against the schema and cross-references related-content arrays against
  the real Technology/Case Studies/Knowledge data.

**`type` drives Playbooks, not a separate schema.** `KNOWLEDGE_ARTICLE_TYPES
= ["guide", "comparison", "playbook"]` — a playbook is an article whose
`type` is `"playbook"`, the same dataset `KnowledgeGrid` already renders.
Only one article (`accessibility-checklist-for-product-teams`) carries
that type today.

**Category taxonomy vs. real routes.** `data/categories.ts` declares the
full taxonomy from CLAUDE.md Part 18 for future extensibility, but
`data/facets.ts`'s `POPULATED_CATEGORIES` (only categories with ≥1 real
article — currently 5: MVP, Architecture, AI, Shopify, Accessibility) is
what actually drives filter chips, category routes,
`generateStaticParams`, and the Knowledge mega menu.

## Learning Paths

`data/learning-paths.ts` is a plain TypeScript interface (no zod schema —
the same "small facet-like list doesn't need one" precedent
`business-problems.ts` set), since a Learning Path is just an ordered
list of article slugs plus descriptive copy, not a rich content record.

Only one real path ships — "Startup Founder," sequencing all five real
articles in a deliberate reading order (validate → build accessibly →
choose a commerce platform → an architecture decision → an AI decision).
CLAUDE.md Part 18 names eight audiences; the other seven would each
either duplicate the same one or two articles from a five-article corpus
or reduce to a single article, which isn't a journey — see the data
file's own doc comment for the full reasoning.

Completion is tracked per-article via the app store's
`completedArticleSlugs`/`toggleArticleCompleted` — textually identical to
the pre-existing `bookmarkedArticleSlugs`/`toggleBookmark` mechanism,
safe-storage-backed so it survives a reload and degrades to session-only
memory when storage is blocked. Certificates (also named in the spec)
aren't built — there's no user account or identity system to issue one
against.

## Honest content-type placeholders

`KnowledgeContentTypePlaceholder` backs `/knowledge/whitepapers`,
`/knowledge/videos`, and `/knowledge/tutorials` — three content types
CLAUDE.md Part 18 names that have no real content behind them (no
whitepapers authored, no video pipeline, no tutorial engine). Rather than
defer building the routes indefinitely (the way Playbooks and Learning
Paths were deferred until real content existed) or fabricate entries to
fill the page, each route states the gap plainly and links to what's real
today — implementing CLAUDE.md Part 4's "every empty state should
educate" and Part 8's "Empty Navigation: never a blank page, recommend
what's real instead." All three are excluded from `sitemap.ts` (nothing
of their own to index) and from the Knowledge mega menu (an empty section
next to populated ones would misrepresent the collection) — they stay
directly reachable and will join both once real content exists.

## State

- **`KnowledgeExplorer`'s filter state** (query, category) is local
  `useState`, seeded from optional `initialQuery`/`initialCategoryFilter`
  props — the same pattern that lets the category and search routes and
  `/knowledge` itself share one component.
- **`useAiCompanionStore`'s `pageContext`** — set by `KnowledgeArticleHero`
  on mount to the article's title, cleared on unmount.
- **`useAppStore`'s `bookmarkedArticleSlugs`/`completedArticleSlugs`** —
  persisted app-wide preference, described above.
- **`useReadingProgress`** (`@/hooks`, promoted from this feature in
  Milestone 12) drives `ReadingProgressBar`, computing a 0–100 scroll
  percentage with the same formula `useScrollDepth` uses.
- **`useScrollSpy`** drives `KnowledgeSidebar`, identical to
  `TechnologySidebar`/`CaseStudySidebar`/`SolutionSidebar`.
- Everything else (which walkthrough step is selected, which Learning
  Path step is checked) is local `useState` or the app store, per
  `docs/architecture.md`.

## AI Companion + BuildPath integration

Same pattern as Solutions/Case Studies/Technology (`docs/solutions.md`,
`docs/technology.md`):

- **AI page context** via `KnowledgeArticleHero`, described above —
  opening the AI Companion on an article page greets with "Looks like
  you're exploring {article title}."
- **BuildPath prefill.** `/buildpath` also reads `?article={slug}`
  alongside its existing `?solution=`/`?caseStudy=`/`?technology=`
  handling, and honestly acknowledges the referring article with its
  `importance` field (`Continuing from "{article.title}" — {article.importance}`)
  rather than prefilling a questionnaire that doesn't exist yet.
  `KnowledgeArticleHero` and `KnowledgeFinalCta` both link there.

## Analytics

Declared in `features/knowledge/analytics.ts`: `knowledge_viewed`,
`knowledge_search`, `knowledge_category_selected`,
`knowledge_card_clicked`, `knowledge_walkthrough_step_selected`,
`knowledge_bookmark_toggled`, `knowledge_technology_clicked`,
`knowledge_case_study_clicked`, `knowledge_related_article_clicked`,
`knowledge_cta_selected`, `knowledge_buildpath_started`,
`learning_path_started`, `learning_path_step_selected` — all thirteen
verified to actually fire somewhere in the feature during this
milestone's review, no gaps found. Distinct from
`features/homepage/knowledge-center-preview`'s own
`knowledge_article_clicked`/`knowledge_ai_summary_expanded` events, which
track the homepage preview module specifically.

## SEO

- `generateMetadata`/`metadata` on every route sets `title`, `description`,
  `alternates.canonical`, `openGraph`, and `twitter` (CLAUDE.md Part 26's
  full metadata list) — except `/knowledge/search`, which skips
  OpenGraph/Twitter and canonicalizes to the bare path (same reasoning as
  `/technology/search`), and `/knowledge/{whitepapers,videos,tutorials}`,
  which skip OpenGraph/Twitter since there's no content worth sharing.
- `/knowledge/[slug]` renders `BreadcrumbList` + `Article` structured data
  (the same `articleJsonLd` helper `/work/[slug]` uses for case studies,
  with no `datePublished`/`dateModified` since the content model has no
  real authored dates). Every other route renders `BreadcrumbList` only.
- `sitemap.ts` lists `/knowledge`, all 5 `/knowledge/[slug]` routes, all 5
  `/knowledge/category/[category]` routes, `/knowledge/learning-paths`,
  its 1 path route, and `/knowledge/playbooks`. `/knowledge/search` and
  the three honest placeholders are deliberately excluded.

## Accessibility

- **Radix `Progress`** drives both `ReadingProgressBar` and the Learning
  Path detail page's completion bar; **Radix `Checkbox`** drives
  per-step completion.
- **A real bug caught during this review:** `KnowledgeLearningPathDetail`
  rendered its page-level `<h1>` (the path title) directly followed by
  per-step `<h3>` headings with no `<h2>` in between when the component's
  Storybook story rendered it standalone — a heading-order violation
  caught by the Storybook a11y suite's axe gate. Fixed by adding an
  "Articles in this path" `<h2>` before the step list, matching the
  `h3`-then-`h5`-as-`h3` pattern `KnowledgeRealExamples` and other
  sibling components already use.
- **Verified, not assumed.** `e2e/knowledge.spec.ts` runs full
  `@axe-core/playwright` scans against the landing page, a representative
  article page, the Learning Path detail page, Playbooks, and one honest
  placeholder page (zero violations), in addition to the per-component
  Storybook a11y gate every component passes in isolation.

## Navigation

The Knowledge mega menu (populated categories, Learning Paths, Playbooks)
is assembled in `app/layout.tsx` next to the Solutions, Work, and
Technology mega menus, for the same reason (`config/site.ts`, read by the
Shared-layer `PageShell`, must not depend on feature data).
`config/site.ts`'s `primaryNav` no longer carries a flat `Knowledge` link,
the same way Solutions/Work/Technology were removed from it when they
became dropdowns.

`KnowledgeSidebar`'s thirteen section links are a fixed, hand-authored
list rather than derived from `KnowledgeArticle` data — the section
structure doesn't vary by article (CLAUDE.md Part 18: every article
shares the same template), only the content within each section does.
Related-content links are included even for articles where that section
renders nothing. `get-started` (the final CTA) is excluded from the list
since it renders full-width outside the sidebar grid.

## Scope boundaries

Honest gaps, documented rather than silently shipped:

| What the spec asks for                                                | What's actually built                                                                                                                                                                  |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Whitepapers, Videos, Interactive Tutorials, Workshops, Templates      | Whitepapers/Videos/Tutorials get honest placeholder routes (above). Workshops and Templates get no route at all yet — not named in this milestone's phase plan, revisit when they are. |
| Eight named Learning Path audiences                                   | One real path ships ("Startup Founder"); the rest would duplicate or thin out the five-article corpus — see "Learning Paths" above.                                                    |
| Learning Path certificates                                            | Not built — no user account or identity system exists to issue one against.                                                                                                            |
| A large, varied article corpus across all 20 taxonomy categories      | Five articles across five categories (MVP, Architecture, AI, Shopify, Accessibility) — real, fully-authored content rather than shallow entries across every category.                 |
| A 404 status code for an unknown `/knowledge/[slug]` or category slug | Renders the correct not-found UI but returns HTTP 200 — the same pre-existing Next.js 15 behavior documented in `docs/solutions.md`, reproduced identically here.                      |

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract, plus `data/articles.test.ts`,
  `data/categories.test.ts`, `data/facets.test.ts`, and
  `data/learning-paths.test.ts`.
- **Storybook a11y** (`vitest --project=storybook`): every component's
  stories pass the same axe gate as every design-system primitive,
  homepage module, Solutions, Case Studies, and Technology component.
- **E2E** (`e2e/knowledge.spec.ts`, Playwright): the landing page's grid,
  search, and quick-filter interaction; the full article-page template
  rendering; walkthrough step selection; bookmarking; sidebar scrollspy;
  the BuildPath/AI Companion integrations; the Learning Paths landing and
  detail pages (progress tracking, step completion); Playbooks; all three
  honest placeholder routes; the category and search routes; the
  Knowledge mega menu; unknown-slug fallbacks; and full-page axe scans on
  the landing page, a representative article page, the Learning Path
  detail page, Playbooks, and one placeholder page.
