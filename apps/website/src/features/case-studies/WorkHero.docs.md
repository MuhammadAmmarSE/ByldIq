# WorkHero

CLAUDE.md Part 21's `/work` landing page hero: introduces the platform's
philosophy ("Engineering Stories, Not Portfolios") with search, quick
industry filters, an AI entry point, and a pointer to the featured case
study — everything the spec's hero section asks for in one place.

## Controlled, not self-contained

`query` and `industryFilter` are owned by the parent (`WorkExplorer`), not
this component — the same search and industry state also drives the
filter bar and grid below the hero, so there's one source of truth rather
than two independent filter mechanisms that could disagree.

## Categories

CLAUDE.md Part 21 also asks the landing page to "Support: Categories" —
the quick industry filter chips serve that role rather than a separate
category browsing section, since industry is the facet with the most
natural, meaningful spread across the real case study data.

## Analytics

Doesn't track directly — `WorkExplorer` tracks `work_search` and
`work_filter_changed` from the state changes this component reports.
