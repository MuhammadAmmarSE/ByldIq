# BuildPath™ (Milestone 14)

This document covers `apps/website/src/features/buildpath/*`, the store
that backs it (`apps/website/src/store/buildpath-store.ts`), and the
three routes that expose it
(`apps/website/src/app/buildpath/{page,print/page,share/[id]/page}.tsx`),
per CLAUDE.md Milestone 14. It assumes `docs/architecture.md` (the
general layering contract) as background and focuses on what's specific
to BuildPath.

BuildPath is the first milestone in this codebase where the product is a
genuine stateful application, not primarily content. Everything below
follows from that: a persisted answers/derived-recommendations split, a
swappable AI provider, and a single route with URL-synced wizard state
rather than one route per step.

## Routes

| Route                   | Rendering                             | Purpose                                                                                 |
| ----------------------- | ------------------------------------- | --------------------------------------------------------------------------------------- |
| `/buildpath`            | Dynamic (reads referrer query params) | The wizard shell — all 10 stages, one route, `?stage=` query param.                     |
| `/buildpath/print`      | Client-rendered                       | A print-optimized, chrome-free view of the Final Plan; `window.print()` fires on mount. |
| `/buildpath/share/[id]` | Dynamic (decodes `[id]`)              | A read-only rendering of a shared plan — see "Shareable links" below.                   |

`/buildpath` accepts `?solution=`, `?caseStudy=`, `?technology=`, and
`?article=` — the same query-param contract Solutions, Work, Technology,
and Knowledge pages have linked to since earlier milestones (see
`docs/solutions.md`, `docs/case-studies.md`, `docs/technology.md`,
`docs/knowledge.md`). `app/buildpath/page.tsx` resolves whichever param
is present into an `EntryContext` (a human label plus the referring
slug) and, where a reasonable mapping exists
(`features/buildpath/entry-context.ts`), a set of prefilled
`ProjectType`s, then hands both to `BuildPathShell`.

## The answers / recommendations split

This is the central architectural decision (`types.ts`'s file doc
comment):

1. **Answers** (`BuildPathAnswers`) — what the visitor actually entered:
   project types, the Discovery conversation and its structured fields,
   the Problem Definition, target user groups, features, accepted/ignored
   AI suggestions, selected integrations, Platforms/Constraints, and
   timestamps. Persisted to `localStorage` via `buildpath-store.ts`
   (Zustand + `persist`), so progress survives navigation and refresh —
   Save & Resume needs no separate feature; it's what the store already
   does.
2. **Recommendations** — architecture, technology stack, AI
   opportunities, roadmap, team, effort estimate, risks, and the final
   summary. All **derived**, computed fresh from the current answers by
   an `AIProvider` on every render (via `useMemo`), and never persisted
   themselves.

The split exists so a real LLM-backed provider can replace
`MockAIProvider` later without touching the store, the wizard shell, or
any stage component — every consumer only knows "given these answers,
what would you recommend," never how that answer was produced.

## The `AIProvider` abstraction

`features/buildpath/engine/ai-provider.ts` declares the full interface:
`generateFollowUpQuestion`, `nextDiscoveryField`, `draftProblemStatement`,
`suggestFeatures`, `generateArchitecture`, `generateTechnologyStack`,
`generateAiOpportunities`, `generateRoadmap`, `generateTeamRecommendation`,
`generateEffortEstimate`, `generateRisks`, `generateSummary`.

`engine/mock-ai-provider.ts` implements it with **deterministic,
rule-based logic** — no network calls, no randomness beyond
`crypto.randomUUID()` for IDs. `engine/signals.ts`'s `deriveSignals`
computes a shared set of booleans (`isEnterprise`, `isAiProduct`,
`needsAuth`, `needsPayments`, `mustHaveFeatureCount`, ...) from the
answers once, so every generator reasons about the same vocabulary
instead of re-deriving it independently. Stage components call
`mockAIProvider.*` directly (there's no dependency-injection layer yet —
introducing one is exactly the work a real provider swap would do, and
doing it now would be speculative).

Every method's honesty constraints are enforced **structurally**, not by
convention:

- `AiOpportunities.relevant: boolean` — genuinely `false` when nothing
  in the answers points to an AI angle (CLAUDE.md §17: "Don't recommend
  AI merely because it is fashionable"). `AiOpportunitiesStage`'s
  default state (no `AI Product` project type, no AI-flavored features)
  renders exactly that honest "no AI recommended" card.
- `EffortEstimate.teamSizeRange`/`durationRange` are range strings, never
  a number — there's no field to accidentally render as false precision.
- `ProblemStatement.confirmed: boolean`, reset to `false` by
  `updateProblemStatement` itself on every edit (including when a draft
  is applied), and only set `true` by the separate
  `confirmProblemStatement` action — the AI's draft can never end up
  "confirmed" without an explicit, distinct user action.
- `AiFeatureSuggestion.status: "pending" | "added" | "ignored"` and
  `ProductFeature.source: "user" | "ai"` — a suggestion never becomes a
  feature except through `AiFeatureSuggestions.handleAdd`, and the board
  always shows where an accepted feature came from.

## The wizard shell

`BuildPathShell.tsx` owns stage routing, the progress indicator, and
back/forward navigation; it never renders stage content itself —
`renderStage` dispatches to one component per `BuildPathStage`.

- **Single route, `?stage=` query param**, per CLAUDE.md §5's "don't
  unnecessarily create separate browser routes if a stateful flow fits
  better." The store's `stage` field is the source of truth; two
  `useEffect`s keep the URL in sync (URL → store once on mount, so a
  bookmarked link wins; store → URL on every stage change, so
  refresh/back/forward/bookmarking all work).
- **10 granular stages** (`BUILDPATH_STAGES`) grouped into **7 shown
  progress steps** (`data/progress-steps.ts`'s `PROGRESS_GROUPS`) —
  Architecture/Technology/AI Opportunities share one step, as do
  Roadmap/Effort. Visitors care about "figuring out how to build this,"
  not the internal stage count.
- **Entry context applies exactly once**, gated on both `hasHydrated`
  (a runtime-only store field set by `BuildPathStoreProvider` once
  `persist.rehydrate()` resolves) and `startedAt` being null. Without the
  `hasHydrated` gate, the effect would run against the store's
  pre-rehydration default state on every page load — including a
  returning visitor's — and misfire `buildpath_started` and overwrite
  their in-progress project types every time. `applyEntryContext` stamps
  `startedAt` itself when it actually applies, which is what makes the
  "never clobber an in-progress plan" guard fire on a second visit.

## Stage components

Each stage is its own component (`IdeaStage`, `DiscoveryStage` — itself
composed of `DiscoveryConversation`, `ProblemDefinitionPanel`,
`TargetUsersPanel` — `ProductDefinitionStage`, `PrioritizationStage`
(`AiFeatureSuggestions` + `FeatureBoard`), `ArchitectureStage`
(`IntegrationsSelector` + `ArchitectureDiagram`), `TechnologyStage`,
`AiOpportunitiesStage`, `RoadmapStage`, `EffortStage`, `SummaryStage`),
following the standard per-component contract (CLAUDE.md Part 27):
`Name.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`, `.docs.md`. Each
component's own `.docs.md` is the source of truth for that component's
specific decisions; this file only covers what's cross-cutting.

`useBuildPathAnswers()` (`useBuildPathAnswers.ts`) assembles the
persisted store slices into one plain `BuildPathAnswers` object — every
field is its own `useBuildPathStore` subscription, and the result is
`useMemo`-stabilized so an unrelated store change (like `hasHydrated`
flipping) doesn't re-render every stage that reads it. Any stage calling
an `AIProvider` method uses this hook rather than assembling the object
by hand.

### The Discovery conversation

`DiscoveryConversation` is CLAUDE.md §7's "simulated AI conversation
with dynamic follow-ups" — honestly, a keyword/state-driven script
(`DISCOVERY_FLOW` in `mock-ai-provider.ts`), not real NLU, mirroring the
homepage AI Companion's own scripted-not-LLM approach
(`docs/homepage.md`). `nextDiscoveryField` exists alongside
`generateFollowUpQuestion` so the UI knows which `DiscoveryAnswers`
field the _current_ question targets — both read the same
`DISCOVERY_FLOW` table, so they can never disagree. Sending a reply
builds a local `nextAnswers` object by hand (rather than waiting for a
re-render) so Byld's next question can be computed synchronously against
the just-answered field.

The Idea stage's textarea and the Discovery conversation both write to
`discovery.accomplish` — filling it in on Idea means the conversation's
first question is skipped, not asked twice.

### Feature Discovery and AI suggestions

`FeatureBoard` groups `features` into four columns by
`FeaturePriority` (`must`/`should`/`could`/`future` — kept as the real
four values rather than collapsed into exactly "MVP/V1/Future";
`data/feature-labels.ts` labels them "MVP — Must have" through "Future —
Not now"). `AiFeatureSuggestions` implements CLAUDE.md §11's
Add/Ignore/Ask Why exactly: "Add" is the only path from
`AiFeatureSuggestion` to a real `ProductFeature`; "Ask why" reveals the
suggestion's own `reason` field (not a separately generated
explanation); "Ignore" only changes the suggestion's status, never
touches `features`.

### Architecture and Technology

`ArchitectureDiagram` reuses Case Studies' selectable-pipeline pattern
(`CaseStudyArchitecture`, `docs/case-studies.md`) — a chip row in
flow order, click to inspect one node — but every node carries the
fuller What/Why/Alternative/Trade-off/Cost/Scaling explanation CLAUDE.md
§12 asks for ("No black-box AI decisions"), not just a description.
Nodes come from `mockAIProvider.generateArchitecture`, recomputed via
`useMemo` on every render; toggling an integration in
`IntegrationsSelector` changes `answers.integrations`, which changes the
node list immediately — no manual "regenerate" step, because there's
nothing cached to regenerate.

`TechnologyStage` and any architecture node with a `technologySlug`
cross-link to the real `/technology/[slug]` (`docs/technology.md`).

## The Final Plan: exports

`SummaryStage` marks the session `completedAt` the first time it's
viewed, then offers three genuinely working, honestly scoped export
paths (see "Scope boundaries" below for what each one deliberately
doesn't do):

- **Export as PDF** — opens `/buildpath/print`, a dedicated
  print-optimized view (`app/buildpath/print/page.tsx`) that calls
  `window.print()`. No PDF-generation library was added; this is the
  browser's own "Save as PDF" in the print dialog. `print:hidden` keeps
  the chrome (nav, print button) out of the saved document.
- **Share** — `ShareButton` (promoted to shared in Milestone 12, reused
  here unchanged) pointed at `/buildpath/share/{id}`, where `{id}` _is_
  the encoded summary (`share-encoding.ts`'s `encodeSharePayload`/
  `decodeSharePayload`), base64url-encoded with `Buffer` server-side or
  `btoa`/`atob` client-side depending on which is available. There's no
  backend in this codebase to assign an opaque short ID against a
  database row, so the ID carries the payload itself — genuinely
  working, but scoped by URL length, which is why it holds only the
  Final Plan's summary (vision, problem, MVP feature names, next steps,
  project types), not the full session or conversation transcript.
  `app/buildpath/share/[id]/page.tsx` decodes it server-side and renders
  a read-only page, or an honest "this link looks broken" state when
  decoding fails.
- **Copy summary** — a plain-text version of the same summary via
  `navigator.clipboard.writeText`.

## State

- **`buildpath-store.ts`** — the only BuildPath state that's global.
  Factory function (`createBuildPathStore`, not a module singleton) for
  the same Next.js SSR-concurrency-safety reason as `app-store.ts`
  (`docs/homepage.md`); `createSafeStorage()` wraps `localStorage` with
  an in-memory `Map` fallback for private browsing/quota errors;
  `skipHydration: true` plus `BuildPathStoreProvider`'s post-mount
  `persist.rehydrate()` keeps the first client render identical to SSR
  markup.
- Everything else (which suggestion's reason is expanded, the manual
  add-feature form's draft, which architecture node is selected) is
  local `useState`, per `docs/architecture.md`.

## Analytics

Declared in `features/buildpath/analytics.ts`, extended incrementally as
phases shipped: `buildpath_started`, `buildpath_stage_viewed`,
`buildpath_architecture_node_selected`, `buildpath_integration_toggled`,
`buildpath_technology_explorer_clicked`, `buildpath_roadmap_phase_expanded`,
`buildpath_pdf_exported`, `buildpath_summary_copied`, `buildpath_plan_shared`,
`buildpath_feature_added` (tagged `source: "user" | "ai"`),
`buildpath_ai_suggestion_ignored`, `buildpath_problem_confirmed`,
`buildpath_target_user_added`.

## Accessibility

Every stage component's Storybook stories pass the same axe gate as
every other design-system primitive and platform in this codebase.
`e2e/buildpath.spec.ts`'s critical-path test also runs a full-page axe
scan against the completed Final Plan (the most element-dense state the
wizard reaches) — zero violations.

**The same `staggerItem`-opacity color-contrast regression from
Milestone 11/12 was caught here too**, in `ArchitectureDiagram`: axe
flagged the selected chip's `bg-accent`/`text-accent-foreground`
contrast mid-transition (partial opacity blending the accent color
toward the background before the fade settled). Fixed the same way —
`staggerItemTransformOnly` instead of `staggerItem` — plus a separate,
unrelated `dl`/`<div><p>` structure violation (the node detail panel
used a semantic `<dl>` wrapping `Text` components that render `<p>`,
which axe's `definition-list` rule rejects) fixed by using a plain
`<div>` grid instead, since the content was never actually
term/definition pairs.

## Mobile

Verified via a Playwright check at 390px width (`document.documentElement`
`scrollWidth === clientWidth`) across all 10 stages against a production
build — no horizontal overflow anywhere, benefiting from the global
Tailwind breakpoint-token fix made earlier in this session (see git
history around commit `b78c9d1`). No stage-specific "one question at a
time" mobile-only layout was built beyond that; every stage already
reflows to a single column at the `sm` breakpoint via the same
`grid`/`flex-wrap` patterns used throughout this codebase.

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract, plus `share-encoding.test.ts` (pure
  encode/decode round-trip, URL-safety, and garbled-input handling).
- **Storybook a11y** (`vitest --project=storybook`): every stage and
  sub-component's stories, wrapped by the global `StorybookProviders`
  (extended this milestone with `BuildPathStoreProvider`).
- **E2E** (`e2e/buildpath.spec.ts`, Playwright): one long critical-path
  test walking the entire wizard — Idea through a confirmed, exported,
  reloaded-and-still-there Final Plan, including a real Radix `Select`
  interaction (feature priority) and a full-page axe scan at the end —
  plus focused tests for entry-context prefill from a Solution referrer,
  Start Over, the shareable link (both a valid and a deliberately
  garbled ID), and the print view.

## Scope boundaries

Honest gaps, documented rather than silently shipped:

| What the spec asks for                                                             | What's actually built                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A real AI conversation (dynamic, open-ended follow-ups)                            | A deterministic, scripted `DISCOVERY_FLOW` — honest about being a mock, same pattern as the homepage AI Companion. The `AIProvider` abstraction is what makes swapping this for a real LLM a contained change.          |
| PDF export via a generation library/service                                        | Browser-native print-to-PDF via a dedicated print view and `window.print()` — a real, working PDF, without adding a rendering dependency for one export path.                                                           |
| A shareable link backed by persisted storage / a real short ID                     | The `[id]` segment _is_ the encoded payload — no backend exists in this codebase to assign an opaque ID against. Scoped by URL length; carries only the Final Plan summary, not the full session.                       |
| Authenticated, cross-device Save & Resume                                          | Anonymous, browser-local persistence only (`localStorage`) — CLAUDE.md §26 explicitly permits this for now ("Anonymous sessions can initially use local/session persistence"), with authenticated persistence deferred. |
| Debounced persistence for performance                                              | Not implemented — Zustand's `persist` middleware writes synchronously on every state change, which has been fine at this data volume; debouncing would be a real but currently unneeded optimization.                   |
| A dedicated mobile "one question at a time" wizard layout                          | Not built — every stage already reflows to one column via the same responsive grid/flex patterns used everywhere else in this codebase; verified overflow-free at 390px width rather than redesigned.                   |
| Voice input, screen sharing, live whiteboarding (BuildPath's stated future vision) | Not built — explicitly out of scope for this milestone, named as future direction only.                                                                                                                                 |

## Cross-cutting entry points

`/buildpath` was already linked from every planned surface before this
milestone even began routing real content there: the primary nav
(`config/site.ts`), the homepage's BuildPath preview and Conversion
Experience, the About page's hero and final CTA, every Solution's hero
and final CTA (`?solution=`), every case study's hero and final CTA
(`?caseStudy=`), every Technology detail page's hero and final CTA
(`?technology=`), every Knowledge article's hero and final CTA
(`?article=`), the Command Palette, and the AI Companion's own
`buildpath` intent. This milestone's job was making the destination real
rather than wiring new links to it — the query-param contract each of
those surfaces already used is unchanged.
