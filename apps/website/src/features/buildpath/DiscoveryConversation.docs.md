# DiscoveryConversation

CLAUDE.md Milestone 14 §7's "simulated AI conversation with dynamic
follow-ups" — deliberately not a giant questionnaire, and honestly a
keyword/state-driven script (`engine/mock-ai-provider.ts`'s
`DISCOVERY_FLOW`), not real NLU. Mirrors the homepage AI Companion's
`AiCompanionPanel` chat layout and "Byld is thinking…" pattern for
familiarity.

## Why replies need to know which field they answer

`AIProvider.generateFollowUpQuestion` only returns a question string. A
reply needs to land in a specific `DiscoveryAnswers` field (so the
structured recap and Problem Definition draft below the chat stay
accurate), so `nextDiscoveryField` exists alongside it — same
answers in, tells the UI which field the _current_ question targets.
Both are computed from the same `DISCOVERY_FLOW` table, so they can
never disagree about which question is "current."

## Sequencing without waiting on a re-render

Sending a reply needs to: record the user's message, write it into the
right field, and immediately compute Byld's next question — all before
React re-renders with the updated store. Rather than relying on a
follow-up effect, `handleSend` builds a local `nextAnswers` object by
hand (spreading the current answers with the one field just answered)
and calls `generateFollowUpQuestion` against that directly.
