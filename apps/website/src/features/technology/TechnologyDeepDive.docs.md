# TechnologyDeepDive

CLAUDE.md Part 22's Performance, Security, Accessibility, Scalability, and
Cost sections — grouped into one component since none carry their own
interactivity.

## Heading hierarchy

Each section title renders as `<h2>` (`Heading variant="h3" as="h2"`) —
`TechnologyDetailHero`'s headline owns the page's `<h1>`.

## Stable ids

`#performance`, `#security`, `#accessibility`, `#scalability`, and
`#cost-analysis` are kept for the sticky sidebar/scrollspy a later phase
adds, matching `TechnologyBusinessValue`'s pattern.

## Field mapping note

Uses the top-level `technology.costAnalysis` / `technology.scalability`
narrative fields, not `technology.tradeOff.cost` /
`technology.tradeOff.scalability` — see `technology.schema.ts`'s doc
comment on why both exist (short scannable value vs. deep narrative).
