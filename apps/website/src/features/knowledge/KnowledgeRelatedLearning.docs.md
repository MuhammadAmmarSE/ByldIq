# KnowledgeRelatedLearning

CLAUDE.md Part 18's Related Learning section — the article template's
eleventh and final section: reuses the Knowledge Center preview's real
`ArticleCard` rather than building a second card for the same content,
mirroring `TechnologyRelatedKnowledge`.

## Empty state

Renders nothing when `relatedArticleSlugs` is empty — a genuine,
intentional state (three of the five real articles currently have no
related-article connection).

## Analytics

Fires `knowledge_related_article_clicked` when a card is selected — see
`analytics.ts`.
