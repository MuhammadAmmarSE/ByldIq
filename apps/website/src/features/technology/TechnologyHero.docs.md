# TechnologyHero

CLAUDE.md Part 22's `/technology` landing page hero: introduces the
platform's core philosophy ("technology is never best, only appropriate or
inappropriate for a specific problem") with search, quick category
filters, and an AI entry point.

## Controlled, not self-contained

`query` and `categoryFilter` are owned by the parent (`TechnologyExplorer`),
not this component — the same search and category state also drives the
grid below the hero, so there's one source of truth.

## Categories

Only categories with at least one real technology are passed in (see
`data/facets.ts`'s `POPULATED_CATEGORIES`) — an empty filter chip would be
a dead end.

## Analytics

Doesn't track directly — `TechnologyExplorer` tracks `technology_search`
and `technology_category_selected` from the state changes this component
reports.
