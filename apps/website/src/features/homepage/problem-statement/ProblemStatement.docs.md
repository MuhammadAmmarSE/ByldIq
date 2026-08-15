# ProblemStatement

Milestone 9's Problem Statement section: real statistics, four
well-documented failure patterns, and a transition into how Byld IQ's
process addresses each one.

## Statistics are real, not invented

CLAUDE.md's "never fabricate numbers" applies to industry statistics
as much as to Byld IQ's own claims. Both figures shown (45% average
cost overrun, 56% less value delivered) come from McKinsey & Company
and the University of Oxford's "Delivering large-scale IT projects on
time, on budget, and on value" — research covering more than 5,400 IT
projects — cited visibly under each stat, not presented as an
unsourced claim. `MetricCard` (Milestone 8 Phase C) is reused directly
for both.

## Pain points are industry-standard, not fabricated for this site

The four expandable items (`data/pain-points.ts`) map directly onto the
top failure factors IT project research repeatedly identifies:
incomplete/changing requirements, lack of user involvement until late,
and technology chosen without evaluating trade-offs. None of the four
make a specific numeric claim — they're qualitative, well-established
patterns, each paired with how Byld IQ's actual process (BuildPath,
engineering discipline, staged validation, the Technology Explorer's
trade-off framing) addresses it.

## Interactive cards, built on Accordion

Each pain point is a Radix `Accordion` item styled as an individual
card (border/shadow/radius, not the default flush border-b treatment)
rather than a custom expand/collapse implementation — full keyboard
and screen-reader support for free, styled to read as cards per the
spec's "Interactive cards" requirement.

## Analytics

Expanding a pain point fires `problem_pain_point_expanded` with its
`id` — see `analytics.ts`.
