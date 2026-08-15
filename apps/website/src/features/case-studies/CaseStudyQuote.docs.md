# CaseStudyQuote

Milestone 11's "Client quote" on a project's detail page (CLAUDE.md Part
11's Project Detail Preview list). Reuses the real `TestimonialCard`
component and `TESTIMONIALS` data — already grounded in each case
study's own `outcome`/`metrics` fields (see `data/testimonials.ts`'s doc
comment) — rather than a second, separately-authored quote field on
`CaseStudy` itself.

## Renders nothing for 2 of the 5 case studies

`TESTIMONIALS` only has an entry for `fieldnote-mvp`,
`nova-commerce-checkout`, and `harborline-developer-platform`.
`atlas-logistics-modernization` and `northwind-ai-support-assistant` have
none — `CaseStudyQuote` renders nothing for those rather than fabricating
a quote (CLAUDE.md Part 7: "never fabricate numbers" applies equally to
inventing an attributed quote).

## Not in the sidebar

Unlike every other `/work/[slug]` section, this one isn't listed in
`CaseStudySidebar` — it's supplementary content next to Results, not a
section every case study is guaranteed to render (a sidebar link to a
section that sometimes doesn't exist would be a broken in-page anchor
for 2 of 5 case studies).
