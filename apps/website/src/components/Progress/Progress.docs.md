# Progress

A determinate progress indicator, built on Radix `Progress`. For
indeterminate loading, use `Spinner` instead.

## Usage

```tsx
<Progress value={40} label="Generating roadmap" />
```

## Props

Extends Radix `ProgressPrimitive.Root` props (`value`, `max`), plus:

| Prop    | Type     | Default | Notes                                               |
| ------- | -------- | ------- | --------------------------------------------------- |
| `label` | `string` | —       | Accessible name announced alongside the percentage. |

## Accessibility

Renders `role="progressbar"` with `aria-valuenow`/`aria-valuemax`
managed by Radix. Always provide a `label` describing what's in
progress ("Generating roadmap," not "Progress").
