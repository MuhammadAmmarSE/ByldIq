# SolutionsAiAdvisor

Milestone 10's AI Advisor moment on the Solutions landing page — the
same pattern as the homepage's `AiCompanionHighlight` (Milestone 9),
applied to `/solutions`.

## Reuses the real response engine, not fabricated demo copy

The transcript is built from `GREETINGS.default` and `RESPONSES.startup`
(`@/features/homepage/ai-companion`), not new placeholder dialogue.
"I'm building a startup" is genuinely `GREETINGS.default`'s first quick
reply, and its real reply (`RESPONSES.startup`, about scoping an MVP) is
directly relevant to choosing a Solutions path — unlike an arbitrary
demo message would be.

## A second entry point, not a duplicate companion

"Ask Byld a question" calls the real `useAiCompanion().open()` — the
same global panel the floating trigger opens. See
`IndustryDetail.docs.md`'s "AI Companion context" section for how
industry pages make that panel's greeting context-aware; this component
is the Solutions landing page's own invitation to open it.

## Analytics

Clicking the CTA fires `solutions_ai_advisor_opened` in addition to the
`ai_companion_opened` event `useAiCompanion().open()` already fires —
distinguishing this entry point in analytics.
