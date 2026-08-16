# AboutSidebar

Sticky, scrollspy-driven in-page navigation for the About page — the same
`useScrollSpy` pattern `CaseStudySidebar`/`SolutionSidebar` use, desktop
only.

## Section list

A fixed, hand-authored list of twelve sections (`SECTIONS`), not derived
from data — the About page's structure doesn't vary. "How we work with
clients" and "Transparency" are two anchors rendered by one component
(`HowWeWorkSection`), the same "one component, two ids" pattern
`CaseStudyOverview` uses for Executive Summary/Business Challenge.

`get-started` (the final CTA) is excluded — it renders full-width outside
the sidebar grid.

## Analytics

`about_section_viewed` fires with `{ section }` when the active section
changes — see `analytics.ts`.
