# CaseStudyRelatedSolutions

CLAUDE.md Part 21's Related Solutions section: reuses the Solutions
Platform's real `SolutionCard` rather than building a second card for the
same content — the same reuse-over-duplication pattern
`RelatedCaseStudies` (in `features/solutions`) uses in the opposite
direction.

## Curation

`relatedSolutionSlugs` is authored per case study in `data/case-
studies.ts`, not derived automatically — every pairing is a deliberate
editorial choice, matching the Solutions Platform's own approach to
`relatedCaseStudySlugs`.

## Analytics

`case_study_solution_clicked` fires with `{ slug, solutionSlug }` when a
related solution card is selected — see `analytics.ts`.
