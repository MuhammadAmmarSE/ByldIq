# KnowledgeContentTypePlaceholder

Backs `/knowledge/whitepapers`, `/knowledge/videos`, and
`/knowledge/tutorials` — three content types CLAUDE.md Part 18 names
that don't exist as real content yet.

## Why these routes exist with nothing behind them

CLAUDE.md Part 8's "Empty Navigation" rule: a category with no content
should never render a blank page or 404 — it should recommend what's
real instead. Rather than wait until whitepapers/videos/tutorials exist
to build these routes (deferring them indefinitely, the way Playbooks
and Learning Paths were deferred until real content existed), or fabricate
placeholder entries to make the pages look populated, each route states
the gap honestly and points to the Knowledge Center content that
actually exists today: articles, Playbooks, and Learning Paths.

## Not yet linked from navigation

These routes aren't linked from `KnowledgeExplorer` or any nav yet —
that's Phase 10 (Knowledge mega menu navigation), which decides how (or
whether) to surface an intentionally-empty content type without
implying it's populated. They exist now so that work has something real
to link to.

## Excluded from the sitemap

Same reasoning as `/knowledge/search`: a page with no content of its
own has nothing worth indexing.
