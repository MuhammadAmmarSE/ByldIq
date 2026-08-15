# CaseStudyBeforeAfter

Milestone 12's Before/After section (CLAUDE.md Part 12: "Where data
exists, create visual comparisons... Never invent measurements. If no
verified measurement exists, don't create one.").

## Sourced from existing metrics, not a new field

Rather than adding a "before" field visitors would need trusting was
real, this parses `metrics[].value` strings that already encode a
transition — `parseBeforeAfter` (`@/utils/before-after`) matches values
like `"2 days -> 12 min"`. Most case study metrics are deltas
(`"+17%"`, `"99.97%"`), not recorded before/after pairs — those don't
render here at all.

## Renders nothing for 4 of 5 case studies

Only `harborline-developer-platform`'s "Environment provisioning" metric
is shaped this way today. `CaseStudyBeforeAfter` returns `null` for
every other case study rather than fabricating a starting baseline for a
metric that's only ever been recorded as a percentage or delta.

## Placement

Between Challenges and Results in the page template, matching CLAUDE.md
Part 12's section order. Not in `CaseStudySidebar` — like
`CaseStudyQuote`, it isn't guaranteed to render for every case study, so
a sidebar link would sometimes point at nothing.
