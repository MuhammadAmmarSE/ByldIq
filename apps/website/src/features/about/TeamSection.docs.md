# TeamSection

CLAUDE.md Milestone 13 §§7-8's Team and Leadership. The spec is explicit:
never fabricate team members — build the architecture, populate it only
with approved information. No real, approved bios exist anywhere in this
codebase, so this ships as a genuine, honest empty state, mirroring
`KnowledgeContentTypePlaceholder`'s shape (dashed border, explanation,
"what's available right now" alternatives) rather than a placeholder grid
of invented names and titles.

## Leadership isn't a second section

Leadership carries the identical "no fabrication" constraint as Team —
a duplicate empty state saying the same thing twice would be noise, not
content. When real, approved profiles exist, this is where they render;
nothing about today's honest copy needs to change structurally to
support that later.

## `about_team_member_viewed`

Declared in `analytics.ts` for when real profiles exist to select — not
fired by this component today, since there's nothing to view yet.

## Analytics

`about_cta_selected` fires with `{ cta: "team-ai" }` when "Ask Byld who
you'd work with" opens the AI Companion.
