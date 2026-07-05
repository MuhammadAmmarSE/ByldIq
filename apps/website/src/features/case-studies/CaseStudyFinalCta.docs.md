# CaseStudyFinalCta

CLAUDE.md Part 21's final CTA — the last section of the shared case study
template. Offers the same two paths as `CaseStudyHero` (BuildPath, Talk
to Byld) plus a link back to `/work`, per CLAUDE.md Part 19's philosophy
of multiple next steps rather than a single forced action, for visitors
who read the whole story without acting on the hero's CTA.

## Analytics

Fires `case_study_cta_selected` with `cta: "final-primary"` or
`cta: "final-ai"` (distinguishing this CTA from the hero's
`"hero-primary"`/`"ai"`), plus `case_study_buildpath_started` when the
primary CTA is used.
