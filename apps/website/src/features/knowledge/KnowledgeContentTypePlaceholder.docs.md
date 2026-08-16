# KnowledgeContentTypePlaceholder

Backs `/knowledge/whitepapers` and `/knowledge/videos` — two content
types CLAUDE.md Part 18 names that don't exist as real content yet.
`/knowledge/tutorials` used this component until Milestone 15 gave it a
real content model (`data/tutorials.ts`) and a real listing
(`KnowledgeTutorials`) — see that component's own docs.

## Why these routes exist with nothing behind them

CLAUDE.md Part 8's "Empty Navigation" rule: a category with no content
should never render a blank page or 404 — it should recommend what's
real instead. Rather than wait until whitepapers/videos exist to build
these routes (deferring them indefinitely, the way Playbooks, Learning
Paths, and Tutorials were each deferred until real content existed), or
fabricate placeholder entries to make the pages look populated, each
route states the gap honestly and points to the Knowledge Center content
that actually exists today.

## Not linked from navigation

`app/layout.tsx`'s Knowledge mega menu deliberately excludes these two
routes — putting an empty section in primary navigation next to
populated ones (categories, Learning Paths, Playbooks, Tutorials) would
misrepresent the collection. They're reachable directly and will join
the menu once real content exists behind them.

## Excluded from the sitemap

Same reasoning as `/knowledge/search`: a page with no content of its
own has nothing worth indexing.
