# WorkExplorer

CLAUDE.md Part 21's `/work` landing page: composes `WorkHero`,
a "Featured work" section, `WorkFilterBar`, and the filtered project grid.
Reuses the Proof Engine's `ProjectGrid`/`ProjectCard` rather than a second
card implementation for the same content.

## Featured work is evergreen

The "Featured work" section always shows the same curated items
(`featured: true` case studies) regardless of the active search or
filters — only the "All engineering stories" grid below it reacts to
filtering. This is a deliberate choice: featured content is curated,
not a query result, so it shouldn't disappear just because a visitor is
searching for something else.

## Scope note: no "trending" ranking

CLAUDE.md Part 21 also names "Trending projects" as landing-page content.
Not implemented as a ranked section: there's no real traffic or engagement
data yet to rank by, and fabricating a trending order would be the same
kind of invented signal CLAUDE.md's "never fabricate numbers" principle
warns against, just applied to a ranking instead of a metric. The full
grid below Featured serves discovery instead.

## Filtering

Client-side over the small, fully-loaded dataset — no loading state,
filtering feels instant. Industry and technology filter options are
derived at module load from the real case study data (not hand-authored),
so they can never list a facet value with zero matching case studies.

## Analytics

Fires `work_search` on search input, `work_filter_changed` (tagged with
the facet name) on every filter change, and `work_project_clicked` when a
card is selected — see `analytics.ts`.
