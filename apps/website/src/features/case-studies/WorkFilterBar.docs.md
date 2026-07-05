# WorkFilterBar

CLAUDE.md Part 21's `/work` filtering: four `Select` facets — industry,
technology, business challenge, and AI involvement — all client-side over
the small, fully-loaded case study dataset, so filtering feels instant
with no loading state.

## Scope note

The spec also lists team size, timeline, and platform as filterable
facets. Not implemented as dropdowns: with a handful of real case studies,
these fields are free-text-ish metadata (`"9 weeks"`, `"2 days -> 12 min"`)
without enough natural, discriminating multi-value spread to make a filter
functional rather than decorative — a dropdown that doesn't meaningfully
narrow results wastes a visitor's attention rather than helping them.
They're still shown as case study metadata on each detail page.

## Controlled

Every facet's state and change handler is owned by the parent
(`WorkExplorer`) — this component has no internal state, matching the
sibling `WorkHero`'s search/industry state.
