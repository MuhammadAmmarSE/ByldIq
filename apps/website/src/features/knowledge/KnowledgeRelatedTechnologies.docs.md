# KnowledgeRelatedTechnologies

CLAUDE.md Part 18's Related Technologies section: reuses the Technology
Explorer's real `TechnologyCard` rather than building a second card for
the same content, mirroring `TechnologyRelatedSolutions`'s reuse of
`SolutionCard` for the reverse relationship.

## Empty state

Renders nothing when `relatedTechnologySlugs` is empty. Every one of the
five real articles currently has at least one related technology, but the
component still handles the empty case explicitly since a future article
might not.

## Analytics

Fires `knowledge_technology_clicked` when a card is selected — see
`analytics.ts`.
