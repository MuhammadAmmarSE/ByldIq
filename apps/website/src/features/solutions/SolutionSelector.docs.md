# SolutionSelector

The interactive grid of all nine `SolutionCard`s (CLAUDE.md Part 20). One
card is highlighted via `getRecommendedSolution` when the visitor has
already chosen a homepage journey — the recommendation only reprioritizes,
it never removes the other eight from the grid.

## Behavior

- Reads `journey` from the shared `useAppStore` (the same journey chosen
  on the homepage) — no separate selection step on this page.
- Every card is a real link (`role="listitem"` wrapping an `<a>`), reachable
  by Tab in document order — no custom roving-tabindex needed since these
  aren't a mutually-exclusive radio choice.

## Analytics

`solution_card_hovered`, `solution_card_selected` — see `analytics.ts`.
