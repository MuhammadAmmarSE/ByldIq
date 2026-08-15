# WhatWeBuild

Milestone 9's "What We Build" interactive service overview grid.

## Real solutions, not a fabricated taxonomy

The M9 spec names seven illustrative categories (AI Products, SaaS
Platforms, Mobile Apps, Enterprise Systems, Shopify Solutions,
Automation, AI Integration) that don't map onto any real page on the
site. Building cards for them would either dead-end or duplicate the
real Solutions platform (Milestone 4) with a second, unlinked
taxonomy — both violate CLAUDE.md's "never fabricate, always link to
something real" discipline.

Instead this grid renders the real `SOLUTIONS` entries
(`@/features/solutions` — twelve as of Milestone 10), each linking to
its actual `/solutions/{slug}` page, using the same `SOLUTION_ICONS`
mapping `SolutionCard` uses so iconography stays consistent everywhere a
solution appears.

## Built on `FeatureCard`

Each card is a `FeatureCard` (Milestone 8) with the new `ctaLabel` and
`onClick` props: `ctaLabel` renders a visible "Explore {Solution}" line
so the card reads as an interactive, actionable link rather than a
static tile, and `onClick` fires the `what_we_build_card_clicked`
analytics event with the solution's slug.

## Analytics

Clicking a card fires `what_we_build_card_clicked` with `{ slug }` —
see `analytics.ts`.
