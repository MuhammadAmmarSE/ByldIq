# CaseStudyOverview

CLAUDE.md Part 21's Executive Summary and Business Challenge sections,
grouped into one component since neither carries its own interactivity —
mirrors `SolutionOverview`'s reasoning for the same grouping. Each keeps a
stable `id` (`#executive-summary`, `#business-challenge`) for the sticky
sidebar/scrollspy a later phase adds once every section exists.

## Order

Executive summary first (a CTO-readable overview of the whole story), then
the business challenge in full — problem, why it mattered, constraints,
risks, and success criteria — before any engineering content appears
(CLAUDE.md Part 21: "the hero is never us... tell the story of the
client").

## Heading hierarchy

Each section title renders as `<h2>` (`Heading variant="h3" as="h2"`);
the constraints/risks/success-criteria sub-headings render as `<h3>`
(`Heading variant="h6" as="h3"`) — `CaseStudyHero`'s headline owns the
page's `<h1>`.
