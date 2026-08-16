# EngineeringStandards

CLAUDE.md Milestone 13 §5's Engineering Standards: ten manifesto-style
statements (`data/engineering-standards.ts`), restating CLAUDE.md Part
24's Engineering Constitution ("Core Principles") in the spec's own
punchy voice — e.g. "Performance — We don't optimize because benchmarks
look good. We optimize because users notice latency."

## Why this doesn't duplicate `EngineeringExcellenceEngine`

The homepage's `EngineeringExcellenceEngine` (CLAUDE.md Part 15) already
demonstrates _how_ these principles show up in this actual repository —
real CI stages, real testing tools, a real deployment pipeline. This
component states _why_ they exist instead of repeating that procedural
detail. The "See it in practice" link (`/#engineering-excellence`)
connects the two.

## Motion

Statements reveal via `staggerItemTransformOnly`, not the fade-based
`staggerItem` — see `CaseStudyEngineeringProcess.docs.md` for why this
codebase defaults to transform-only reveals for text content.

## Analytics

`about_engineering_principle_viewed` fires with `{ principle }` on hover.
`about_cta_selected` fires with `{ cta: "engineering-excellence" }` on the
"See it in practice" link — see `analytics.ts`.
