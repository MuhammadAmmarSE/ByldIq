# TechnologyRelatedSolutions

CLAUDE.md Part 22's Solutions integration: reuses the real `SolutionCard`
rather than building a second card for the same content.

## Renders nothing when empty

Unlike Solutions/Case Studies (where every entry always has at least one
curated related item), a technology's `relatedSolutionSlugs` is
deliberately allowed to be empty where no genuine connection exists (see
`technology.schema.ts`) — MongoDB, for example, has none. This component
returns `null` in that case rather than rendering an empty "Where this
shows up" heading with nothing beneath it.

## Analytics

Fires `technology_solution_clicked` with `{ slug, solutionSlug }` when a
card is selected — see `analytics.ts`.
