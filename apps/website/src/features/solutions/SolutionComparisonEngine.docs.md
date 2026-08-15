# SolutionComparisonEngine

Milestone 10's Interactive Comparison section, adapted from the
Technology Explorer's `ComparisonEngine` (CLAUDE.md Part 22) for
`SOLUTIONS` — same table layout, same "never a declared winner"
philosophy, applied to solutions instead of technologies.

## Popular comparisons are real pairs, not fabricated ones

The M10 spec's illustrative "AI Automation vs Manual Workflow" example
has no real second solution to compare against — there is no "Manual
Workflow" entry in `SOLUTIONS`, and inventing one just to fill out this
list would be exactly the kind of fabricated parallel content CLAUDE.md
rules out. Instead, the four popular comparisons pair solutions
visitors would genuinely weigh against each other: SaaS Development vs
Enterprise, Commerce vs Custom Engineering, Startup MVP vs Dedicated
Teams, and Automation vs Custom Engineering. The two `Select` dropdowns
still allow comparing any two of the twelve real solutions.

## Comparison dimensions

Who it's for, the problem it solves, timeline, team, investment, and
outcomes — reusing `Solution`'s own fields (including the Milestone 10
Engagement Snapshot fields) rather than introducing new comparison-only
data.

## Analytics

`solution_comparison_viewed` fires with `{ slugs: [a, b] }` whenever the
compared pair changes — see `analytics.ts`.
