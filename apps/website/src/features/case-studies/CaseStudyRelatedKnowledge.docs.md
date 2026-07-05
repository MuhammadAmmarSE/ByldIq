# CaseStudyRelatedKnowledge

CLAUDE.md Part 21's Knowledge Integration: reuses the Knowledge Center
preview's real `ArticleCard` rather than building a second card for the
same content, mirroring the Solutions Platform's `RelatedKnowledge`.

## Curation

`relatedArticleSlugs` is authored per case study in `data/case-
studies.ts`, not derived automatically.

## Analytics

`case_study_article_clicked` fires with `{ slug, articleSlug }` when a
related article card is selected — see `analytics.ts`.

## Why no separate "Related Technologies" section

CLAUDE.md Part 21 also lists "Related Technologies." `CaseStudyTechnology
Decisions` already covers every technology this project used in full
depth (why, trade-offs, alternatives, business impact, maintenance) —
there's no separate Technology Explorer platform yet to link a shorter
badge list out to, so a second, shallower technology list here would
duplicate content already on the page rather than adding a new
destination. Revisit once a Technology Explorer platform exists.
