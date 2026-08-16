# About / Company Experience (Milestone 13)

This document covers `apps/website/src/app/about/page.tsx` and
everything it composes — the first genuinely new platform since Case
Studies (Milestone 5), rather than an extension of one that already
existed. It assumes `docs/architecture.md` (the general layering
contract) and `docs/homepage.md`/`docs/solutions.md`/`docs/case-studies.md`
(the established feature-folder, sidebar/scrollspy, and
AI/BuildPath-integration conventions this milestone reuses) as
background, and focuses on what's specific to About.

## Purpose

CLAUDE.md's Milestone 13 brief was explicit that this should not become
a generic "About Us" page: it should communicate who Byld IQ is, what it
believes, how it works, and why someone should trust it — the philosophy
already established across CLAUDE.md Parts 1–4, made visible rather than
just declared.

## Routes

| Route    | Rendering    | Purpose                                                               |
| -------- | ------------ | --------------------------------------------------------------------- |
| `/about` | Static (SSG) | One long page: Hero, twelve sidebar sections, a full-width final CTA. |

No `/about/approach`, `/about/team`, `/about/culture`, `/about/careers`,
or `/about/labs` sub-routes — CLAUDE.md's own instruction: "Don't create
separate routes unless they contain meaningful content." Nothing on this
page has enough independent depth yet to justify splitting off; every
section fits naturally as an anchor on one page, the same choice Case
Studies and Solutions made for their own long detail templates.

## Component hierarchy

```
app/about/page.tsx                     Server Component
├── BreadcrumbList + Organization JSON-LD
├── ScrollIndicator                    fixed "scroll for more" affordance (reused from homepage/arrival)
├── AboutHero                          h1, philosophy statement, BuildPath/Talk to Byld CTAs
├── (grid: sidebar + content, lg breakpoint)
│   ├── AboutSidebar                   sticky, useScrollSpy, desktop only
│   └── content column
│       ├── PhilosophyPrinciples       #philosophy — six principle cards, sequential reveal
│       ├── ApproachTimeline           #approach — nine-stage Tabs (Understand → Evolve)
│       ├── EngineeringStandards       #engineering-standards — ten manifesto statements
│       ├── DesignEngineeringFlow      #design-engineering — static flow + loop-back note
│       ├── TeamSection                #team — honest empty state (Team + Leadership)
│       ├── CultureSection             #culture — six real, self-referential examples
│       ├── HowWeWorkSection           #how-we-work + #transparency — one component, two anchors
│       ├── TechnologyPhilosophyFlow   #technology-philosophy — decision funnel + Explorer CTA
│       ├── AiPhilosophySection        #ai-philosophy — AI philosophy + "Meet Byld"
│       ├── WhatsNextSection           #whats-next — Growth/Future Vision/Labs/Careers, honest
│       └── EcosystemSection           #ecosystem — real case study proof
└── AboutFinalCta                      #get-started — decision-oriented four-option menu
```

Every component follows the standard per-component contract (CLAUDE.md
Part 27): `Name.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`,
`.docs.md`. Each component's own `.docs.md` is the source of truth for
that component's specific decisions; this file only covers what's
cross-cutting.

## Composition philosophy: twelve sections, not twenty-seven

CLAUDE.md's spec lists twenty-seven numbered subsections. Several were
deliberately consolidated into one component rather than built as
separate, near-duplicate sections:

- **Team + Leadership** → `TeamSection` alone. Both carry the identical
  "never fabricate" constraint, so a second empty state saying the same
  thing twice would be noise.
- **How We Work With Clients + Transparency** → `HowWeWorkSection`, one
  component with two `id`s (the same pattern `CaseStudyOverview` uses for
  Executive Summary/Business Challenge) — closely related themes, not
  independent topics.
- **Growth/Evolution + Future Vision + Labs + Careers** →
  `WhatsNextSection`. All four require the same honesty (no fabricated
  dates, milestones, experiments, or job listings), so four separate
  "nothing to show yet" blocks would read as padding, not content.
- **AI Philosophy + Byld Mascot** → `AiPhilosophySection`. The spec
  itself introduces Byld as "the public manifestation of this
  philosophy" — splitting the two would divide one idea in half.
- **Knowledge Integration + BuildPath Integration** → folded into
  `AboutFinalCta`'s four options rather than duplicated as separate
  embedded preview sections (see `EcosystemSection.docs.md` and
  `AboutFinalCta.docs.md` for the full reasoning). Case Study
  Integration kept its own section (`EcosystemSection`) since it has
  genuinely distinct content — real project cards — that the other two
  don't.

## Reusing existing platforms instead of duplicating them

Consistent with every prior milestone's "extend, don't duplicate"
pattern, several sections deliberately reuse real, already-shipped
components rather than rebuilding equivalents:

- **`AiPhilosophySection`** embeds the homepage's `AiCompanionHighlight`
  directly for "Meet Byld" — a real conversation preview pulled live from
  the actual response engine, not a second scripted introduction.
- **`EcosystemSection`** reuses `ProjectGrid`/`ProjectCard` (homepage's
  Proof Engine) with real `CASE_STUDIES` data, rather than a second
  illustration of "we ship measurable outcomes."
- **`EngineeringStandards`** links to (rather than duplicates) the
  homepage's `EngineeringExcellenceEngine` — this page states _why_ ten
  principles matter; that section already demonstrates _how_ they show
  up in this actual repository.
- **`TechnologyPhilosophyFlow`** links to the real Technology Explorer
  (`/technology`) instead of building a second one, per the spec's own
  explicit instruction.
- **Every "Talk to Byld" / "Ask Byld" CTA** (Hero, Team, WhatsNext, Final
  CTA) opens the same global AI Companion panel via `useAiCompanion()` —
  never a bespoke, page-local chat widget.

## Never-fabricate sections

Four sections carry an explicit "don't invent content" constraint from
the spec, and each is handled honestly rather than filled with
placeholder data:

- **`TeamSection`** — no real, approved team or leadership bios exist
  anywhere in this codebase. Ships as a genuine empty state (the same
  shape `KnowledgeContentTypePlaceholder` already established for the
  Knowledge Center's own unpublished content types), with a path to
  "Ask Byld who you'd work with" and real case studies instead.
- **`WhatsNextSection`**'s Growth/Evolution — no verified milestones
  (real dates, clients, revenue, employee counts) exist to present
  chronologically, so none are invented. Instead it reuses CLAUDE.md
  Part 1's own stated platform evolution as honestly-labeled _direction_
  (some stages already exist; most don't yet).
- **`WhatsNextSection`**'s Labs — states plainly that Byld Labs isn't
  public yet, rather than inventing experiments.
- **`WhatsNextSection`**'s Careers — states plainly that there's no
  public hiring right now, rather than a fabricated job listing; routes
  genuine interest through the real AI Companion instead of a contact
  form or address that doesn't exist.

## Data

All new data lives in `features/about/data/`, each file a small,
hand-authored array (no zod schema — none of it needs cross-record
validation the way `CASE_STUDIES`/`SOLUTIONS` do): `philosophy-principles.ts`,
`approach-stages.ts`, `engineering-standards.ts`, `culture-values.ts`,
`ai-assisted-areas.ts`, `future-platform.ts`, `final-cta-options.ts`.
Every string is either a paraphrase of CLAUDE.md's own already-written
philosophy (Parts 1, 3, 24) or, for Culture, a genuine pattern
demonstrable in this actual repository's engineering practice — never
invented company facts.

## State

- **`AboutHero`** sets `useAiCompanionStore`'s `pageContext` to
  `the About page` on mount, cleared on unmount — the same pattern
  `SolutionHero`/`CaseStudyHero` use.
- **`AboutSidebar`** drives its highlight from `useScrollSpy`, identical
  to `CaseStudySidebar`/`SolutionSidebar`.
- Everything else (active Approach stage, active section observed by the
  sidebar) is local `useState`, per `docs/architecture.md`.

## Analytics

Declared in `features/about/analytics.ts`: `about_viewed`,
`about_section_viewed`, `about_philosophy_interaction`,
`about_approach_stage_viewed`, `about_engineering_principle_viewed`,
`about_team_member_viewed` (declared for when real profiles exist to
select — not fired today), `about_technology_explorer_clicked`,
`about_case_study_clicked`, `about_knowledge_clicked`,
`about_cta_selected`, `about_buildpath_started`. Naming mirrors
Solutions/Case Studies' own event names rather than the spec's flatter
list (`about_view`, `cta_click`) so events stay distinguishable in one
shared analytics stream. "AI open" isn't a separate event, for the same
reason Solutions doesn't duplicate it — the AI Companion's own events
already cover that; `about_cta_selected` with `cta: "ai"` records which
CTA opened it.

## SEO

- `generateMetadata`-equivalent static `metadata` export sets `title`,
  `description`, `alternates.canonical`, `openGraph`, and `twitter`.
- `organizationJsonLd()` (already existed, unused until now) plus
  `breadcrumbJsonLd` render on the page.

## Accessibility

- Single `<h1>` (`AboutHero`'s `Heading variant="display"`), every
  section a `<h2>` via `SectionHeader`'s default, `<h3>`/`<h4>` within —
  consistent hierarchy across a genuinely long page.
- `ApproachTimeline` reuses Radix `Tabs` (arrow-key navigation, proven
  pattern from `ProductThinkingTimeline`). Illustrative flows
  (`DesignEngineeringFlow`, `HowWeWorkSection`'s collaboration model,
  `TechnologyPhilosophyFlow`, `WhatsNextSection`'s platform evolution)
  use `role="list"`/`role="listitem"` on non-interactive chip rows, the
  same pattern `CaseStudyArchitecture` established.
- **Motion learned from Milestone 11's regression, applied proactively.**
  `PhilosophyPrinciples`, `EngineeringStandards`, and `CultureSection` use
  `staggerItemTransformOnly` (`y`-translate only, never `opacity`) for
  their sequential card reveals — not the fade-based `staggerItem` —
  since their text uses `text-muted`, the same marginal-contrast token
  whose opacity-fade entrance produced a real, reproducible axe
  `color-contrast` failure in `ProjectGrid` (see
  `CaseStudyEngineeringProcess.docs.md` for that history). Applying the
  lesson up front meant this milestone's full Storybook a11y run (400
  test files, 1015 tests) passed clean on the first try — no regression
  needed finding and fixing this time.
- `AboutHero`'s decorative background orb uses `useReducedMotion()` to
  skip its `float` loop entirely under `prefers-reduced-motion`, the same
  caveat `motion-variants.ts` documents for every infinite-loop variant.

## Navigation

`config/site.ts`'s `primaryNav` gained `{ label: "About", href: "/about" }`
— the comment there had named About as a route that "doesn't exist yet"
since Milestone 8; this milestone is what makes that true. No footer
columns exist yet to add a second link to (the `<Footer />` in
`PageShell` renders with empty `columns` today, a pre-existing gap
outside this milestone's scope).

## Scope boundaries

Honest gaps, documented rather than silently shipped:

| What the spec asks for                                                                         | What's actually built                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/about/approach`, `/about/team`, `/about/culture`, `/about/careers`, `/about/labs` sub-routes | Not built — nothing has enough independent content depth yet, per the spec's own "don't create separate routes unless they contain meaningful content."                                               |
| Real, named Team and Leadership profiles                                                       | Not built — no approved names/bios exist; `TeamSection` ships as an honest, structured empty state instead.                                                                                           |
| A chronological company history (Growth/Evolution)                                             | Not built — no verified dates, clients, revenue, or headcount exist; folded into an honestly-labeled Future Vision instead.                                                                           |
| Byld Labs experiments/prototypes                                                               | Not built — no real experiments exist yet; states that plainly rather than inventing any.                                                                                                             |
| Open job listings                                                                              | Not built — not publicly hiring; routes genuine interest through the AI Companion instead of a fabricated listing or contact form.                                                                    |
| Visual regression testing (spec's Testing section)                                             | Not built — no visual-regression tooling exists anywhere in this codebase yet (the same gap `docs/case-studies.md` already names); adding it scoped to one page would be inconsistent infrastructure. |
| A separate "Meet Byld" bespoke interaction                                                     | Not built — reuses the real, already-shipped `AiCompanionHighlight` instead of a second, parallel mascot introduction.                                                                                |

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract — fifteen new component test files plus
  `AboutSidebar.test.tsx`.
- **Storybook a11y** (`vitest --project=storybook`): every new
  component's story passes the same axe gate as every other design-system
  primitive, homepage module, and platform component in this codebase.
- **E2E** (`e2e/about.spec.ts`, Playwright): full section rendering,
  sidebar scrollspy, Approach timeline tab switching, the AI Companion
  integration, the honest Team empty state, the final CTA's three real
  links, the Technology Explorer link, a full-page axe scan, and the
  primary nav's About link.

## Definition of Done

Milestone 13 is complete per its own checklist: the page reads as a
brand and philosophy experience rather than a corporate profile;
philosophy, approach, engineering standards, and AI philosophy are all
clearly communicated and cross-linked to their real counterparts
elsewhere on the site (Technology Explorer, Work, Knowledge Center,
BuildPath, AI Companion); Team/Leadership/Growth/Careers use verified
information only, never fabricated; and the full verification suite —
typecheck, lint, prettier, 1015 unit/Storybook tests, 90 e2e tests,
production build — is green.
