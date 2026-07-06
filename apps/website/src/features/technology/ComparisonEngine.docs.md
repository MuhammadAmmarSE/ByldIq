# ComparisonEngine

CLAUDE.md Part 22's Comparison Engine (`/technology/compare`): pick any
two technologies and see them side by side across the same dimensions —
never a declared winner.

## Data model

A real `<table>` — dimensions as row headers (`scope="row"`), technologies
as column headers (`scope="col"`) — since a comparison is genuinely
tabular data, not a card layout. Each technology's column header links to
its own detail page for deeper reading.

## Popular comparisons

Only two pairs are offered: Next.js vs Remix (both frontend frameworks)
and PostgreSQL vs MongoDB (both databases) — the pairs the real 11-
technology dataset naturally supports. The two `Select` dropdowns still
allow comparing any two technologies (each disables the other's current
selection so a technology can't be compared with itself), but this
component doesn't fabricate "popular" pairs across unrelated categories
(e.g. Kubernetes vs OpenAI) just to fill out a longer list.

## Fallback behavior

`initialSlugA`/`initialSlugB` (used by `/technology/compare?a=&b=`) fall
back to Next.js vs Remix if the given slug isn't a real technology —
mirrors how the rest of the platform's `[slug]` routes 404 on an unknown
technology, but a query-param-driven page degrades to a sensible default
instead of a 404, since the base `/technology/compare` route is meant to
always render something.

## Analytics

`technology_comparison_viewed` fires with `{ slugs: [a, b] }` whenever the
compared pair changes — see `analytics.ts`.
