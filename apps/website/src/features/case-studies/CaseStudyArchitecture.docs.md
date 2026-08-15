# CaseStudyArchitecture

CLAUDE.md Part 21's Architecture section: a clickable system diagram
showing how this project's components fit together end to end.

## Data model note

`architecture` is a flat array of `{ id, label, description, technology?
}` nodes, authored in request-flow order — the same modeling choice as
the Solutions Platform's `ArchitectureExplorer`. There's no separate
connections model; array order doubles as the diagram's sequence, keeping
content authoring simple while every node stays independently selectable.

## Interaction

A row of buttons connected by chevrons, one selected at a time (first
node selected by default), with the selected node's description shown
below. `aria-pressed` communicates selection state; the row is a
`role="list"` of `role="listitem"` buttons.

## Technology depth (Milestone 12)

CLAUDE.md Part 12 asks for each node to expose "Technology... Why?...
Alternative considered" — deliberately scoped down to a `technology` tag
plus a Technology Explorer link, not a second copy of
alternatives/trade-offs. `CaseStudyTechnologyDecisions` already covers
that depth for the same technologies on the same page; repeating it per
architecture node would duplicate content, not add it. When
`selected.technology` matches a real `/technology/[slug]` entry
(`TECHNOLOGY_EXPLORER_SLUGS`, imported from the leaf data file — see
`CaseStudyTechnologyDecisions.docs.md` for why not the barrel), the panel
links there; otherwise it shows just the label and description, same as
before this milestone.

## Analytics

`case_study_architecture_node_selected` fires with `{ slug, node }` on
every selection. `case_study_technology_explorer_clicked` fires with
`{ slug, technology, technologySlug }` when the Explorer link is clicked
— see `analytics.ts`.

## Entrance animation (Milestone 11)

Nodes reveal in the same request-flow order they're authored in, once
the diagram scrolls into view — CLAUDE.md Part 11: "Animate the
architecture diagram." Built on the same `staggerContainer`/`staggerItem`
variants (`@/lib/motion-variants`) the homepage's `AdaptiveHero` already
uses, which respect `MotionProvider`'s reduced-motion setting like every
other one-shot transform in this codebase — nothing new to opt into.
Selection stays click-only (not hover), keeping the diagram keyboard- and
touch-operable rather than requiring a pointer.
