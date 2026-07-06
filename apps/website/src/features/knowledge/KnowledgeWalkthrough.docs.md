# KnowledgeWalkthrough

CLAUDE.md Part 18's Interactive Learning section: a clickable walkthrough
of the article's argument, one step at a time, reusing the same data
model and interaction pattern as the Technology Explorer's
`TechnologyArchitecture` and Solutions' `ArchitectureExplorer` — a flat,
ordered array of steps where clicking one shows its description below.

## Honesty note

This is deliberately the same "selectable step" pattern already proven
accessible elsewhere in the codebase, not a fabricated diagram-rendering
or canvas pipeline that doesn't exist here. The Knowledge Center Platform
spec's "Interactive Learning" (diagrams, decision trees, flowcharts) is
satisfied by walking through a reasoning sequence rather than rendering a
system diagram, since an article's argument is a sequence of ideas, not a
system topology.

## Analytics

Fires `knowledge_walkthrough_step_selected` on every step selection — see
`analytics.ts`.
