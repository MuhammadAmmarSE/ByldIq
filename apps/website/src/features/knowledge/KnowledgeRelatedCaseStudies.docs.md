# KnowledgeRelatedCaseStudies

CLAUDE.md Part 18's Related Case Studies section: reuses the Proof
Engine's real `ProjectCard` rather than building a second card for the
same content, mirroring `TechnologyRelatedCaseStudies`.

## Empty state

Renders nothing when `relatedCaseStudySlugs` is empty — a genuine,
intentional state (the accessibility checklist article currently has no
real case study connection).

## Analytics

Fires `knowledge_case_study_clicked` when a card is selected — see
`analytics.ts`.
