# SocialProof

Milestone 9's Social Proof section: testimonials, company wordmarks, and
metric badges — all sourced from real, already-established site content.

## No fabricated "years of experience" or client-count stats

The M9 spec calls for "years-of-experience stats." `case-studies.ts`'s
own doc comment is explicit that Byld IQ is "a new site with no real
client history yet" — a years-in-business or clients-served number
would directly contradict that, and CLAUDE.md Part 13 rules out
inflating or inventing metrics regardless. Instead, each testimonial
card is paired with a `Badge` showing the first real metric from that
same company's case study (`CASE_STUDIES` — e.g. Nova Commerce's "+17%
checkout conversion") — a number a visitor can click through to verify
in the full story, not a trust badge invented for this section alone.

## Testimonials (`@/features/case-studies/data/testimonials.ts`)

Three testimonials, one per company with a real case study, each quote
grounded in that case study's actual `outcome`/`metrics` fields (Part 7:
"Testimonials: Authentic. Specific. Evidence-based. Avoid generic
praise."). Cross-referenced against `CASE_STUDIES` and
`FICTIONAL_COMPANIES` in `testimonials.test.ts`.

## Company wordmarks, not logo images

No logo image assets exist for the fictional companies, and CLAUDE.md
Part 28 prohibits fabricating brand assets that were never supplied —
so companies are shown as text wordmarks. Companies with a real case
study link to it (`/work/{slug}`, tracked via
`social_proof_company_clicked`); companies without one (e.g. Acme
Health) render as plain text rather than a dead link.
