# SolutionFinalCta

CLAUDE.md Part 20's final CTA — the last section of the shared solution
page template.

## Philosophy

Offers three real next steps — BuildPath, Book Discovery, Talk to
Byld — plus a link back to `/solutions`, per Part 19's Conversion
Experience philosophy of offering multiple next steps instead of a
single forced action, for visitors who read the whole page without
acting on the hero's CTA.

## Milestone 10's four CTA paths

The M10 spec names "Book Discovery Call, Start BuildPath, Chat with
Byld AI, Contact Sales." The first three are real, distinct paths here.
"Contact Sales" isn't added as a separate fourth button — CLAUDE.md's
brand voice explicitly avoids sales framing throughout (Part 16: "Byld
AI is NOT... Sales"), and "Book Discovery" already is the site's real
human-conversation path in that voice. A second, differently-worded
button pointing at the same outcome would be redundant, not a genuine
fourth option.

## Book Discovery reuses the real CalendarPreview

Rather than a new booking component, clicking "Book Discovery" reveals
the homepage Conversion Experience's real `CalendarPreview`
(`@/features/homepage/conversion-experience`) — the same illustrative
availability grid, honest about having no real booking backend behind
it (see that component's own docs).

## Analytics

Fires `solution_cta_selected` (tagged `cta: "final-primary"`,
`"final-discovery"`, or `"final-ai"`) and `solution_buildpath_started`
on the primary CTA — see `analytics.ts`. Distinct tags from
`SolutionHero`'s `hero-primary`/`ai` let analytics distinguish which CTA
a visitor acted on.
