# EngagementModelsSection

Milestone 10's Engagement Models section: five delivery models — Fixed
Scope, Agile Team, Dedicated Team, Staff Augmentation, Product
Partnership — each with best-for/pros/process/team-structure.

## Orthogonal to Solutions and Industries

This describes _how_ an engagement is structured, independent of _what_
is being built (`SOLUTIONS`) and _who_ it's for (`INDUSTRIES`). Any
solution can, in principle, be delivered under any of these models.

## "Dedicated Team" here vs. the "Dedicated Teams" solution

The M10 spec lists "Dedicated Teams" both as a Service Category and as
an Engagement Model — intentionally, since it's genuinely both a
distinct service offering (the full solution page, Milestone 10 phase 2) and a general delivery pattern applicable more broadly. This
section's "Dedicated Team" entry is deliberately lighter-weight and
links to the full solution (`relatedSolutionSlug: "dedicated-teams"`)
rather than duplicating its depth.

## Card-styled Accordion, same pattern as Problem Statement

Five models' worth of four-list content doesn't fit usefully in a
static grid — built on Radix `Accordion` styled as individual cards
(same treatment as the homepage's Problem Statement section) so
visitors expand one model at a time.

## Analytics

Expanding a model fires `engagement_model_expanded` with its `slug` —
see `analytics.ts`.
