# TechnologyFaqSection

CLAUDE.md Part 22's FAQs section: an interactive accordion, one question
expanded at a time.

Named `TechnologyFaqSection` (not `TechnologyFaq`) because `TechnologyFaq`
is already the exported type for a single `{ question, answer }` entry
(`data/technology.schema.ts`) — same naming reasoning as
`SolutionFaqSection`.

FAQPage structured data (for search engines) is added separately in the
SEO phase — this component is the on-page interactive accordion only.

## Analytics

Fires `technology_faq_expanded` with `{ slug, question }` when a question
is expanded — see `analytics.ts`.
