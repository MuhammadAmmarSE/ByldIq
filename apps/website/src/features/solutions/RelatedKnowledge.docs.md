# RelatedKnowledge

CLAUDE.md Part 20's Knowledge Integration: the one or two Knowledge Center
articles curated for this solution, rendered with the real `ArticleCard`
rather than a second, duplicate card component.

## Curation note

`relatedArticleSlugs` (`data/solutions.ts`) is a hand-picked list per
solution. Cross-referenced against the real article data in
`solutions.test.ts` ("references only real knowledge articles"), so every
pairing is guaranteed to resolve.

## Analytics

`solution_article_clicked` fires with `{ slug, articleSlug }` when a card
is clicked — see `analytics.ts`.
