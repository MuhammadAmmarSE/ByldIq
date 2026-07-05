# KnowledgeCenterPreview

CLAUDE.md Part 18's Knowledge Center, previewed on the homepage: one
featured guide (`FeaturedGuideCard`) plus a grid of articles
(`ArticleCard`) spanning Product Strategy, Architecture, AI, Accessibility,
and Commerce.

## Content

Articles are local typed data (`data/articles.ts`), not a real CMS —
`content-collections.ts` already defers real content modeling to a future
Knowledge Center milestone, so this preview follows the same convention
Phase 5 (Proof Engine) established for local, schema-shaped mock content.

## "Ask Byld" summaries

Each card's "Ask Byld to summarize" button expands a pre-written,
AI-styled summary in place, rather than opening the AI Companion (Phase 8) for a live, topic-specific answer it isn't built to generate — a
proportionate simplification for a homepage preview, not a live AI call.

## Navigation

Every article links to a real `/knowledge/[slug]` page (plus a
`/knowledge` index), consistent with the Proof Engine and BuildPath
Preview's stub-route pattern — no dead ends.
