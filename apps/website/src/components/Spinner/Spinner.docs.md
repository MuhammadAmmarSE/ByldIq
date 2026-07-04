# Spinner

Indeterminate loading indicator. Uses `currentColor`, so it inherits text
color from its container (place it inside an element with the right
`text-*` class to match the surrounding UI, e.g. `text-accent-foreground`
on an accent-colored button).

## Usage

```tsx
<Spinner />
<Spinner size="sm" label="Saving changes" />
```

## Props

| Prop    | Type                                   | Default     | Notes                                    |
| ------- | -------------------------------------- | ----------- | ---------------------------------------- |
| `size`  | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"`      | Matches `Icon`'s size scale.             |
| `label` | `string`                               | `"Loading"` | Accessible name, read by screen readers. |

## Accessibility / motion

Wrapped in `role="status"` with a visually-hidden label so assistive tech
announces the busy state. The rotation keeps running under
`prefers-reduced-motion` — unlike decorative animation, it's the only
signal that work is in progress and carries no vestibular risk at this
size.

## Do / Don't

- Do use inside `Button`'s `loading` state or standalone for section-level
  loading.
- Don't use as a substitute for a `Skeleton` when the final layout is
  already known — skeletons communicate shape and reduce perceived wait
  time better than a spinner.
