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

## Learning Paths and Playbooks

Both are linked below the hero now that `/knowledge/learning-paths` and
`/knowledge/playbooks` are real routes with real content behind them.

## Filtering

Client-side over the small, fully-loaded dataset — no loading state,
filtering feels instant. Category filter options are derived at module
load from the real article data (`POPULATED_CATEGORIES`), so they can
never list a category with zero matching articles.

## Analytics

Fires `knowledge_search` on search input, `knowledge_category_selected` on
category selection, and `knowledge_card_clicked` when a card is selected —
see `analytics.ts`.
