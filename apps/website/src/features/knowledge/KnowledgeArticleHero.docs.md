# KnowledgeArticleHero

CLAUDE.md Part 18's article page hero: a breadcrumb back to `/knowledge`,
the article's category/difficulty/reading time at a glance, its title,
its summary, "Plan Your Roadmap"/"Talk to Byld" — the same "BuildPath or
AI Companion" pairing `TechnologyDetailHero`/`SolutionHero`/`CaseStudyHero`
use — `KnowledgeBookmarkButton`, and `ShareButton`.

## AI Companion integration

Sets the AI Companion's `pageContext` to this article on mount and clears
it on unmount, so a visitor asking Byld a question while reading gets a
response grounded in the current article rather than a generic greeting
(CLAUDE.md Part 16: "AI always knows... current article"). `KnowledgeSidebar`
separately syncs `pageContext.currentSectionLabel` as the visitor
scrolls (Milestone 15).

## BuildPath integration

Links to `/buildpath?article={slug}` — `/buildpath` reads the `article`
query param and acknowledges the referring article by name, the same
honest "acknowledge the referring context, don't fabricate a prefilled
form" pattern already used for `?solution=`, `?caseStudy=`, and
`?technology=`.

## Reading progress + resume (Milestone 15)

Mounts `ReadingProgressBar` here (not the page) so its `onComplete` can
fire `knowledge_article_completed` — the same pattern `CaseStudyHero`
established for `ReadingProgressBar`, which was promoted to
`@/components` once Case Studies became a second real consumer.

The current scroll percentage is written to the app store's
`readingProgressBySlug` once, on unmount — not on every scroll tick, to
avoid a localStorage write per scroll event. On a later visit, if the
saved percentage is between 5% and 95% (meaningfully partial — not "just
started" or "already finished"), a dismissible "Welcome back" banner
offers to scroll straight back to that position.

## Analytics

Tracks `knowledge_viewed` once on mount, `knowledge_cta_selected` for
each CTA, `knowledge_buildpath_started` when Plan Your Roadmap is
selected, `knowledge_article_completed` when reading reaches 100%,
`knowledge_shared` from `ShareButton`, and `knowledge_reading_resumed`
when "Jump back in" is selected — see `analytics.ts`.
