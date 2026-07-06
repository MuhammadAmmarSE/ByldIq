# TechnologyRelatedKnowledge

CLAUDE.md Part 22's Knowledge Integration: reuses the Knowledge Center
preview's real `ArticleCard` rather than building a second card for the
same content.

## Renders nothing when empty

Same reasoning as `TechnologyRelatedSolutions`: `relatedArticleSlugs` is
deliberately allowed to be empty (MongoDB, for example, has none), and
this component returns `null` rather than rendering an empty heading.

## Analytics

Fires `technology_article_clicked` with `{ slug, articleSlug }` when a
card is selected — see `analytics.ts`.
