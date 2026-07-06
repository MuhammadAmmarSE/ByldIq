# TechnologyExplorer

CLAUDE.md Part 22's `/technology` landing page: composes `TechnologyHero`,
a "Popular comparisons" section, a link to the Decision Framework, and the
filtered `TechnologyGrid`.

## Popular comparisons

Links straight into `ComparisonEngine` with a pair preselected
(`?a=&b=`) — the same two pairs the real dataset supports
(`ComparisonEngine.docs.md`), plus a generic "Compare any two" link to the
bare `/technology/compare`.

## Scope note: the Architecture Explorer isn't linked yet

The landing page spec also names an "Architecture Explorer" link. That
route (`/technology/architecture`) doesn't exist yet — it lands in a
later Milestone 6 phase — so linking to it now would create the dead
links CLAUDE.md Part 8 warns against. It's added to this page once real.

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
