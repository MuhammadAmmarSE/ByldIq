# AdaptiveHero

CLAUDE.md Part 11's Adaptive Value Proposition Engine — the first content
section after Journey Selection. Headline, supporting copy, both CTAs,
trust indicators, and the product preview panel all come from a single
`useJourneyContent(HERO_CONTENT)` lookup (`data/hero-content.ts`), so
selecting or resetting a journey (Phase 2's `JourneySelector`) updates this
section instantly with no reload.

## Content source

`HERO_CONTENT` has one entry per `Journey` plus `default`. Copy for the five
journeys is verbatim from CLAUDE.md Part 11. `trustIndicators` are
qualitative capability labels, not statistics — Byld IQ has no client
history yet to substantiate numeric trust claims (CLAUDE.md Part 13: "never
invent numbers"). The preview panel's `metric` is explicitly illustrative
mock-dashboard data, the same convention the Interactive Product Showcase
(Part 14) uses for its fictional companies — not a claim about Byld IQ
itself.

## CTAs

Both CTAs are anchor links into other homepage sections (`#buildpath-preview`,
`#proof-engine`) built in later phases, rather than routes that don't exist
yet. Every click fires `hero_cta_clicked` with the current journey.

## Motion

The content block and preview panel are keyed on the current journey, so
changing journeys remounts and replays the stagger-in entrance — CLAUDE.md
Part 11: "All transitions smooth. No page reload."

## Background

`HeroBackdrop` (Milestone 9's "Hero Animation" requirements) sits behind
the content grid inside a `relative overflow-hidden` wrapper — see its
own `.docs.md`.
