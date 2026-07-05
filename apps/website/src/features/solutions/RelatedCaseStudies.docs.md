# RelatedCaseStudies

CLAUDE.md Part 20's Related Case Studies: the one or two case studies
curated for this solution, rendered with the Proof Engine's real
`ProjectCard` rather than a second, duplicate card component.

## Curation note

`relatedCaseStudySlugs` (`data/solutions.ts`) is a hand-picked list per
solution, not derived automatically from shared industry/technology tags.
Cross-referenced against the real case study data in
`solutions.test.ts` ("references only real case studies"), so every
pairing is guaranteed to resolve.

## Analytics

`solution_case_study_clicked` fires with `{ slug, caseStudySlug }` when a
card is clicked — see `analytics.ts`.
