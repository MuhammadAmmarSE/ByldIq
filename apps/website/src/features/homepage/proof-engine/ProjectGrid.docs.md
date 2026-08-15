# ProjectGrid

Renders a responsive grid of `ProjectCard`s for a case study list, or an
educational empty state (CLAUDE.md Part 7) when the list is empty —
shared by the homepage's Proof Engine, `/work` (`WorkExplorer`), and
every platform's "Related case studies" section
(`TechnologyRelatedCaseStudies`, etc.).

## Filter motion (Milestone 11)

Cards remaining after a filter change reflow smoothly into their new
grid position via Motion's `layout` prop — CLAUDE.md Part 11: "Filtering.
Cards transition using layout animation," instead of an abrupt
re-render.

Deliberately no `AnimatePresence`/exit animation, and no opacity-based
entrance fade either (an earlier version animated `opacity: 0 -> 1` on
mount):

- A filtered-out card is removed from the DOM immediately (standard
  React behavior), not kept mounted mid-fade — every existing test that
  asserts a filtered-out project disappears synchronously after a filter
  interaction already assumes that.
- An opacity fade-in was tried and reverted after axe's Storybook scan
  caught it mid-transition, at partial opacity blended toward the white
  background — a real, reproducible `color-contrast` failure across four
  stories, not a hypothetical one. `layout` (a transform, not a
  color/opacity change) gives the reflow this section actually needs
  without that risk — see `AnimatedMetric.docs.md` for the same finding
  applied to that component's own (reverted) `Reveal` wrapper.

Respects `prefers-reduced-motion` automatically via `MotionProvider`'s
`reducedMotion="user"` — no per-component opt-in.
