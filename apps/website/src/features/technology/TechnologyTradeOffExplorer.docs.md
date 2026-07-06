# TechnologyTradeOffExplorer

CLAUDE.md Part 22's flagship Trade-Off Explorer. Technology is "never
best," only appropriate or inappropriate for a specific problem — so this
always keeps Best For, Avoid When, and Alternatives available as tabs
rather than rendering a single verdict, plus a quick-facts row (cost,
complexity, team size, scalability) for scannable comparison.

## Quick facts vs. deep narrative

The quick-facts row uses `technology.tradeOff.cost` /
`technology.tradeOff.scalability` — short, scannable values. The page's
later Cost Analysis and Scalability sections use the separate top-level
`technology.costAnalysis` / `technology.scalability` narrative fields for
the deeper explanation. Both exist deliberately (see
`technology.schema.ts`'s doc comment) rather than being the same field
rendered twice.

## Analytics

`technology_trade_off_expanded` fires with `{ slug, section }` whenever a
tab changes — see `analytics.ts`.
