# ApproachTimeline

CLAUDE.md Milestone 13 §4's "The Byld IQ Approach": nine interactive
stages (Understand → Explore → Define → Design → Architect → Build →
Validate → Launch → Evolve).

## Why not reuse `ProductThinkingTimeline`

The homepage's `ProductThinkingTimeline` (CLAUDE.md Part 12) is a close
cousin — same interaction pattern, a different question. That timeline
explains how Byld IQ thinks about product development in general (ten
stages: Idea through Growth). This one explains what a real client
engagement actually looks like, stage by stage, answering the spec's
specific fields: what happens, who participates, deliverables, typical
decisions, how AI assists, what success looks like. Reusing the
homepage's component (or its content) would either answer the wrong
question or force one dataset to serve two different narratives —
duplicating the _pattern_ (Tabs, `StagePanel`-shaped side panel) while
keeping the content genuinely distinct was the more honest option.

## Analytics

`about_approach_stage_viewed` fires with `{ stage }` on tab change — see
`analytics.ts`.
