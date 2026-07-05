# CaseStudyEngineeringProcess

CLAUDE.md Part 21's Engineering Process section: the Research →
Architecture → Design → Development → Testing → Deployment →
Optimization stages this specific project went through.

## Why an accordion, not a selectable pipeline

`CaseStudyArchitecture` uses a select-one-at-a-time button row because its
job is showing how components relate to each other in a fixed diagram.
The Engineering Process instead needs "each stage expandable" (CLAUDE.md
Part 21's exact wording) — a disclosure pattern, not a selection among
alternatives — so this uses the same Accordion `CaseStudyTechnologyDecisions`
and the Solutions Platform's `TechnologyExplorer` use.

Each trigger is prefixed with a zero-padded step number (`01`, `02`, ...)
since the order itself communicates the delivery sequence.

## Analytics

`case_study_engineering_stage_selected` fires with `{ slug, stage }` when
an accordion item expands — see `analytics.ts`.
