# MetricCard

An animated stat card (CLAUDE.md Part 6: "Metrics. Animated counting.").
Built on the existing `useCountUp` hook — no new counting
implementation — the same one `HeroProductPreview` already uses.

## Accessibility

The animated digits are `aria-hidden` (a screen reader shouldn't
narrate every intermediate frame of the count-up), paired with one
`sr-only` node that announces the label and final value once — the
same pattern `HeroProductPreview` established.

## Usage

```tsx
<MetricCard value={12400} label="Active users" suffix="+" />
<MetricCard value={98} label="Deployment success rate" suffix="%" />
<MetricCard value={2} label="Average cost reduction" prefix="$" suffix="M" />
```

## Props

| Prop       | Type     | Default | Notes                                                                                                     |
| ---------- | -------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `value`    | `number` | —       | Final value the counter animates to.                                                                      |
| `label`    | `string` | —       |                                                                                                           |
| `prefix`   | `string` | `""`    | e.g. `"$"`.                                                                                               |
| `suffix`   | `string` | `""`    | e.g. `"%"`, `"+"`, `"M"`.                                                                                 |
| `decimals` | `number` | `0`     | Decimal places. Inherits `useCountUp`'s rounding — see its own source before relying on a non-zero value. |
| `duration` | `number` | —       | Seconds. Passed through to `useCountUp`.                                                                  |

## Motion

Counts up once the card scrolls into view; jumps straight to the final
value under `prefers-reduced-motion` (handled inside `useCountUp`, not
duplicated here).
