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

`pageContext` (`{ label, slug, groundedReplies? } | null`) is a separate,
more specific signal than `journey`: a page can call `setPageContext()`
(e.g. a solution page, via `SolutionHero`) to make the greeting
acknowledge exactly what's being viewed (`getPageContextGreeting`),
without overwriting the visitor's broader journey preference — which is
deliberately a distinct, explicit choice the visitor makes elsewhere
(Journey Selection Engine), not something a page visit should silently
change.

### Grounded replies (Milestone 11)

`groundedReplies` is an optional list of real `{ question, answer }`
pairs the page itself supplies — e.g. `CaseStudyHero` builds them from a
case study's own `challenge`/`architecture`/`technologyDecisions`/
`whatCouldImprove` fields (CLAUDE.md Part 21: "Ask Byld about this
project... Explains based on the structured project knowledge"). When
present:

- They replace the generic three quick replies in the page-context
  greeting (`getPageContextGreeting`) — capped to the first
  `MAX_GROUNDED_QUICK_REPLIES` (4) so the chip row stays scannable, even
  though `CaseStudyHero` (Milestone 12) supplies one "Why {name}?"
  question per technology decision, not just the first.
- `sendMessage` checks `getGroundedAnswer` for an exact question match
  _before_ the generic keyword-matched `RESPONSES` engine, since no
  keyword rule could derive a page-specific answer from keywords alone.
  This checks the _entire_ `groundedReplies` array regardless of the
  quick-reply cap — a visitor can still get a real answer about a
  technology whose question wasn't shown as a chip, by asking about it
  directly.

Not every `pageContext` sets this — Solutions and Technology pages don't,
since a rule-based greeting is honest enough there without a claim to be
answering from "structured project knowledge" that doesn't exist for a
general solution/technology page the way it does for one specific,
already-shipped project.

## Context awareness (Milestone 9)

Beyond `pageContext` and `journey`, the store also tracks:

- `currentSection` — the homepage section currently in view, kept in
  sync by `HomepageSection`'s `useCurrentSectionSync`. Used for the
  greeting (via `SECTION_LABELS`) only when no more specific
  `pageContext` is set — e.g. opening the companion from the homepage's
  Technology Ecosystem section without having visited a detail page.
- `recentlyViewed` — a capped, deduplicated history built for free from
  every existing `setPageContext()` call site (Solution/Technology/Case
  Study/Knowledge detail pages), so it survives navigating away from
  the page that set it. Used by `getContextualFallback` to make an
  unmatched message reference what the visitor actually looked at,
  instead of the generic static fallback.
- `ctaHistory` — a capped history of a few of the site's most meaningful
  CTAs (the hero's primary/secondary CTA, the Conversion Experience's
  decision cards), recorded via `recordCtaInteraction`. Exposed through
  `useAiCompanion()` for future use; not yet referenced in a response.

## Scope note

Desktop and mobile share the same `Drawer`-based panel rather than a
separate corner-docked desktop layout and bottom-sheet mobile layout —
a proportionate simplification for this milestone.
