# CaseStudyFaqSection

CLAUDE.md Part 21's FAQ section — the on-page interactive accordion.
FAQPage structured data (for search engines) is added separately in the
SEO phase, mirroring `SolutionFaqSection`'s split between the visible
accordion and the JSON-LD describing the same content to crawlers.

## Naming

Named `CaseStudyFaqSection` (not `CaseStudyFaq`) because `CaseStudyFaq` is
already the exported type for a single `{question, answer}` entry
(`data/case-study.schema.ts`).

## Analytics

`case_study_faq_expanded` fires with `{ slug, question }` when an
accordion item expands — see `analytics.ts`.
