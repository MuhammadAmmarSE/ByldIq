# BuildPathShell

CLAUDE.md Milestone 14's wizard shell: stage routing, the 7-group
progress indicator (§33), back/forward navigation, and entry-context
capture. One `/buildpath` route with a `?stage=` query param, per §5's
"don't unnecessarily create separate browser routes if a stateful flow
fits better" — the store (`buildpath-store.ts`) is the source of truth
for the current stage; the URL is kept in sync so refresh, browser
back/forward, and bookmarking a specific stage all work without a
dedicated route per stage.

## Answers vs. recommendations

`types.ts` splits BuildPath's data into two kinds: what the visitor
actually entered (`BuildPathAnswers`, persisted to `localStorage` via
`buildpath-store.ts`) and generated recommendations (architecture,
technology stack, roadmap, team, effort, risks, summary — all derived,
computed fresh by `engine/mock-ai-provider.ts` on every render, never
persisted themselves). Swapping in a real LLM-backed provider later means
implementing `engine/ai-provider.ts`'s `AIProvider` interface again —
nothing in the store, the wizard shell, or the stage UIs has to change.

## Entry context

Solutions, Work (case studies), Technology, and Knowledge pages link to
`/buildpath` with a `?solution=`/`?caseStudy=`/`?technology=`/`?article=`
query param. `app/buildpath/page.tsx` resolves that into an
`EntryContext` (a human label plus the referring slug) and, where a
reasonable mapping exists (`entry-context.ts`), a set of prefilled
`ProjectType`s. `BuildPathShell` applies this exactly once, only on a
genuinely fresh session (`store.applyEntryContext`, guarded by
`startedAt`) — a second visit, or navigating here mid-plan from a
different referrer, never overwrites in-progress work.

That guard only works because `hasHydrated` (a runtime-only flag on the
store, set by `BuildPathStoreProvider` once `persist.rehydrate()`
resolves) gates the entry-context effect. Without it, the effect would
run against the store's pre-rehydration default state on every reload —
including returning visitors — and misfire `buildpath_started` every
time.

## Stage content

`renderStage` is a placeholder for every stage as of Phase 1 — Phases 2–8
replace one `case` at a time with real stage UI (Idea/Discovery,
Product, Prioritization, Architecture, Technology/AI Opportunities,
Roadmap/Effort, Summary) without touching this file's navigation,
persistence, or entry-context logic.

## Analytics

`buildpath_started` fires once per fresh session with the entry
context's `source`. `buildpath_stage_viewed` fires on every stage
change. See `analytics.ts` — extended incrementally as later phases add
their own events (feature suggestions, exports, etc.).
