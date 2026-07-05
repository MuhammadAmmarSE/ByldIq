# CaseStudyHero

Every case study page's hero (CLAUDE.md Part 21): a breadcrumb back to
`/work`, industry/business-problem/AI-involvement badges, the headline,
three key facts (team, timeline, scale), and two CTAs — BuildPath and the
AI Companion. Mirrors `SolutionHero`'s structure so the Solutions and
Case Studies platforms feel like one system.

## Props

| Prop        | Type               | Description                               |
| ----------- | ------------------ | ----------------------------------------- |
| `caseStudy` | `CaseStudy`        | The case study to render.                 |
| `company`   | `FictionalCompany` | The fictional company the story is about. |
| `className` | `string?`          | Additional classes for the outer wrapper. |

## Behavior

- Tracks `case_study_viewed` once on mount.
- Sets the AI Companion's page context to `the {company.name} case
study` on mount (a noun phrase, not the full-sentence headline — it
  completes `getPageContextGreeting`'s "Looks like you're exploring
  ___." template), and clears it on unmount so leaving the page falls
  back to the journey-based greeting.
- The primary CTA links to `/buildpath?caseStudy={slug}`, fires
  `case_study_cta_selected` + `case_study_buildpath_started`, and the
  `/buildpath` page acknowledges the referring case study by name (see
  `app/buildpath/page.tsx`).

## Heading hierarchy

The headline renders as `<h1>` (`Heading variant="display"`) — every
other section on the page renders `<h2>`.
