# AboutHero

CLAUDE.md Milestone 13 §2's Hero: the company's philosophy stated
immediately, before any proof — "We build software with intention,"
verbatim from CLAUDE.md Part 1's internal motto ("Build with Intention.
Engineer with Intelligence. Grow with Confidence.").

## Visual identity, not a new mascot

The decorative orb reuses the AI Companion's own visual mark (a
`Sparkles` icon in an accent circle — see `AiCompanionTrigger`) rather
than inventing a separate illustration. CLAUDE.md Part 28's brand-asset
governance exists for the logo specifically, but the same principle
applies to any recurring visual identity: one consistent mark, reused,
not redrawn per page.

## AI Companion integration

- `setPageContext({ label: "the About page", slug: "about" })` on mount,
  cleared on unmount — the same pattern `SolutionHero`/`CaseStudyHero`
  use, so the AI Companion's greeting acknowledges the page without
  overwriting the visitor's separate journey preference.
- "Talk to Byld" opens the AI Companion directly (`useAiCompanion().open`).

## Analytics

`about_viewed` fires once on mount. `about_cta_selected` fires with
`{ cta: "hero-buildpath" | "ai" }`; the BuildPath CTA also fires
`about_buildpath_started` — see `analytics.ts`.
