# TechnologyExplorer

CLAUDE.md Part 22's `/technology` landing page: composes `TechnologyHero`
and the filtered `TechnologyGrid`.

## Scope note: comparisons, architecture, and the decision wizard aren't linked yet

The landing page spec also names "Popular comparisons," an "Architecture
Explorer" link, and a "Decision Wizard" link. Those routes
(`/technology/compare`, `/technology/architecture`,
`/technology/decision-framework`) don't exist yet — they land in later
Milestone 6 phases — so linking to them now would create the dead links
CLAUDE.md Part 8 warns against. They're added to this page once real.

## Scope note: no "latest" ranking

Every technology renders under "All technologies" rather than a separate
"Latest" section — there's no real publish-date or update-recency signal
in the dataset to rank by, and fabricating one would be the same kind of
invented ordering `WorkExplorer`'s docs reject for "trending projects."

## Filtering

Client-side over the small, fully-loaded dataset — no loading state,
filtering feels instant. Category filter options are derived at module
load from the real technology data (`POPULATED_CATEGORIES`), so they can
never list a category with zero matching technologies.

## Analytics

Fires `technology_search` on search input, `technology_category_selected`
on category selection, and `technology_card_clicked` when a card is
selected — see `analytics.ts`.
