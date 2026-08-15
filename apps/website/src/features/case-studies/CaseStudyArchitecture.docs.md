# CaseStudyArchitecture

CLAUDE.md Part 21's Architecture section: a clickable system diagram
showing how this project's components fit together end to end.

## Data model note

`architecture` is a flat array of `{ id, label, description }` nodes,
authored in request-flow order — the same modeling choice as the
Solutions Platform's `ArchitectureExplorer`. There's no separate
connections model; array order doubles as the diagram's sequence, keeping
content authoring simple while every node stays independently selectable.

## Interaction

A row of buttons connected by chevrons, one selected at a time (first
node selected by default), with the selected node's description shown
below. `aria-pressed` communicates selection state; the row is a
`role="list"` of `role="listitem"` buttons.

## Analytics

`case_study_architecture_node_selected` fires with `{ slug, node }` on
every selection — see `analytics.ts`.

## Entrance animation (Milestone 11)

Nodes reveal in the same request-flow order they're authored in, once
the diagram scrolls into view — CLAUDE.md Part 11: "Animate the
architecture diagram." Built on the same `staggerContainer`/`staggerItem`
variants (`@/lib/motion-variants`) the homepage's `AdaptiveHero` already
uses, which respect `MotionProvider`'s reduced-motion setting like every
other one-shot transform in this codebase — nothing new to opt into.
Selection stays click-only (not hover), keeping the diagram keyboard- and
touch-operable rather than requiring a pointer.
