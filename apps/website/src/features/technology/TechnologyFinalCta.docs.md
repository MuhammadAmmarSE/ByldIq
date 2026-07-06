# TechnologyFinalCta

CLAUDE.md Part 22's final CTA — the last section of the shared technology
page template. Mirrors `SolutionFinalCta`.

## CTAs

- **Primary** ("Plan Your Roadmap"): links to `/buildpath?technology={slug}`.
- **Secondary ("Talk to Byld")**: opens the AI Companion.
- **Tertiary**: a text link back to `/technology`.

CLAUDE.md Part 19: multiple next steps rather than a single forced
action, for visitors who read the whole page without acting on the
hero's CTA.

## Analytics

Fires `technology_cta_selected` (tagged `cta: "final-primary"` or
`cta: "final-ai"`) and `technology_buildpath_started` when the primary CTA
is used — see `analytics.ts`.
