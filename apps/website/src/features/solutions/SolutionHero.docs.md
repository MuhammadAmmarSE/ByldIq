# SolutionHero

Every solution page's hero (CLAUDE.md Part 20): a breadcrumb back to
`/solutions`, the headline and supporting copy, who the solution is for,
and two CTAs.

## Props

| Prop       | Type       | Description               |
| ---------- | ---------- | ------------------------- |
| `solution` | `Solution` | The full solution record. |

## CTAs

- **Primary** (`solution.primaryCtaLabel`): links to `/buildpath`. A later
  phase prefills BuildPath's goal selection from the solution's journey.
- **Secondary ("Talk to Byld")**: opens the same global AI Companion used
  everywhere else on the site, for visitors who want to ask a question
  before committing to either path.

## Analytics

Fires `solution_viewed` once on mount, and `solution_cta_selected` for
each CTA (tagged `cta: "hero-primary"` or `cta: "ai"`) — see
`analytics.ts`.
