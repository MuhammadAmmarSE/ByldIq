# KnowledgeArticleHero

CLAUDE.md Part 18's article page hero: a breadcrumb back to `/knowledge`,
the article's category/difficulty/reading time at a glance, its title,
and its summary.

## Scope note: no AI/BuildPath CTAs yet

Unlike `TechnologyDetailHero`/`SolutionHero`/`CaseStudyHero`, this hero
doesn't set the AI Companion's page context or link to BuildPath yet —
that integration lands in a later phase of this milestone (mirroring how
the other detail pages' AI/BuildPath wiring landed in its own phase, not
alongside the initial hero).

## Analytics

Tracks `knowledge_viewed` once on mount — see `analytics.ts`.
