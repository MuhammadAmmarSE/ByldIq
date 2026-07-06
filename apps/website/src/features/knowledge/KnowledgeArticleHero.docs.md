# KnowledgeArticleHero

CLAUDE.md Part 18's article page hero: a breadcrumb back to `/knowledge`,
the article's category/difficulty/reading time at a glance, its title,
its summary, and two CTAs — the same "BuildPath or AI Companion" pairing
`TechnologyDetailHero`/`SolutionHero`/`CaseStudyHero` use.

## AI Companion integration

Sets the AI Companion's `pageContext` to this article on mount and clears
it on unmount, so a visitor asking Byld a question while reading gets a
response grounded in the current article rather than a generic greeting
(CLAUDE.md Part 16: "AI always knows... current article").

## BuildPath integration

Links to `/buildpath?article={slug}` — `/buildpath` reads the `article`
query param and acknowledges the referring article by name, the same
honest "acknowledge the referring context, don't fabricate a prefilled
form" pattern already used for `?solution=`, `?caseStudy=`, and
`?technology=`.

## Analytics

Tracks `knowledge_viewed` once on mount, `knowledge_cta_selected` for
each CTA, and `knowledge_buildpath_started` when Plan Your Roadmap is
selected — see `analytics.ts`.
