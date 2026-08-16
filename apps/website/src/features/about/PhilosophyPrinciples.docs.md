# PhilosophyPrinciples

CLAUDE.md Milestone 13 §3's Our Philosophy: six core beliefs (`data/philosophy-principles.ts`),
each a paraphrase of CLAUDE.md's own already-established beliefs (Part 1's
Core Principles, Part 3's Product Philosophy) — not new claims invented
for this page.

## Motion

Cards reveal sequentially on scroll into view via `staggerItemTransformOnly`
(`y`-translate only, never `opacity`) rather than the usual fade-based
`staggerItem` — `FeatureCard`'s description uses `text-muted`, the same
marginal-contrast token whose opacity-fade entrance produced a real axe
`color-contrast` failure in `ProjectGrid` (see
`CaseStudyEngineeringProcess.docs.md` for the full history this repeats).

## Analytics

`about_philosophy_interaction` fires with `{ principle }` on hover — the
only interaction a non-interactive card (no link, no click target) can
meaningfully offer.
