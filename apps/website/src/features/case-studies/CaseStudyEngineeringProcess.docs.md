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

## Sequential reveal motion (Milestone 12)

CLAUDE.md Part 12 asks for "timeline sequential reveal." Each `AccordionItem`
is wrapped in its own `motion.div` using `staggerItemTransformOnly` (not the
usual fade-based `staggerItem`), inside a `staggerContainer` that triggers
once on scroll into view.

`staggerItemTransformOnly` animates `y` only — it never touches `opacity`.
The trigger's step-number badge uses `text-muted`, the same marginal-contrast
token whose opacity-fade entrance produced a real, reproducible axe
`color-contrast` failure in `ProjectGrid` (caught mid-transition, at partial
opacity blended toward the background, even though the settled state
passed). Moving without ever changing opacity sidesteps that failure mode
rather than re-testing around it.
