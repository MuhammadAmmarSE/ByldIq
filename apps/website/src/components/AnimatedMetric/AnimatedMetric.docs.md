# AnimatedMetric

Milestone 11's answer to CLAUDE.md Part 11's "metrics should animate when
entering the viewport" — for the free-text metric values case studies
and projects actually store (`data/case-study.schema.ts`'s
`metrics[].value`), not a clean number.

## Why not just use MetricCard directly

`MetricCard` requires a numeric `value` — real metric values are prose:
`"+17%"`, `"99.97%"`, `"1,200+"`, but also `"Zero unplanned"` and
`"2 days -> 12 min"`. `AnimatedMetric` is `AnimatedMetricValue` (which
parses the string via `parseMetricValue`, `@/utils/metric-value`, and
counts up when a clean number can be extracted) plus a label, wrapped in
a `Card`. See `AnimatedMetricValue`'s own docs for why a non-numeric
value falls back to its literal string instead of animating a misleading
substring of it.

## No opacity-based entrance animation on the card

An earlier version wrapped the `Card` in `Reveal` (a scroll-triggered
`opacity: 0 -> 1` fade) so both the counting and non-counting paths had
_some_ motion. Reverted: axe's Storybook a11y scan caught the label and
value text mid-fade, at partial opacity blended toward the white
background — a real, reproducible `color-contrast` failure, not a
hypothetical one (the settled, opacity-1 state passes fine; the problem
is purely the in-between frame axe happened to scan).

The count-up itself — a text-content change via React state, not an
opacity/color change — is what actually satisfies "animate when entering
the viewport" for a parseable value, without that risk. A non-numeric
value has no motion at all now, which is an honest trade-off: real
accessibility correctness took priority over matching the letter of
"animate" for the minority of metrics that can't be counted anyway.

## Usage

```tsx
<AnimatedMetric value="+17%" label="Checkout conversion" />
<AnimatedMetric value="99.97%" label="Platform uptime" />
<AnimatedMetric value="Zero unplanned" label="Migration downtime" />
```

## Accessibility

Inherits `AnimatedMetricValue`'s aria-hidden-animated-digits +
one-time-`sr-only`-announcement pattern for the counting path. The
fallback path is plain, always-visible text — nothing to hide from
assistive tech.
