# Knowledge Center Platform (Milestone 7, extended in Milestone 15)

This document covers `apps/website/src/app/knowledge/` and everything it
composes: the `/knowledge` landing page, the shared article template,
Learning Paths, Playbooks (now with a dedicated checklist route),
Tutorials (now real content, not a placeholder), two honest
content-type placeholders, and the category/search routes — built as
`apps/website/src/features/knowledge/*`, per CLAUDE.md Part 18. It
assumes `docs/architecture.md` and `docs/technology.md` (the established
feature-folder, sidebar/scrollspy, and AI/BuildPath-integration
conventions this milestone reuses) as background, and focuses on what's
specific to the Knowledge Center.

Milestone 7 shipped the foundation: five articles, one Learning Path, one
playbook-typed article, and three honest placeholders. Milestone 15
closed the gaps that foundation left open — real search, AI summaries,
a dedicated playbook experience, real tutorials, deeper Solutions/
BuildPath integration, and a completed reading experience — without
padding the content catalog beyond what's genuinely authored. See
"What Milestone 15 changed" below for the full diff.

## Content scope: seven real articles and one real tutorial, not a padded catalog

CLAUDE.md Part 18 names a large content taxonomy (Articles, Playbooks,
Whitepapers, Interactive Tutorials, Videos, Workshops, Checklists,
Templates, Courses) and eight named Learning Path audiences. This
platform ships exactly what has real content behind it — seven articles
(`data/articles.ts`) covering MVP validation, architecture (monolith vs.
microservices, and a dedicated architecture review playbook), AI (RAG vs.
fine-tuning), commerce (Shopify Plus), accessibility, and production
readiness — plus one hands-on tutorial (`data/tutorials.ts`) — and is
explicit everywhere else about what doesn't exist yet rather than
fabricating volume to look complete. See "Scope boundaries" below for the
full list of gaps and why each one is left open rather than papered over.

## Routes

| Route                              | Rendering                                        | Purpose                                                                                |
| ---------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `/knowledge`                       | Static (SSG)                                     | Landing page: hero + search + category filtering + featured guide + grid + newsletter. |
| `/knowledge/[slug]`                | Static (SSG via `generateStaticParams`, 7 slugs) | One shared template rendering a `KnowledgeArticle` record's full section content.      |
| `/knowledge/category/[category]`   | Static (SSG, only `POPULATED_CATEGORIES`)        | `KnowledgeExplorer` pre-seeded with a category filter, its own `<h1>` and metadata.    |
| `/knowledge/search`                | Dynamic (reads `?q=`)                            | `KnowledgeExplorer` pre-seeded with a search query — a deep-linkable results view.     |
| `/knowledge/learning-paths`        | Static (SSG)                                     | Landing list of Learning Paths.                                                        |
| `/knowledge/learning-paths/[slug]` | Static (SSG via `generateStaticParams`, 1 slug)  | One path's ordered article sequence, progress bar, and per-step completion.            |
| `/knowledge/playbooks`             | Static (SSG)                                     | Articles filtered to `type: "playbook"` — a playbook is an article, not a new model.   |
| `/knowledge/playbooks/[slug]`      | Static (SSG via `generateStaticParams`, 3 slugs) | **Milestone 15.** The same playbook article as an actionable, checkable checklist.     |
| `/knowledge/tutorials`             | Static (SSG)                                     | **Milestone 15.** Real listing over `data/tutorials.ts` (previously a placeholder).    |
| `/knowledge/tutorials/[slug]`      | Static (SSG via `generateStaticParams`, 1 slug)  | **Milestone 15.** Prerequisites → setup → steps → validation → next steps.             |
| `/knowledge/whitepapers`           | Static (SSG)                                     | Honest placeholder — no whitepapers exist yet.                                         |
| `/knowledge/videos`                | Static (SSG)                                     | Honest placeholder — no video pipeline exists yet.                                     |

## Component hierarchy

```
app/knowledge/page.tsx                          Server Component
├── BreadcrumbList JSON-LD
└── KnowledgeExplorer                            client component, owns filter state
    ├── KnowledgeHero                            search, quick category filter, AI entry
    ├── "Prefer a guided path?"                  links to Learning Paths, Playbooks, Tutorials
    ├── "Featured guide"                         FeaturedGuideCard (reused from homepage preview)
    ├── "All articles"                           KnowledgeGrid (searched + filtered, reuses ArticleCard)
    └── KnowledgeNewsletterSignup                Milestone 15 — Knowledge-scoped, not the homepage's

app/knowledge/category/[category]/page.tsx       Server Component
└── BreadcrumbList JSON-LD + <KnowledgeExplorer initialCategoryFilter, headline, supportingCopy />

app/knowledge/search/page.tsx                    Server Component
└── <KnowledgeExplorer initialQuery={q} />

app/knowledge/[slug]/page.tsx                    Server Component
├── BreadcrumbList + Article JSON-LD
├── KnowledgeArticleHero                 breadcrumb, h1, category/difficulty/reading-time, AI context,
│                                        BuildPath CTA, KnowledgeBookmarkButton, ShareButton,
│                                        ReadingProgressBar (moved in here, Milestone 15),
│                                        "Welcome back" resume banner (Milestone 15)
├── KnowledgeSummarizer                  Milestone 15 — "Ask Byld to summarize" (4 modes, deterministic)
├── (grid: sidebar + content, lg breakpoint)
│   ├── KnowledgeSidebar                 sticky, useScrollSpy, desktop only, also drives
│   │                                    pageContext.currentSectionLabel (Milestone 15)
│   └── content column
│       ├── KnowledgeExecutiveSummary    #who-this-is-for / #what-youll-learn
│       ├── KnowledgeWhyItMatters        #problem / #why-it-matters /
│       │                                #business-and-engineering-context / #real-world-relevance
│       ├── KnowledgeCoreConcepts        #core-concepts — definition list
│       ├── KnowledgeWalkthrough         #interactive-learning — selectable step sequence
│       ├── KnowledgeRealExamples        #real-examples
│       ├── KnowledgeCommonMistakes      #common-mistakes
│       ├── KnowledgeRelatedTechnologies #related-technologies — reuses TechnologyCard, renders nothing if empty
│       ├── KnowledgeRelatedSolutions    #related-solutions — Milestone 15, reuses SolutionCard
│       ├── KnowledgeRelatedCaseStudies  #related-case-studies — reuses ProjectCard, renders nothing if empty
│       └── KnowledgeRelatedLearning     #related-learning — reuses ArticleCard, renders nothing if empty
└── KnowledgeFinalCta                    #get-started

app/knowledge/learning-paths/page.tsx            Server Component
└── BreadcrumbList JSON-LD + KnowledgeLearningPaths (landing list, reuses Card)

app/knowledge/learning-paths/[slug]/page.tsx     Server Component
└── BreadcrumbList JSON-LD + KnowledgeLearningPathDetail
    (ordered steps, Progress bar, per-step Checkbox completion, fires learning_path_completed once)

app/knowledge/playbooks/page.tsx                 Server Component
└── BreadcrumbList JSON-LD + KnowledgePlaybooks (reuses KnowledgeGrid, filtered to type: "playbook",
    cards link to the dedicated checklist route via hrefBase)

app/knowledge/playbooks/[slug]/page.tsx          Server Component — Milestone 15
└── BreadcrumbList JSON-LD + KnowledgePlaybookDetail
    (per-step checklist, "Read the full guide" link back to /knowledge/[slug],
    "Print or save as PDF" via window.print(), resources list)

app/knowledge/tutorials/page.tsx                 Server Component — Milestone 15
└── BreadcrumbList JSON-LD + KnowledgeTutorials (real listing over data/tutorials.ts)

app/knowledge/tutorials/[slug]/page.tsx          Server Component — Milestone 15
└── BreadcrumbList JSON-LD + KnowledgeTutorialDetail
    (prerequisites, setup, steps, validation, next steps — every code sample via CodeBlock)

app/knowledge/{whitepapers,videos}/page.tsx      Server Components
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
— plus a second, genuinely distinct one for tutorials.

- `data/articles.ts` — seven records covering: overview (category,
  `type`, difficulty, reading time), audience/learning outcomes, business
  and engineering context, core concepts, an interactive walkthrough
  sequence, real examples, common mistakes, related content
  (technologies, **solutions** [Milestone 15], case studies, articles),
  and an optional `playbook` field. `data/articles.test.ts` validates
  every record against the schema and cross-references related-content
  arrays against the real Technology/Solutions/Case Studies/Knowledge
  data.
- `data/tutorial.schema.ts` + `data/tutorials.ts` — **Milestone 15.** A
  deliberately separate schema from `KnowledgeArticle`: a tutorial is
  action-sequence content (prerequisites, setup, numbered steps with
  optional `CodeBlock` samples, validation, next steps), not educational
  narrative — forcing it through the article shape would mean fabricating
  fields (executive summary, core concepts) it doesn't have. One real
  tutorial ships (`automated-accessibility-testing-with-axe`), describing
  the exact `@axe-core/playwright` pattern this repository's own e2e
  suite already uses — every command and code sample is real, not
  illustrative pseudocode.

**`type` drives Playbooks, not a separate schema.** `KNOWLEDGE_ARTICLE_TYPES
= ["guide", "comparison", "playbook"]` — a playbook is an article whose
`type` is `"playbook"` and whose optional `playbook` field is populated
(steps with checklist items, resources). It's still a full article at
`/knowledge/[slug]`, _and_ it gains a dedicated action-oriented checklist
view at `/knowledge/playbooks/[slug]` — two views of the same content,
not two content records. Three articles carry that type today:
`accessibility-checklist-for-product-teams`, `architecture-review-playbook`,
and `production-readiness-playbook` (Milestone 15 added the latter two;
the third is a brand-new category, `devops`).

**Category taxonomy vs. real routes.** `data/categories.ts` declares the
full taxonomy from CLAUDE.md Part 18 for future extensibility, but
`data/facets.ts`'s `POPULATED_CATEGORIES` (only categories with ≥1 real
_article_ — currently 6: MVP, Architecture, AI, Shopify, Accessibility,
DevOps) is what actually drives filter chips, category routes,
`generateStaticParams`, and the Knowledge mega menu. `POPULATED_CATEGORIES`
is deliberately scoped to articles only, not tutorials — a category with
a tutorial but zero articles would otherwise appear as a filterable chip
that filters the article grid to nothing; a tutorial's own category label
still resolves correctly via `CATEGORIES_BY_SLUG`, which covers the full
taxonomy independently. `KnowledgeHero` shows an honest
"N of 20 categories are live so far" note whenever the full taxonomy
exceeds what's populated (suppressed on category-scoped views, where it
would be redundant).

## Search intelligence (Milestone 15)

`search.ts` replaced the original `.includes()` substring filter with a
weighted, multi-field relevance scorer (`searchKnowledgeArticles`) —
still fully deterministic and client-side, the same "Mock AI" honesty
`BuildPath`'s `MockAIProvider` documents: it reasons about text a visitor
can inspect, it doesn't pretend to understand language.

- **Weighted fields:** title (6) > category label / related technology
  names (4) > core concept terms / real example titles (3) > audience /
  summary / problem (2) > everything else — prose explanations, common
  mistakes, business/engineering context, learning outcomes (1).
- **A small alias table** (`QUERY_ALIASES`) maps common alternate
  spellings to the exact word the corpus uses — `postgres`→`postgresql`,
  `k8s`→`kubernetes`, `nextjs`→`next.js`, `llm`/`llms`→`ai`, and a few
  others — every entry corresponds to a real technology or concept
  already present in the data, not a guess at what visitors might type.
- **Honest zero-result suggestions** (`suggestForZeroResults`): when a
  query matches zero articles, it checks the query's words against real
  `POPULATED_CATEGORIES` labels and real `TECHNOLOGIES` names, surfacing
  a "Browse {category} guides" and/or "Explore {technology} in Technology
  Explorer" link only when something genuinely matched — never a
  fabricated suggestion. `KnowledgeGrid`'s empty state renders these as
  outline-button links alongside its existing "try a different category"
  copy.
- `knowledge_search_result_clicked` fires (with `query`/`position`)
  whenever a card is selected while a search query is active, in addition
  to the existing `knowledge_card_clicked`.

## AI summaries and deeper AI Companion context (Milestone 15)

- **`summarize.ts`** — `generateArticleSummary(article, mode)` for four
  modes (`30-second`, `executive`, `beginner`, `technical`), each a pure
  recombination of the article's own already-authored fields (never a
  live model call — CLAUDE.md's "Don't pretend an LLM is being used if it
  isn't"). `KnowledgeSummarizer` renders these as a `Tabs` switcher placed
  right after the hero, firing `knowledge_summary_mode_selected`.
- **`groundedReplies.ts`** gained `buildTutorialGroundedReplies(tutorial)`
  alongside the existing `buildKnowledgeArticleGroundedReplies(article)` —
  both mirror the pre-existing Case Studies grounded-reply pattern: every
  Q&A pair is a real field or a small honest recomposition, never
  invented copy.
- **`AiPageContext.currentSectionLabel`** — a new, distinct field from the
  homepage-only `AiCompanionState.currentSection` (a different concern:
  homepage scroll fallback vs. "which part of _this_ page"). A new store
  action, `setPageContextSection(sectionLabel)`, merges into `pageContext`
  without clobbering `groundedReplies`. `KnowledgeSidebar`'s existing
  scrollspy now also drives this as the visitor scrolls, so the AI
  Companion's greeting can reference the section currently in view, not
  just the article as a whole (`getPageContextGreeting` gained a third,
  optional parameter for this).

## Playbooks: dedicated checklist experience (Milestone 15)

`KnowledgePlaybookDetail` (`/knowledge/playbooks/[slug]`) renders a
playbook-typed article's `playbook.steps` as a real, persisted checklist —
distinct from the full educational template the same article still
renders at `/knowledge/[slug]`. Checklist state lives in the app store's
`checkedPlaybookItemIds: string[]`, id'd as
`${playbookSlug}:${stepId}:${itemIndex}` (flat, like
`bookmarkedArticleSlugs`, since the composite id is already unique — no
need for a second nested-per-playbook shape). "Print or save as PDF" is
the browser's own print dialog (`window.print()`, with `print:hidden`
utility classes hiding chrome that shouldn't print) rather than a bespoke
PDF pipeline — the same honest choice BuildPath's `/buildpath/print`
makes. `knowledge_playbook_started` fires once per mount;
`knowledge_playbook_item_toggled` fires per checkbox toggle.

`KnowledgePlaybooks` (the `/knowledge/playbooks` listing) now states its
count honestly in either singular or plural form (`3 practical playbooks
are published so far...`) and links cards to the dedicated checklist
route via `KnowledgeGrid`'s new `hrefBase` prop, rather than the full
article.

## Tutorials: real content and a code block component (Milestone 15)

Previously a `KnowledgeContentTypePlaceholder` stub; now backed by real
content and two dedicated components (`KnowledgeTutorials`,
`KnowledgeTutorialDetail`) plus a new shared primitive, `CodeBlock`
(`@/components/CodeBlock`).

- **`CodeBlock`** — syntax highlighting via a small custom regex
  tokenizer (`tokenize.ts`, 4 languages: bash/typescript/tsx/json), _not_
  a grammar-based library (Shiki/Prism) — a deliberate choice to avoid
  shipping a large client-side bundle for four simple languages.
  `splitTokensIntoLines` regroups the flat token stream into per-line
  arrays so line numbers stay accurate even across multi-line tokens
  (e.g. block comments). Features: copy button (Clipboard API), line
  numbers, optional line highlighting, filename/language header, and
  expand/collapse for long samples (`collapseAfterLines`, default 16). The
  horizontally-scrollable code region carries `tabIndex={0}` and an
  `aria-label` for keyboard/screen-reader access (a real axe violation,
  `scrollable-region-focusable`, caught and fixed during this milestone —
  see "Accessibility" below).
- **`KnowledgeTutorialDetail`** renders Prerequisites → Setup → Step 1..N
  → Validation → Next Steps, with every code sample going through
  `CodeBlock`. Links to `/buildpath?tutorial={slug}` — a new, distinct
  BuildPath entry query param from articles' `?article=`.
- Tutorials get their own small `Card`-based listing in
  `KnowledgeTutorials` rather than reusing `ArticleCard` — a `Tutorial`
  isn't a `KnowledgeArticle` (no executive summary, no AI summary),
  forcing it through that card would mean fabricating fields it doesn't
  have.

## Learning Paths

`data/learning-paths.ts` is a plain TypeScript interface (no zod schema —
the same "small facet-like list doesn't need one" precedent
`business-problems.ts` set), since a Learning Path is just an ordered
list of article slugs plus descriptive copy, not a rich content record.

Only one real path ships — "Startup Founder," sequencing five of the
seven real articles in a deliberate reading order (validate → build
accessibly → choose a commerce platform → an architecture decision → an
AI decision). CLAUDE.md Part 18 names eight audiences; the other seven
would each either duplicate the same one or two articles from a small
corpus or reduce to a single article, which isn't a journey — see the
data file's own doc comment for the full reasoning.

Completion is tracked per-article via the app store's
`completedArticleSlugs`/`toggleArticleCompleted` — textually identical to
the pre-existing `bookmarkedArticleSlugs`/`toggleBookmark` mechanism,
safe-storage-backed so it survives a reload and degrades to session-only
memory when storage is blocked. **Milestone 15** added
`learning_path_completed`, firing exactly once (guarded by a `useRef`)
when every step in a path is marked complete, resetting the guard if
completion later drops below 100% so genuinely re-completing a path fires
the event again. Certificates (also named in the spec) aren't built —
there's no user account or identity system to issue one against.

## Honest content-type placeholders

`KnowledgeContentTypePlaceholder` now backs only `/knowledge/whitepapers`
and `/knowledge/videos` — two content types CLAUDE.md Part 18 names that
still have no real content behind them (no whitepapers authored, no video
pipeline). Tutorials moved out of this list in Milestone 15 once real
content existed, the same way Playbooks and Learning Paths were promoted
out of "deferred" once their own real content shipped. Rather than defer
building the routes indefinitely or fabricate entries to fill the page,
each remaining placeholder states the gap plainly and links to what's
real today — implementing CLAUDE.md Part 4's "every empty state should
educate" and Part 8's "Empty Navigation: never a blank page, recommend
what's real instead." Both are excluded from `sitemap.ts` (nothing of
their own to index) and from the Knowledge mega menu (an empty section
next to populated ones would misrepresent the collection) — they stay
directly reachable and will join both once real content exists.

## Reading experience (Milestone 15)

- **`ReadingProgressBar`** moved from the page into `KnowledgeArticleHero`
  (mirroring the `CaseStudyHero` pattern) so its `onComplete` can fire
  `knowledge_article_completed` — previously mounted bare on the page
  with no completion hook wired at all.
- **`ShareButton`** sits next to the other hero CTAs, using the Web Share
  API when available and falling back to a clipboard copy + toast
  confirmation otherwise. Fires `knowledge_shared`.
- **`readingProgressBySlug: Record<string, number>`** (app store) records
  the last scroll percentage per article slug, written _once_ on
  `KnowledgeArticleHero` unmount (via a ref capturing the latest live
  `useReadingProgress()` value) rather than on every scroll tick, to
  avoid a localStorage write per scroll event.
- **The "Welcome back" resume banner** — on mount, if the saved
  percentage for the current article is between 5% and 95% (meaningfully
  partial, not "just started" or "already finished"), a dismissible
  `Alert` offers "Jump back in" (smooth-scrolls to that position, fires
  `knowledge_reading_resumed`) or "Dismiss."

## Solutions and BuildPath integration completeness (Milestone 15)

- **`relatedSolutionSlugs`** — added to the article schema (a required
  field; an empty array is an honest "no real fit," not an omission) and
  populated on all seven articles. `KnowledgeRelatedSolutions` renders
  them, reusing the real `SolutionCard`, mirroring
  `TechnologyRelatedSolutions` exactly. Fires `knowledge_solution_clicked`.
- **BuildPath prefill now uses the article/tutorial's actual category**,
  not an always-empty array. `entry-context.ts` gained
  `knowledgeCategoryToProjectTypes(category)` (e.g. `mvp`→MVP + New
  Product, `ai`→AI Product, `shopify`→E-commerce,
  `architecture`/`devops`→Modernization; categories with no honest fit map
  to `[]`). `EntryContext.source` gained `"tutorial"` and a
  `tutorialSlug` field; `/buildpath?tutorial={slug}` acknowledges the
  referring tutorial by name, the same honest "acknowledge, don't
  fabricate a prefilled form" pattern the existing `?article=`/
  `?solution=`/`?caseStudy=`/`?technology=` params use.

## Knowledge Center newsletter (Milestone 15)

`KnowledgeNewsletterSignup`, placed at the bottom of `/knowledge` via
`KnowledgeExplorer` — a distinct component from the homepage Conversion
Experience's generic `NewsletterSignup`, with its own scoped copy
("Engineering insights, not a sales list") and its own
`knowledge_newsletter_signup` analytics event. A stub signup with no real
email backend — submitting transitions to a genuine success state, the
same honest scope the homepage version documents.

## State

- **`KnowledgeExplorer`'s filter state** (query, category) is local
  `useState`, seeded from optional `initialQuery`/`initialCategoryFilter`
  props — the same pattern that lets the category and search routes and
  `/knowledge` itself share one component.
- **`useAiCompanionStore`'s `pageContext`** — set by
  `KnowledgeArticleHero`/`KnowledgePlaybookDetail`/`KnowledgeTutorialDetail`
  on mount, cleared on unmount; `pageContext.currentSectionLabel` is
  additionally driven by `KnowledgeSidebar`'s scrollspy (Milestone 15).
- **`useAppStore`'s `bookmarkedArticleSlugs`/`completedArticleSlugs`/
  `checkedPlaybookItemIds`/`readingProgressBySlug`** — persisted app-wide
  preferences, described above.
- **`useReadingProgress`** (`@/hooks`, promoted from this feature in
  Milestone 12) drives `ReadingProgressBar`, computing a 0–100 scroll
  percentage with the same formula `useScrollDepth` uses.
- **`useScrollSpy`** drives `KnowledgeSidebar`, identical to
  `TechnologySidebar`/`CaseStudySidebar`/`SolutionSidebar`.
- Everything else (which walkthrough step is selected, which Learning
  Path step is checked, which summary mode tab is active) is local
  `useState` or the app store, per `docs/architecture.md`.

## AI Companion + BuildPath integration

Same pattern as Solutions/Case Studies/Technology (`docs/solutions.md`,
`docs/technology.md`), extended in Milestone 15 as described above:

- **AI page context** via `KnowledgeArticleHero`/`KnowledgePlaybookDetail`/
  `KnowledgeTutorialDetail` — opening the AI Companion greets with "Looks
  like you're exploring {title}," now optionally naming the section in
  view too.
- **BuildPath prefill.** `/buildpath` reads `?article={slug}`,
  `?tutorial={slug}` (Milestone 15), alongside its existing
  `?solution=`/`?caseStudy=`/`?technology=` handling, and honestly
  acknowledges the referring content with its `importance`/`summary`
  field rather than prefilling a questionnaire that doesn't exist yet —
  now with real `prefillProjectTypes` derived from the content's category
  (Milestone 15), not an always-empty array.

## Analytics

Declared in `features/knowledge/analytics.ts`. Milestone 7's original
thirteen events, plus Milestone 15's additions:

`knowledge_viewed`, `knowledge_article_completed`\*, `knowledge_shared`\*,
`knowledge_reading_resumed`\*, `knowledge_search`, `knowledge_category_selected`,
`knowledge_card_clicked`, `knowledge_search_result_clicked`\*,
`knowledge_walkthrough_step_selected`, `knowledge_bookmark_toggled`,
`knowledge_technology_clicked`, `knowledge_solution_clicked`\*,
`knowledge_case_study_clicked`, `knowledge_related_article_clicked`,
`knowledge_cta_selected`, `knowledge_buildpath_started`,
`knowledge_summary_mode_selected`\*, `knowledge_playbook_started`\*,
`knowledge_playbook_item_toggled`\*, `knowledge_tutorial_started`\*,
`learning_path_started`, `learning_path_step_selected`,
`learning_path_completed`\*, `knowledge_newsletter_signup`\*
(\* = added in Milestone 15) — all verified to actually fire somewhere in
the feature during this milestone's review, no gaps found. Distinct from
`features/homepage/knowledge-center-preview`'s own
`knowledge_article_clicked`/`knowledge_ai_summary_expanded` events, which
track the homepage preview module specifically.

## SEO

- `generateMetadata`/`metadata` on every route sets `title`, `description`,
  `alternates.canonical`, `openGraph`, and `twitter` (CLAUDE.md Part 26's
  full metadata list) — except `/knowledge/search`, which skips
  OpenGraph/Twitter and canonicalizes to the bare path (same reasoning as
  `/technology/search`), and `/knowledge/{whitepapers,videos}`, which skip
  OpenGraph/Twitter since there's no content worth sharing.
- `/knowledge/[slug]`, `/knowledge/playbooks/[slug]`, and
  `/knowledge/tutorials/[slug]` render `BreadcrumbList` + `Article`
  structured data (the same `articleJsonLd` helper `/work/[slug]` uses
  for case studies, with no `datePublished`/`dateModified` since the
  content model has no real authored dates). Every other route renders
  `BreadcrumbList` only.
- `sitemap.ts` lists `/knowledge`, all 7 `/knowledge/[slug]` routes, all 6
  `/knowledge/category/[category]` routes, `/knowledge/learning-paths`
  and its 1 path route, `/knowledge/playbooks` and its 3 dedicated
  playbook routes (Milestone 15), and `/knowledge/tutorials` and its 1
  tutorial route (Milestone 15). `/knowledge/search` and the two
  remaining honest placeholders are deliberately excluded.

## Accessibility

- **Radix `Progress`** drives both `ReadingProgressBar` and the Learning
  Path detail page's completion bar; **Radix `Checkbox`** drives
  per-step completion; **Radix `Tabs`** drives `KnowledgeSummarizer`'s
  mode switcher (Milestone 15).
- **A real bug caught during Milestone 7's review:**
  `KnowledgeLearningPathDetail` rendered its page-level `<h1>` (the path
  title) directly followed by per-step `<h3>` headings with no `<h2>` in
  between when the component's Storybook story rendered it standalone — a
  heading-order violation caught by the Storybook a11y suite's axe gate.
  Fixed by adding an "Articles in this path" `<h2>` before the step list.
- **Real bugs caught during Milestone 15's review of `CodeBlock`:** (1)
  the horizontally-scrollable code region initially had no way to receive
  keyboard focus — axe's `scrollable-region-focusable` — fixed with
  `tabIndex={0}` + `aria-label`; (2) a follow-up fix that also added
  `role="region"` introduced a _new_ violation, `landmark-unique`, once
  multiple same-labeled `CodeBlock`s appeared on one tutorial page — fixed
  by dropping `role="region"` entirely and keeping only the
  `tabIndex`/`aria-label`. Both were caught by the Storybook a11y gate,
  not assumed away.
- **Verified, not assumed.** `e2e/knowledge.spec.ts` runs full
  `@axe-core/playwright` scans against the landing page, a representative
  article page, the Learning Path detail page, Playbooks, a dedicated
  playbook detail page, a tutorial detail page, and one honest placeholder
  page (zero violations), in addition to the per-component Storybook a11y
  gate every component passes in isolation.

## Navigation

The Knowledge mega menu (populated categories, Learning Paths, Playbooks)
is assembled in `app/layout.tsx` next to the Solutions, Work, and
Technology mega menus, for the same reason (`config/site.ts`, read by the
Shared-layer `PageShell`, must not depend on feature data).
`config/site.ts`'s `primaryNav` no longer carries a flat `Knowledge` link,
the same way Solutions/Work/Technology were removed from it when they
became dropdowns. `KnowledgeExplorer`'s "Prefer a guided path?" row links
to Learning Paths, Playbooks, and (Milestone 15) Tutorials.

`KnowledgeSidebar`'s section links are a fixed, hand-authored list rather
than derived from `KnowledgeArticle` data — the section structure doesn't
vary by article (CLAUDE.md Part 18: every article shares the same
template), only the content within each section does. Related-content
links are included even for articles where that section renders nothing.
`get-started` (the final CTA) is excluded from the list since it renders
full-width outside the sidebar grid.

## Scope boundaries

Honest gaps, documented rather than silently shipped:

| What the spec asks for                                                | What's actually built                                                                                                                                                                    |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Whitepapers, Videos, Workshops, Templates                             | Whitepapers/Videos get honest placeholder routes (above). Workshops and Templates get no route at all yet — not named in any milestone's phase plan, revisit when they are.              |
| Eight named Learning Path audiences                                   | One real path ships ("Startup Founder"); the rest would duplicate or thin out the small article corpus — see "Learning Paths" above.                                                     |
| Learning Path certificates                                            | Not built — no user account or identity system exists to issue one against.                                                                                                              |
| A large, varied article corpus across all 20 taxonomy categories      | Seven articles across six categories (MVP, Architecture ×2, AI, Shopify, Accessibility, DevOps) — real, fully-authored content rather than shallow entries across every category.        |
| A varied tutorial library                                             | One real, complete tutorial ships — the spec names no required tutorial count (unlike playbooks' "2-3" and learning paths' "2"), so one honest starting point rather than padded volume. |
| A 404 status code for an unknown `/knowledge/[slug]` or category slug | Renders the correct not-found UI but returns HTTP 200 — the same pre-existing Next.js 15 behavior documented in `docs/solutions.md`, reproduced identically here.                        |

## What Milestone 15 changed

A summary of every gap this milestone closed, for anyone comparing this
document against the original Milestone 7 shape:

1. **Category Explorer completeness** — an honest "N of 20 categories are
   live" note on the hero when the full taxonomy exceeds what's populated.
2. **Search intelligence** — weighted multi-field relevance scoring,
   query aliases, and honest zero-result suggestions (`search.ts`),
   replacing the original `.includes()` filter.
3. **AI summaries + deeper AI context** — `KnowledgeSummarizer`'s
   four-mode deterministic summaries, and `pageContext.currentSectionLabel`
   tracking as a visitor scrolls.
4. **Playbook dedicated experience** — `/knowledge/playbooks/[slug]`'s
   checklist view, persisted checklist state, print export, and two new
   real playbooks (architecture review, production readiness).
5. **Tutorials + `CodeBlock`** — a real tutorial content model and one
   authored tutorial, replacing the placeholder; a new shared
   syntax-highlighting code block component.
6. **Solutions/BuildPath integration completeness** — `relatedSolutionSlugs`
   - `KnowledgeRelatedSolutions`; real `prefillProjectTypes` derived from
     category instead of an always-empty array; a `tutorial` BuildPath
     entry point.
7. **Reading experience + analytics completeness** — `ReadingProgressBar`
   moved into the hero with a real `onComplete` hook, `ShareButton`,
   the "Welcome back" resume banner, `learning_path_completed`, and the
   Knowledge Center's own newsletter signup.

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract, plus `data/articles.test.ts`,
  `data/tutorials.test.ts`, `data/categories.test.ts`,
  `data/facets.test.ts`, `data/learning-paths.test.ts`, `search.test.ts`,
  and `groundedReplies.test.ts`.
- **Storybook a11y** (`vitest --project=storybook`): every component's
  stories pass the same axe gate as every design-system primitive,
  homepage module, Solutions, Case Studies, and Technology component.
- **E2E** (`e2e/knowledge.spec.ts`, Playwright, 40 tests): the landing
  page's grid, search (including alias matching and zero-result
  suggestions), and quick-filter interaction; the full article-page
  template rendering; walkthrough step selection; bookmarking; sharing;
  the reading-progress resume banner; sidebar scrollspy; the AI summary
  mode switcher; the BuildPath/AI Companion integrations; the Learning
  Paths landing and detail pages (progress tracking, step completion);
  Playbooks (listing and dedicated checklist detail page); Tutorials
  (listing, detail page, code copy); the newsletter signup; both
  remaining honest placeholder routes; the category and search routes;
  the Knowledge mega menu; unknown-slug fallbacks; and full-page axe
  scans across every major route.
