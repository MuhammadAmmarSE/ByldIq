# KnowledgeLearningPathDetail

CLAUDE.md Part 18's Learning Path detail: the ordered article sequence, a
progress bar, and per-step completion checkboxes.

## Completion persistence

Completion is persisted through the app store's `completedArticleSlugs` —
the same safe-storage-backed persistence `bookmarkedArticleSlugs` already
uses (`store/app-store.ts`), not a second bespoke mechanism.

## Certificates aren't built

The spec names certificates as a Learning Path feature. There's no user
account or identity system to issue a certificate against, so this isn't
built — a certificate with no verifiable identity behind it wouldn't mean
anything.

## Analytics

Tracks `learning_path_started` from "Start this path" and
`learning_path_step_selected` when any step's article link is
selected — see `analytics.ts`.
