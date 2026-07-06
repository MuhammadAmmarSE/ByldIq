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

## Scope note: Playbooks isn't linked yet

The landing page spec also names a Playbooks entry point. That route
(`/knowledge/playbooks`) doesn't exist yet — it lands in a later phase of
this milestone — so linking to it now would create the dead link
CLAUDE.md Part 8 warns against. It's added to this page once real, the
same way the Technology Explorer's Architecture Explorer link was added
once that route existed. Learning Paths is linked below the hero now
that `/knowledge/learning-paths` is real.

## Filtering

Client-side over the small, fully-loaded dataset — no loading state,
filtering feels instant. Category filter options are derived at module
load from the real article data (`POPULATED_CATEGORIES`), so they can
never list a category with zero matching articles.

## Analytics

Fires `knowledge_search` on search input, `knowledge_category_selected` on
category selection, and `knowledge_card_clicked` when a card is selected —
see `analytics.ts`.
