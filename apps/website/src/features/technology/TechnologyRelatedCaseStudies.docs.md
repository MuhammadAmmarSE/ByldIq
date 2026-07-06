# TechnologyRelatedCaseStudies

CLAUDE.md Part 22's Case Study integration: reuses the Proof Engine's real
`ProjectCard` rather than building a second card for the same content.

## Renders nothing when empty

Same reasoning as `TechnologyRelatedSolutions`: `relatedCaseStudySlugs` is
deliberately allowed to be empty (Remix, for example, has none), and this
component returns `null` rather than rendering an empty heading.

## Analytics

Fires `technology_case_study_clicked` with `{ slug, caseStudySlug }` when
a card is selected — see `analytics.ts`.
