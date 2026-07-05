# SolutionOverview

CLAUDE.md Part 20's Business Problem, Business Outcomes, and Engineering
Philosophy sections, grouped into one component since none carry their
own interactivity — each keeps a stable `id` (`#business-problem`,
`#business-outcomes`, `#engineering-philosophy`) for the sticky
sidebar/scrollspy a later phase adds.

## Order

Problem, then outcomes, then philosophy — the customer's pain always
comes before Byld IQ's approach to it (CLAUDE.md Part 20: "Start with the
customer's pain. Never begin by talking about Byld IQ").

## Heading hierarchy

Each section title renders as `<h2>` (`Heading variant="h3" as="h2"`) —
`SolutionHero`'s headline owns the page's `<h1>`.
