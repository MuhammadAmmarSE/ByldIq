# KnowledgeRelatedSolutions

Milestone 15's Solutions integration: reuses the Solutions platform's
real `SolutionCard` rather than building a second card for the same
content — the same reuse `KnowledgeRelatedTechnologies` and
`TechnologyRelatedSolutions` already follow. Completes the loop
Solutions' own `RelatedKnowledge` started one-way.

## Why this didn't exist before Milestone 15

`knowledge-article.schema.ts` originally documented a deliberate
decision to omit `relatedSolutionSlugs` — CLAUDE.md Part 18's article
template names Related Technologies and Related Case Studies, not
Related Solutions, and Solutions already linked out to Knowledge.
Milestone 15's spec explicitly lists "Solutions integration works" as a
Definition of Done item, so that decision was revisited: the field and
this component now complete the relationship in both directions.

## Empty state

Renders nothing when `relatedSolutionSlugs` is empty — a genuine,
honest state. `accessibility-checklist-for-product-teams` has none: an
accessibility checklist isn't "sold" as any one Solution, and forcing a
link would misrepresent the relationship.

## Analytics

Fires `knowledge_solution_clicked` when a card is selected.
