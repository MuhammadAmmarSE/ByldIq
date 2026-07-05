# SolutionsHero

The Solutions landing page's hero (CLAUDE.md Part 20): journey-aware
headline/copy, a context-aware primary CTA, and an AI entry point.

## Content source

`SOLUTIONS_HERO_CONTENT` (`data/hero-content.ts`) has one entry per
`Journey` plus `default`, via the same `useJourneyContent` pattern the
homepage's `AdaptiveHero` uses. Copy is deliberately distinct from the
homepage's own hero even where the theme overlaps, since a visitor could
plausibly see both in one session.

## CTAs

- **Primary**: links to the recommended solution
  (`getRecommendedSolution(journey)`) once a journey is known; otherwise
  scrolls to the Solution Selector grid below (`#solution-selector`)
  rather than guessing which solution to send an undecided visitor to.
- **Secondary ("Talk to Byld")**: opens the same Byld AI Companion
  available everywhere on the site (`useAiCompanion`), not a
  page-specific chat instance.

## Analytics

`solution_cta_selected` fires for both CTAs, tagged `cta: "hero-primary"`
or `cta: "ai"` — see `analytics.ts`.
