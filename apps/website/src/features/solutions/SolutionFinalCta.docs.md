# SolutionFinalCta

CLAUDE.md Part 20's final CTA — the last section of the shared solution
page template.

## Philosophy

Mirrors the hero's two paths (BuildPath, Talk to Byld) rather than
introducing a third option, plus a link back to `/solutions` — per Part
19's Conversion Experience philosophy of offering multiple next steps
instead of a single forced action, for visitors who read the whole page
without acting on the hero's CTA.

## Analytics

Fires `solution_cta_selected` (tagged `cta: "final-primary"` or
`cta: "final-ai"`) and `solution_buildpath_started` on the primary CTA —
see `analytics.ts`. Distinct tags from `SolutionHero`'s
`hero-primary`/`ai` let analytics distinguish which CTA a visitor acted
on.
