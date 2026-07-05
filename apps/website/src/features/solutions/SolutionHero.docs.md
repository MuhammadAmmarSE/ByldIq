# SolutionHero

Every solution page's hero (CLAUDE.md Part 20): a breadcrumb back to
`/solutions`, the headline and supporting copy, who the solution is for,
and two CTAs.

## Props

| Prop       | Type       | Description               |
| ---------- | ---------- | ------------------------- |
| `solution` | `Solution` | The full solution record. |

## CTAs

- **Primary** (`solution.primaryCtaLabel`): links to
  `/buildpath?solution={slug}`. The `/buildpath` page (a "coming soon"
  placeholder — the full wizard is out of scope for this milestone) reads
  the param to acknowledge which solution the visitor came from, rather
  than prefilling a questionnaire that doesn't exist yet.
- **Secondary ("Talk to Byld")**: opens the same global AI Companion used
  everywhere else on the site, for visitors who want to ask a question
  before committing to either path.

## AI context

On mount, sets the AI Companion's `pageContext` to this solution (cleared
on unmount) so a greeting triggered from this page acknowledges the
solution being viewed — see `features/homepage/ai-companion`'s docs.

## Analytics

Fires `solution_viewed` once on mount, `solution_cta_selected` for each
CTA (tagged `cta: "hero-primary"` or `cta: "ai"`), and
`solution_buildpath_started` when the primary CTA is clicked — see
`analytics.ts`.
