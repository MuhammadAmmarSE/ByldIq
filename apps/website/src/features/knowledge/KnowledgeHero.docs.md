# KnowledgeHero

CLAUDE.md Part 18's `/knowledge` landing page hero: introduces the
Knowledge Center's philosophy (an engineering learning platform, not a
blog) with search, quick category filters, and an AI entry point.

## Controlled, not self-contained

`query` and `categoryFilter` are owned by the parent (`KnowledgeExplorer`),
not this component — the same search and category state also drives the
grid below the hero, so there's one source of truth.

## Categories

Only categories with at least one real article are passed in (see
`data/facets.ts`'s `POPULATED_CATEGORIES`) — an empty filter chip would be
a dead end.

## Analytics

Doesn't track directly — `KnowledgeExplorer` tracks `knowledge_search` and
`knowledge_category_selected` from the state changes this component
reports.
