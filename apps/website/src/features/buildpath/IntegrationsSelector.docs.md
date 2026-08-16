# IntegrationsSelector

CLAUDE.md Milestone 14 §14: toggling `IntegrationCategory` chips writes
straight to `answers.integrations`. `ArchitectureDiagram` reads the same
field, so there's no wiring beyond both components reading the same
store slice — no event, no manual "regenerate" step.
