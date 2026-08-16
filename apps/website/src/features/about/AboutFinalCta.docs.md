# AboutFinalCta

CLAUDE.md Milestone 13 §22's Final CTA: a decision-oriented menu instead
of "Contact Us" — the spec's own four options, verbatim: "I have an
idea" → Start BuildPath, "I need technical guidance" → Ask Byld, "I want
to see your work" → Explore Work, "I want to learn" → Knowledge Center.

## Why this is a flat menu, not `DecisionCards`

The homepage's `DecisionCards` (CLAUDE.md Part 19) highlights one
recommended option per the visitor's selected journey. This section
doesn't — the spec frames it as reinforcing "the entire Byld IQ
ecosystem," not steering one visitor toward one path, so all four options
render with equal weight.

## Folding in Knowledge/BuildPath integration

CLAUDE.md §§19/21 ask for Knowledge Center and BuildPath integration; both
land here as two of the four options rather than as separate embedded
preview sections — see `EcosystemSection.docs.md` for the full reasoning.

## Analytics

`about_cta_selected` fires with `{ cta: "idea" | "guidance" | "work" |
"learn" }`. "idea" also fires `about_buildpath_started`; "learn" also
fires `about_knowledge_clicked` — see `analytics.ts`.
