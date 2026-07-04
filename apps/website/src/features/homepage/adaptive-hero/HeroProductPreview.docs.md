# HeroProductPreview

The Adaptive Hero's "interactive product preview" panel: an animated
metric counter, a small bar chart, and the journey's representative
technology stack. Deliberately scoped smaller than the Interactive Product
Showcase (Part 14, built in Phase 6) — this is a glanceable hero visual,
not a second dashboard implementation.

## Accessibility

The animated counter's numeral is `aria-hidden` while it counts up; a
`sr-only` element states the real, final value immediately, so screen
reader users never have to wait for (or interpret) a live-counting number.
Bar heights and the counter both resolve instantly under
`prefers-reduced-motion`.
