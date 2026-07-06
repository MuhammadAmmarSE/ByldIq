# KnowledgeExplorer

CLAUDE.md Part 18's `/knowledge` landing page: composes `KnowledgeHero`, a
featured guide, and the filtered `KnowledgeGrid`.

## Featured guide

Shown unconditionally at the top (not affected by search/category filters)
— the same "featured stays visible, All reflects the filter" behavior
`WorkExplorer` uses for case studies. The featured article can also appear
in the "All articles" grid below if it matches the active filter — it
isn't excluded, matching `WorkExplorer`'s exact behavior for
`FEATURED_CASE_STUDIES`.

## Scope note: Learning Paths and Playbooks aren't linked yet

The landing page spec also names Learning Paths and Playbooks entry
points. Those routes (`/knowledge/learning-paths`, `/knowledge/playbooks`)
don't exist yet — they land in later phases of this milestone — so
linking to them now would create the dead links CLAUDE.md Part 8 warns
against. They're added to this page once real, the same way the
Technology Explorer's Architecture Explorer link was added once that
route existed.

## Filtering

Client-side over the small, fully-loaded dataset — no loading state,
filtering feels instant. Category filter options are derived at module
load from the real article data (`POPULATED_CATEGORIES`), so they can
never list a category with zero matching articles.

## Analytics

Fires `knowledge_search` on search input, `knowledge_category_selected` on
category selection, and `knowledge_card_clicked` when a card is selected —
see `analytics.ts`.
