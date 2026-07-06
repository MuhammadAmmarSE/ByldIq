# TechnologyArchitecture

CLAUDE.md Part 22's Interactive Architecture section: a clickable diagram
showing where a technology sits inside a real system end to end.

## Data model note

`architecture` is a flat array of `{ id, label, description }` nodes,
authored in request-flow order — the same data model and interaction
pattern as Solutions' `ArchitectureExplorer`. There's no separate
connections model; array order doubles as the diagram's sequence.

## Interaction

A row of buttons connected by chevrons, one selected at a time (first node
selected by default), with the selected node's description shown below.
`aria-pressed` communicates selection state; the row is a `role="list"` of
`role="listitem"` buttons.

## Analytics

`technology_architecture_node_selected` fires with `{ slug, node }` on
every selection — see `analytics.ts`.
