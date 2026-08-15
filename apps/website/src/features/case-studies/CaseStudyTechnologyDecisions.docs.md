# CaseStudyTechnologyDecisions

CLAUDE.md Part 21's Technology Decisions section: why each technology was
chosen for this specific project, not just naming the stack (CLAUDE.md
Part 22: "technology is never 'best', only appropriate or inappropriate
for a specific problem").

## Relationship to `TechnologyExplorer`

Same Accordion interaction pattern as the Solutions Platform's
`TechnologyExplorer`, extended with two fields a retrospective case study
needs that a forward-looking solution page doesn't:

- `businessImpact` — what the choice actually meant for the business,
  now that the project shipped.
- `maintenanceConsiderations` — what living with the choice has been
  like since launch.

`when` and `scalability`/`teamRequirements` (from `TechnologyExplorer`)
aren't part of this model — those describe general fit for a prospective
solution; a case study only needs to explain the decision that was
actually made.

## Analytics

`case_study_technology_clicked` fires with `{ slug, technology }` when an
accordion item expands. `case_study_technology_explorer_clicked` fires
with `{ slug, technology, technologySlug }` when the Technology Explorer
cross-link (below) is clicked — see `analytics.ts`.

## Cross-link to the real Technology Explorer (Milestone 11)

Each expanded technology also links to `/technology/[slug]` (CLAUDE.md
Part 22) when that technology is one of the 11-technology roster there —
`TECHNOLOGY_EXPLORER_SLUGS` looks up a real match via `slugify`, so a
technology this codebase's Technology Explorer doesn't cover yet (e.g.
"Backstage", "Klaviyo", "Event-driven architecture") never gets a dead
link.

Imports `TECHNOLOGIES` from `@/features/technology/data/technologies`
(the leaf data file), not the feature's barrel — the barrel also exports
`TechnologyRelatedCaseStudies`, which imports back from this feature's
own barrel, and going through both barrels here would create a circular
module dependency. Same reasoning `CaseStudyRelatedSolutions` already
applies to `@/features/solutions`.
