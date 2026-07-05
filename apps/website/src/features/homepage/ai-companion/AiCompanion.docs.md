# Byld AI Companion

CLAUDE.md Part 16's AI Companion, implemented as a **rule-based response
system**, not a live LLM — this repository has no backend to call one.
`AiCompanionProvider` mounts a floating trigger (`AiCompanionTrigger`,
built on the existing `FloatingActionButton` seam) and a lazy-loaded
conversation panel (`AiCompanionPanel`, built on `Drawer`), wired into
`AppProviders` so it's available on every page.

## How responses work (`engine/`)

- `intents.ts` matches the visitor's message against a small set of
  keyword patterns (startup/MVP, enterprise/security, commerce/Shopify,
  AI/RAG, platform/infrastructure, compare, BuildPath, pricing) — checked
  in priority order, falling back to a generic response.
- `responses.ts` holds canned, journey-aware copy for the greeting plus
  one response per intent. The "compare technologies" intent is the
  milestone's one illustrative AI tool (a scripted Technology Advisor),
  not the full six-tool suite in CLAUDE.md's Master Section — that's
  BuildPath-scale product surface, not a homepage companion.
- "Streaming" is simulated as a short thinking delay before the reply
  appears (`useAiCompanion`'s `REPLY_DELAY_MS`), not real token streaming.

## State

Conversation state lives in the session-only `ai-companion-store` (Phase 0) — never persisted to `localStorage`, never sent to a server, and reset
on reload, per CLAUDE.md Part 16: "Session memory by default... never
sent to a server." The visitor's journey (from the persisted app store)
drives the initial greeting, so the companion never re-asks something the
site already knows.

## Page context

`pageContext` (`{ label, slug } | null`) is a separate, more specific
signal than `journey`: a page can call `setPageContext()` (e.g. a solution
page, via `SolutionHero`) to make the greeting acknowledge exactly what's
being viewed (`getPageContextGreeting`), without overwriting the
visitor's broader journey preference — which is deliberately a distinct,
explicit choice the visitor makes elsewhere (Journey Selection Engine),
not something a page visit should silently change.

## Scope note

Desktop and mobile share the same `Drawer`-based panel rather than a
separate corner-docked desktop layout and bottom-sheet mobile layout —
a proportionate simplification for this milestone.
