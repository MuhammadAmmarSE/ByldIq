# Homepage (Milestone 3 + Milestone 9)

This document covers `apps/website/src/app/page.tsx` and everything it
composes: the original eleven homepage modules from CLAUDE.md Part 9
(Milestone 3), plus five additional sections Milestone 9's homepage
audit found genuinely missing against that spec (Problem Statement,
What We Build, Technology Ecosystem, Social Proof, AI Companion
Highlight — see "Milestone 9 additions," below). It assumes
`docs/architecture.md` (the general layering contract) and CLAUDE.md
Parts 9–19 (the modules' product spec) as background, and focuses on
what's specific to these milestones: composition, state, rendering,
motion, and — importantly — where scope deliberately ends.

## Component hierarchy

```
app/page.tsx                          Server Component — composition root
├── ArrivalExperience                 fixed overlay, unmounts itself
├── ScrollDepthTracker                client boundary for useScrollDepth()
├── ScrollIndicator                   fixed "scroll for more" affordance
└── HomepageSection × 14              <section id="…"> + Container + section_viewed analytics + currentSection sync
    ├── #journey-selection      → JourneySelector (owns the page's h1)
    ├── #adaptive-hero          → AdaptiveHero
    ├── #problem-statement      → ProblemStatement            (M9)
    ├── #what-we-build          → WhatWeBuild                 (M9)
    ├── #technology-ecosystem   → TechnologyEcosystem         (M9)
    ├── #product-thinking       → ProductThinkingTimeline
    ├── #proof-engine           → ProofEngine
    ├── #social-proof           → SocialProof                 (M9)
    ├── #product-showcase       → ProductShowcase
    ├── #engineering-excellence → EngineeringExcellenceEngine
    ├── #ai-companion-highlight → AiCompanionHighlight        (M9)
    ├── #buildpath-preview      → BuildPathPreview
    ├── #knowledge-center       → KnowledgeCenterPreview
    └── #conversion-experience  → ConversionExperience
```

Each module lives in its own `features/homepage/<module>/` folder with
the same per-component contract as `components/` (CLAUDE.md Part 27):
`Name.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`, `.docs.md`,
`index.ts`. A `features/homepage/shared/` folder holds what every module
needs: `HomepageSection`, `useJourneyContent`, `useScrollDepth` /
`ScrollDepthTracker`, `useSectionAnalytics`, `useCurrentSectionSync`, and
the shared `FICTIONAL_COMPANIES` roster (see "Fictional data," below).
Each module's own `.docs.md` is the source of truth for that module's
specific decisions; this file only covers what's cross-cutting.

**The Byld AI Companion's conversation panel isn't one of the sections
above.** `AiCompanionProvider` is mounted once in `AppProviders` — not
per-route — so the floating trigger and panel are available everywhere,
not just the homepage. `#ai-companion-highlight` is an inline preview
and a second entry point into that same panel, not a duplicate
companion — see its own `.docs.md`.

## Milestone 9 additions

Milestone 9 audited the built (Milestone 3) homepage against CLAUDE.md
Part 9's full module list and found seven genuine gaps, each closed by
reusing an existing real dataset/platform rather than inventing a
parallel one:

- **Hero animation primitives** (`ParticleField`, `LightSweep`,
  `useMouseParallax`, composed in `adaptive-hero/HeroBackdrop`) — the
  hero's background was static; the spec calls for particles, parallax,
  and light sweeps.
- **`#problem-statement`** — real, cited industry statistics (McKinsey
  & Company / University of Oxford research), not invented numbers.
- **`#what-we-build`** — reuses the real `SOLUTIONS` dataset
  (`@/features/solutions`, Milestone 4) instead of the spec's seven
  fictional service categories, which map onto no real page.
- **`#technology-ecosystem`** — reuses the real `TECHNOLOGIES`/
  `POPULATED_CATEGORIES` dataset and `TechnologyCard`/`TechnologyGrid`
  (`@/features/technology`, Milestone 6), Chip-filtered by category.
- **`#ai-companion-highlight`** — an inline transcript built from the
  real response engine (`GREETINGS.default`, `RESPONSES.ai`), plus a
  second `useAiCompanion().open()` entry point — not fabricated demo
  copy or a second companion instance.
- **`#social-proof`** — testimonials (`@/features/case-studies/data/testimonials.ts`)
  grounded in real case-study outcomes; explicitly skips the spec's
  "years-of-experience stats" since `case-studies.ts` itself documents
  that Byld IQ has no real client history yet (see "Fictional data,"
  below).
- **AI context-awareness** — `currentSection`, `recentlyViewed`, and
  `ctaHistory` added to `ai-companion-store`, feeding a more specific
  greeting and a contextual fallback reply. See
  `features/homepage/ai-companion/AiCompanion.docs.md`'s "Context
  awareness" section.

## State management

- **`useAppStore` (Zustand, `store/app-store.ts`)** — the one piece of
  state nearly every module reads: `journey` (the selected visitor
  journey, or `null`) and `hasSeenIntro`. Persisted to `localStorage`
  (falling back to an in-memory `Map` if storage is blocked, per CLAUDE.md
  Part 10's "Storage blocked → Session memory").
- **`useJourneyContent(contentMap)`** (`features/homepage/shared`) — the
  single pattern every journey-adaptive module uses: pass a
  `Record<Journey, T> & { default: T }`, get back whichever entry applies.
  This is what makes "changing journey updates every module instantly, no
  reload" (CLAUDE.md Part 10) fall out for free — every module
  re-renders from the same store subscription rather than each
  hand-rolling its own branch.
- **`useAiCompanionStore`** — separate from `useAppStore` on purpose: the
  companion's open/closed state and message log are session-only and
  unrelated to journey preference (see `ai-companion-store.ts`). As of
  Milestone 9 it also holds `currentSection` (kept in sync by every
  `HomepageSection` via `useCurrentSectionSync`), `recentlyViewed` (built
  for free from every `setPageContext` call site), and `ctaHistory`
  (recorded from the hero and Conversion Experience's decision cards) —
  see `features/homepage/ai-companion/AiCompanion.docs.md`.
- **Local component state** — everything else (BuildPath preview's
  selected goal, the newsletter form's draft value, which FAQ is
  expanded) is plain `useState`, per `docs/architecture.md`'s "state
  belongs as close as possible to where it's used."

## Rendering strategy

`page.tsx` is a **Server Component** (`export default async function
HomePage()`) that reads the `byld_intro_seen` cookie via `cookies()` and
passes it to `<ArrivalExperience initialHasSeenIntro={…} />`, so a
returning visitor's very first server-rendered HTML never includes the
intro overlay — no flash before it disappears. This is the only reason
the page is a Server Component; every module it renders is a Client
Component, since interaction is the entire point of each one (CLAUDE.md
Part 26: "Client Components only when interaction requires it," and here
it always does).

Reading `cookies()` forces per-request rendering, which the page declares
explicitly (`export const dynamic = "force-dynamic"`) per Part 26's "every
route must explicitly choose a rendering strategy" rather than leaving it
as an implicit side effect of the `cookies()` call. The tradeoff — no
static prerender for `/` — buys the zero-flash returning-visitor skip
Part 9 requires ("Returning visitors: 0 seconds").

`ScrollDepthTracker` exists solely because of this: `useScrollDepth()` is
a client-only hook, and the page itself can't call hooks directly since
it's an async Server Component. It's a one-line client boundary that
mounts the hook and renders `null`.

## Motion architecture

Three animation patterns cover the entire homepage:

1. **`Reveal`** (`components/Reveal`) — scroll-triggered fade + slide-up,
   `whileInView`, fires once. Used by Journey Selection's five cards
   (staggered via a `delay` prop).
2. **`staggerContainer` / `staggerItem`** (`lib/motion-variants.ts`) — for
   content that should animate in together on mount (not scroll-tied),
   e.g. the Adaptive Hero's headline → copy → CTAs → trust indicators.
   Re-keyed on `journey` so switching journeys replays the sequence.
3. **The Arrival Experience's own stage timeline** (`useArrivalSequence`)
   — a bespoke `setTimeout`-driven sequence, not a Motion variant, since
   it needs to coordinate multiple sequential reveals (logo → wordmark →
   tagline → navigation) against a fixed budget (CLAUDE.md Part 9: under
   2 seconds).
4. **The Adaptive Hero's background primitives** (`HeroBackdrop`,
   Milestone 9) — `useMouseParallax` (`useMotionValue`/`useSpring`,
   pointer-driven, desktop only), `ParticleField` (deterministic
   golden-angle-spiral positions, not `Math.random()`, to stay
   SSR-hydration-safe), and `LightSweep` (a paused, repeating diagonal
   beam). All three render `null` under reduced motion rather than a
   static fallback.

All four respect `prefers-reduced-motion` — Motion-based ones
automatically via `MotionProvider`'s `reducedMotion="user"`, the Arrival
Experience via its own `skipIntro` check. Per CLAUDE.md Part 6 ("replace
movement with opacity" — not remove animation outright), reduced motion
still allows opacity fades; only translation/scale is suppressed. This
matters for a11y testing: a scan taken mid-fade can catch a genuinely
transient, sub-second low-contrast frame that isn't a real defect (see
`e2e/homepage.spec.ts`'s accessibility test, which waits for the hero's
last stagger item to finish before scanning).

**Bug found and fixed during this milestone:** `useReducedMotion` always
reports `false` during SSR/hydration (its `getServerSnapshot`), so a
reduced-motion visitor with no `byld_intro_seen` cookie mounts with
`skipIntro: false` and only flips to `true` once the client media query
resolves, one render later. `useArrivalSequence`'s effect handled that
transition's `onComplete` callback but never updated `stage`, so the
visitor got stuck on `stage: "initial"` — the full-screen overlay never
unmounted and blocked every click underneath it. Fixed in
`useArrivalSequence.ts` (`setStage("complete")` in the `skipIntro`
branch), with a regression test covering the flip-after-mount case.

## Accessibility

- **Heading hierarchy is deliberate, not incidental.** Most modules were
  built and tested in isolation across earlier phases, each with no
  top-level heading of its own — fine for an isolated Storybook story,
  but it breaks heading order once nine of them are stacked on one real
  page (e.g. Journey Selection had no heading at all, and the Adaptive
  Hero's headline defaulted to a second `<h1>`). Phase 12 gave every
  section a real `<h2>` title — verbatim from CLAUDE.md's own headline
  options where the spec provides them (Parts 13, 15, 18), quoted spec
  prose where it doesn't (Parts 10, 12, 14, 17) — and let Journey
  Selection's new heading own the page's single `<h1>`, since it's the
  first section in the documented flow (Journey Selection → Hero, not the
  other way around). See `Heading`'s `variant`/`as` split
  (`components/Heading`): `variant` controls visual size, `as` controls
  the semantic tag, so a card title can look like an `h5` while rendering
  as whatever `h2`–`h6` the surrounding document outline actually needs.
  Every Milestone 9 section follows the same discipline via `SectionHeader`
  (default `headingVariant="h2"`), so the outline stays intact as sections
  are added.
- **Verified, not assumed.** `e2e/homepage.spec.ts` runs a full
  `@axe-core/playwright` scan (`wcag2a`, `wcag2aa`, `best-practice`)
  against the real built page — zero violations. This is in addition to,
  not instead of, the per-component Storybook a11y gate
  (`docs/architecture.md`'s "primary accessibility gate") every module
  already passes in isolation.
- **Lighthouse (desktop, local run via `@lhci/cli`):** Performance 99,
  Accessibility 100, Best Practices 100, SEO 91 — all clear
  `.lighthouserc.json`'s thresholds. The one sub-100 SEO audit ("Document
  does not have a meta description") is a false positive: the built
  page's HTML has exactly one, correctly populated
  `<meta name="description">` tag, confirmed by direct inspection.

## Fictional data

Several modules need realistic content Byld IQ doesn't have yet (no
client history, no published case studies). Per CLAUDE.md Part 13's
"never invent numbers" and Part 7's honesty requirements, every module
using invented content says so in its own `.docs.md` and keeps the
fabrication contained and consistent:

- **`FICTIONAL_COMPANIES`** (`features/case-studies/data/`) — one roster
  of clearly-fictional companies (Fieldnote, Atlas Logistics, Nova
  Commerce, Northwind AI, Harborline Cloud, Acme Health), reused by the
  Proof Engine's and Social Proof's case studies and the Product
  Showcase's experience pods, so the same fictional client doesn't
  accidentally get contradictory details in two places.
- **`TESTIMONIALS`** (`features/case-studies/data/testimonials.ts`,
  Milestone 9) — three testimonials, one per company with a real case
  study, each quote grounded in that case study's actual `outcome`/
  `metrics` rather than generic praise, cross-referenced against
  `CASE_STUDIES`/`FICTIONAL_COMPANIES` in its own test. Deliberately
  does _not_ include a business-age or client-count stat — see
  `SocialProof.docs.md`.
- **`KNOWLEDGE_ARTICLES`** (`features/knowledge/data/`, reused here by the
  homepage's Knowledge Center Preview) — separate, local typed data,
  deliberately _not_ wired to the `content-collections` MDX pipeline (see
  "Scope boundaries," below).
- The Adaptive Hero's `trustIndicators` are qualitative capability labels
  ("Product Strategy," "Long-Term Partnership"), not statistics — there's
  no client history to substantiate a number yet.

## Scope boundaries

This milestone builds the homepage experience honestly, which means
several modules are real, working UI in front of no backend at all — and
say so in their own copy rather than pretending otherwise (CLAUDE.md Part
19: "clicking a slot or submitting an email genuinely updates state...
but neither has a backend yet... Both say so in their own copy"):

| What looks real                                      | What it actually is                                                                                                                                                                                       |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Byld AI Companion conversation                       | Keyword-regex intent matching (`engine/intents.ts`) against a fixed response table (`engine/responses.ts`) — **not** a live LLM. "Thinking…" is a fixed `setTimeout` delay, not token streaming.          |
| Calendar slot picker (Conversion Experience)         | Renders real availability UI and a real toast on selection; no booking system behind it.                                                                                                                  |
| Newsletter signup                                    | Real form state and a real success message; no email service behind it.                                                                                                                                   |
| `/buildpath` and `/knowledge` routes                 | Real, minimal Next.js pages (with real `generateMetadata`/`generateStaticParams`) rather than modals or dead links — but a teaser of the full CLAUDE.md Part 17/18 products, not the products themselves. |
| Product Showcase's seven "experience pods"           | Genuinely interactive mini-dashboards over local mock state (filtering, sorting, tab switching all work) — not screenshots, but also not connected to any real data source.                               |
| Knowledge Center articles, Proof Engine case studies | Local typed data (see "Fictional data," above), not a CMS.                                                                                                                                                |

None of this is a shortcut taken silently — every one of these decisions
is documented in the relevant module's own `.docs.md`, and none of them
block a real backend from being added later without changing the UI
contract (e.g. `useAiCompanion`'s `sendMessage` already has the shape a
real API call would need).

## Testing

- **Unit** (`*.test.tsx`, Vitest + Testing Library): one per component,
  per the standard contract.
- **Storybook a11y** (`vitest --project=storybook`): every module's
  stories pass the same axe gate as every design-system primitive.
- **E2E** (`e2e/homepage.spec.ts`, `e2e/not-found.spec.ts`, Playwright):
  the real composed page — arrival skip, every section rendering in
  order, journey-driven personalization, opening the AI Companion, theme
  switching, and the full-page axe scan described above.
