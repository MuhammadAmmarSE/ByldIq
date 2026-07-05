# SolutionSidebar

CLAUDE.md Part 8's sticky sidebar + scrollspy navigation, applied to
solution pages: an "on this page" table of contents that highlights the
section currently in view.

## Scope note

The section list is a fixed, hand-authored array (id + label) rather than
derived from `Solution` data, since CLAUDE.md Part 20 requires every
solution page to share the same section order — the structure doesn't
vary per solution, only the content within each section does.

Desktop only (`lg:` breakpoint and up, applied by the page template that
composes this). Mobile already has the bottom nav dock, and eleven anchor
links don't fit a small viewport usefully.

## How it works

Uses `useScrollSpy` (`src/hooks/useScrollSpy.ts`) to watch every section's
`id` via `IntersectionObserver` and report whichever one is currently
topmost in the viewport.
