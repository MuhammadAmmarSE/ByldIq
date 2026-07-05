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
accordion item expands — see `analytics.ts`.
