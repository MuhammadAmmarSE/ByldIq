# PrioritizationStage

CLAUDE.md Milestone 14 §§10–11's Prioritization stage — composes
`AiFeatureSuggestions` and `FeatureBoard`. Both read and write the same
`features`/`aiSuggestions` store slices, so a suggestion accepted at the
top of the page appears in the board below immediately.
