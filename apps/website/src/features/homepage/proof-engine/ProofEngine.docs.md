# ProofEngine

CLAUDE.md Part 13's Proof Engine: a featured project story, a journey +
search filter bar, and a project grid. Composes `FeaturedProjectStory`,
`ProjectFilterBar`, `ProjectGrid`, and `ProjectCard` around `CASE_STUDIES`
and `FICTIONAL_COMPANIES`, both owned by `@/features/case-studies` — the
same full Case Studies Platform data model `/work` renders (Milestone 5),
not a homepage-only dataset. This module is one consumer of that data, not
its owner.

## Data

Case studies reference a `companyId` from the fictional-companies roster
(`@/features/case-studies`). Metrics are plausible outcomes attributed to
these fictional companies, never claims about Byld IQ itself (CLAUDE.md
Part 13: "Never fabricate numbers").

## Navigation

Every project card and the featured story link to a real, dedicated page
(`/work/[slug]`) rather than a modal — Part 13 is explicit about this:
"Instead of opening a modal, navigate to a dedicated case study."

## Filtering

Filtering is entirely client-side over the small, fully-loaded dataset, so
it feels instant with no loading state. An empty result set shows an
educational message (why nothing matched, what to try next) rather than a
bare "No results."
