# KnowledgeBookmarkButton

CLAUDE.md Part 18's Reading Experience: bookmarking. Persisted through the
app store's `bookmarkedArticleSlugs` — the same safe-storage-backed
persistence `journey`/`hasSeenIntro` already use (`store/app-store.ts`),
so a bookmark survives a reload and degrades to session-only memory when
storage is blocked, rather than a bespoke second localStorage
implementation.

## Analytics

Fires `knowledge_bookmark_toggled` on every toggle — see `analytics.ts`.
