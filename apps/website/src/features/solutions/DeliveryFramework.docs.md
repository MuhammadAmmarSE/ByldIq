# DeliveryFramework

CLAUDE.md Part 20's Delivery Process: the same nine-stage engineering
process — Discovery, Research, Planning, Architecture, Design,
Engineering, Testing, Deployment, Optimization — walked through
interactively for every solution.

## Scope note

Stage content (`data/delivery-stages.ts`) is shared across all nine
solutions rather than authored per solution. The delivery process itself
doesn't actually differ by industry — writing nine distinct-but-equivalent
versions of "we validate assumptions before building" would be padding,
not information. What's solution-specific is tracked separately: the
`solution` prop only feeds the analytics event, so each page still reports
which of its own stages visitors explore.

## Interaction

Same selectable-pipeline pattern as `ArchitectureExplorer` and the
homepage's `PipelineVisualizer`: a row of stage buttons connected by
chevrons, one selected at a time, with the selected stage's description
shown below.

## Analytics

`solution_delivery_stage_selected` fires with `{ slug, stage }` on every
selection — see `analytics.ts`.
