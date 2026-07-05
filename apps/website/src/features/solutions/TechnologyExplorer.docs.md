# TechnologyExplorer

CLAUDE.md Part 20's Technology section (and Part 22's Technology Explorer
philosophy applied per-solution): one expandable accordion item per
technology, each explaining why it was chosen, when it fits, its
trade-offs, the alternatives that were considered, and its cost,
scalability, and team implications.

## Philosophy

Never presents a technology as simply "used." Every entry leads with
business/engineering reasoning before naming the tool, per Part 22: "Technology
is never 'best'. Technology is only appropriate or inappropriate for a
specific problem."

## Accessibility

Built on the design system's `Accordion` (Radix Accordion) — same
keyboard/ARIA guarantees as `CapabilityExplorer`.

## Analytics

`solution_technology_selected` fires with the technology's `id` — see
`analytics.ts`.
