# KnowledgeSummarizer

CLAUDE.md Part 18/19's "AI summaries" (Milestone 15): four deterministic
summary modes — 30-second, executive, beginner, technical — each built by
recombining the article's own already-authored fields
(`summarize.ts`'s `generateArticleSummary`), never a live model call.
Placed right after `KnowledgeArticleHero`, before the full eleven-section
template, so a visitor can decide how to read before committing to the
article's full reading time.

## Why not a live LLM

CLAUDE.md is explicit: "For the current Mock AI architecture, these can
use deterministic content transformations. Don't pretend an LLM is being
used if it isn't." Each mode is a fixed recombination — e.g. "executive"
is `businessContext` plus the first learning outcome — so switching modes
never invents a fact the article doesn't already state.

## Heading hierarchy

`<h2>` (`Heading variant="h3" as="h2"`) — `KnowledgeArticleHero`'s title
owns the page's `<h1>`, matching every other section on the page.

## Analytics

Tracks `knowledge_summary_mode_selected` with the article slug and the
selected mode whenever a visitor switches tabs.
