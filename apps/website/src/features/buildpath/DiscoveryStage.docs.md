# DiscoveryStage

CLAUDE.md Milestone 14 §7's Discovery stage — composes four
independently testable pieces:

1. `DiscoveryConversation` — the simulated AI conversation.
2. A structured recap (`data/discovery-fields.ts`) of the same five
   `DiscoveryAnswers` fields, directly editable — a visitor who'd rather
   fill in fields than chat isn't forced through the conversation.
3. `ProblemDefinitionPanel` — the AI-drafted, user-confirmed Problem
   Definition.
4. `TargetUsersPanel` — manual Target User capture.

Conversation and structured recap read and write the same store fields
(`discovery.*`), so editing either one updates the other — there's no
separate "sync" step.
