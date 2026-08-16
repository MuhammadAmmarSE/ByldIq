# ProblemDefinitionPanel

CLAUDE.md Milestone 14 §8: a structured, user-editable Problem
Definition, drafted from the Discovery conversation but never applied
silently.

## The confirmation rule, enforced structurally

"Draft with Byld" calls `updateProblemStatement`, which — per
`buildpath-store.ts` — always sets `confirmed: false`, whether the
change came from the AI draft or the visitor typing. There's no code
path that can mark a field confirmed without the visitor explicitly
clicking "This looks right" (`confirmProblemStatement`). Editing any
field afterward un-confirms it again, for the same reason: what's
confirmed is a specific, reviewed statement, not "this panel has been
touched."

The draft button only appears when the panel is empty and there's
Discovery material to draft from — it never re-drafts over something
the visitor already reviewed or edited.
