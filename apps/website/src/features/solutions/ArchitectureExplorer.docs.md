# ArchitectureExplorer

CLAUDE.md Part 20's Architecture Explorer: a clickable system diagram
showing how a solution's components fit together end to end (e.g. Visitor
→ Web App → API → Database).

## Data model note

`architecture` is a flat array of `{ id, label, description }` nodes,
authored in request-flow order. There's no separate connections model —
array order doubles as the diagram's sequence. This keeps content
authoring simple (no coordinate/edge data to maintain across nine
solutions) while every node stays independently selectable and
inspectable, which is what the spec actually asks for ("every node
clickable").

## Interaction

Same pattern as the homepage's `PipelineVisualizer`
(`features/homepage/engineering-excellence`): a row of buttons connected
by chevrons, one selected at a time (first node selected by default), with
the selected node's description shown below. `aria-pressed` communicates
selection state; the row is a `role="list"` of `role="listitem"` buttons.

## Analytics

`solution_architecture_node_selected` fires with `{ slug, node }` on every
selection — see `analytics.ts`.
