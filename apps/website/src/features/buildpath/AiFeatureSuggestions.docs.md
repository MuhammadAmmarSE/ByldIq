# AiFeatureSuggestions

CLAUDE.md Milestone 14 §11: transparent AI Feature Suggestions —
Add / Ignore / Ask Why.

`AiFeatureSuggestion` and `ProductFeature` are deliberately separate
types (`types.ts`). A suggestion never silently becomes a feature —
"Add" is the only code path between them (`AiFeatureSuggestions.handleAdd`),
and it always runs from an explicit click. "Ignore" removes it from the
pending list without ever touching `features`. "Ask why" reveals
`suggestion.reason` — the same reasoning `MockAIProvider.suggestFeatures`
attached to the suggestion, not a separate generated explanation, so it
can't say something inconsistent with why the suggestion was made.

Added features carry `source: "ai"` (`ProductFeature.source`) so the
Prioritization board can always show which features came from the
visitor versus a suggestion.
