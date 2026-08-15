# AnimatedMetricValue

The bare counting text for a metric's value — no label, no card. Built
for Milestone 11's `ProjectCard` (a compact inline metric grid) which
needed the same "animate when entering the viewport" behavior
(`AnimatedMetric`) without inheriting a full stat card layout.

## Relationship to AnimatedMetric

Both components share `useAnimatedMetric` (`@/hooks/useAnimatedMetric`)
for the actual parsing/formatting/counting logic, so the two don't
duplicate it for two different layouts:

- **`AnimatedMetricValue`** — the value only, sized by whatever
  `className` the caller passes. Used inline (`ProjectCard`'s compact
  grid) or composed into a larger layout (`AnimatedMetric` itself).
- **`AnimatedMetric`** — `AnimatedMetricValue` + a label, wrapped in a
  `Card` and a scroll-triggered `Reveal`. Used for a dedicated stat
  section (`CaseStudyResults`).

## Usage

```tsx
<p className="text-foreground text-lg font-semibold">
  <AnimatedMetricValue value="+17%" />
</p>
<p className="text-muted text-xs">Checkout conversion</p>
```

## Non-numeric fallback

`parseMetricValue` returns `null` for prose that isn't a clean number
(`"Zero unplanned"`, `"2 days -> 12 min"`) — `AnimatedMetricValue`
renders that string literally rather than animating a misleading
substring of it. See `useAnimatedMetric`'s and `parseMetricValue`'s doc
comments for the full reasoning.

## Accessibility

The animated (or literal) digits render inside an `aria-hidden` span
paired with one `sr-only` span announcing the real final value once —
the same pattern `MetricCard` established, so a screen reader never
narrates intermediate count-up frames.
