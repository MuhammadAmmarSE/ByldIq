# ProofEngine

CLAUDE.md Part 13's Proof Engine: a featured project story, a journey +
search filter bar, and a project grid. Composes `FeaturedProjectStory`,
`ProjectFilterBar`, `ProjectGrid`, and `ProjectCard` around a small local
dataset (`data/case-studies.ts`, validated against `case-study.schema.ts`).

## Data

Case studies reference a `companyId` from the shared fictional-companies
roster (`@/features/homepage/shared`) — the same roster Phase 6's Product
Showcase pods use, so a company like "Nova Commerce" can appear
consistently in both a case study and a live demo. Metrics are plausible
outcomes attributed to these fictional companies, never claims about Byld
IQ itself (CLAUDE.md Part 13: "Never fabricate numbers").

## Navigation

Every project card and the featured story link to a real, dedicated page
(`/case-studies/[slug]`) rather than a modal — Part 13 is explicit about
this: "Instead of opening a modal, navigate to a dedicated case study."

## Filtering

Filtering is entirely client-side over the small, fully-loaded dataset, so
it feels instant with no loading state. An empty result set shows an
educational message (why nothing matched, what to try next) rather than a
bare "No results."
