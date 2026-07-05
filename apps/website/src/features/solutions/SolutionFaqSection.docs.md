# SolutionFaqSection

CLAUDE.md Part 20's FAQs section: three curated questions per solution,
expandable one at a time. Named `SolutionFaqSection` rather than
`SolutionFaq` because `SolutionFaq` is already the exported type for a
single `{ question, answer }` entry (`data/solution.schema.ts`).

## Scope note

This component is the on-page interactive accordion only. FAQPage JSON-LD
structured data (for search engine rich results) is added in the SEO
phase (`generateMetadata` / a dedicated schema helper), not here — keeping
markup and structured data as separate, independently testable concerns.

## Accessibility

Built on the design system's `Accordion` (Radix Accordion) — same
keyboard/ARIA guarantees as `CapabilityExplorer` and `TechnologyExplorer`.

## Analytics

`solution_faq_expanded` fires with the question text — see `analytics.ts`.
