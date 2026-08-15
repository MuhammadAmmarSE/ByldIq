# IndustryDetail

Milestone 10's `/solutions/industry/[industry]` detail page content:
challenges, recommended solutions, and example work.

## Reuses real components, not new cards

Recommended solutions render via the real `SolutionCard` (same one the
Solution Selector uses); example case studies render via the Proof
Engine's real `ProjectCard`. Neither is duplicated for this page.

## The empty case is honest, not hidden or fabricated

Six of the ten industries (`data/industries.ts`) have no real case study
yet. Rather than hiding those industries or inventing a story, the page
states the gap directly — "We haven't published a … case study yet" —
and offers the same two real next steps (BuildPath, Talk to Byld) that
every other page on the site offers, per CLAUDE.md Part 7's empty-state
philosophy ("Every empty state teaches") and the Knowledge Center's
`KnowledgeContentTypePlaceholder` precedent for the same honesty.

## BuildPath prefill

The primary CTA links to `/buildpath?solution={slug}` using the
industry's first `recommendedSolutionSlugs` entry — BuildPath supports
`?solution=`, not an `?industry=` param, so this reuses real prefill
support rather than inventing a new one.

## Analytics

Selecting a recommended solution fires `industry_solution_clicked` with
`{ industrySlug, solutionSlug }` — see `analytics.ts`.
