# TechnologySidebar

CLAUDE.md Part 8's sticky sidebar + scrollspy navigation, applied to
technology pages: an "on this page" table of contents that highlights the
section currently in view. Mirrors `SolutionSidebar`.

## Scope note

The section list is a fixed, hand-authored array (id + label) rather than
derived from `Technology` data, since CLAUDE.md Part 22 requires every
technology page to share the same section order. Related-content links
are included even for technologies where that section renders nothing
(see `TechnologyRelatedSolutions.docs.md`) — deriving a per-technology
sidebar just to hide a link isn't worth the added complexity.

Desktop only (`lg:` breakpoint and up, applied by the page template that
composes this).

## How it works

Uses `useScrollSpy` (`src/hooks/useScrollSpy.ts`) to watch every section's
`id` via `IntersectionObserver` and report whichever one is currently
topmost in the viewport.
