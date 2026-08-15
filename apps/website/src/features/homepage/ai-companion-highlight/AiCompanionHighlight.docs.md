# AiCompanionHighlight

Milestone 9's AI Companion Highlight: an inline preview of a real Byld
conversation, sitting directly in the page flow rather than only behind
the floating trigger.

## Reuses the real response engine, not fabricated demo copy

The M9 spec calls for "an inline mock conversation demo." Rather than
writing new placeholder dialogue for this preview, the transcript is
built directly from the same engine the real AI Companion uses
(`GREETINGS.default` and `RESPONSES.ai`, from
`@/features/homepage/ai-companion`) — so the preview can never drift
out of sync with, or contradict, what Byld actually says when opened.

## A second entry point, not a duplicate companion

The "Ask Byld a question" button calls the real `useAiCompanion().open()`
— it opens the same global panel the floating trigger opens, with the
same conversation state. This section doesn't run its own chat; it
demonstrates the value of the real one and gives visitors a second,
more discoverable way to open it, per CLAUDE.md Part 16's concern that
Byld "quietly appears" and might otherwise go unnoticed.

## Analytics

Clicking "Ask Byld a question" fires `ai_companion_highlight_opened` in
addition to the `ai_companion_opened` event `useAiCompanion().open()`
already fires — distinguishing this entry point from the floating
trigger in analytics.
