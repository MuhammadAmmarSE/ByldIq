# Chip

An interactive pill. Unlike `Badge` — a static status/category label,
never interactive on its own — a `Chip` always does something: toggling
a filter or removing an applied value.

## Two modes, not combined

- **Selectable** (`selected` + `onClick`): renders a real `<button
aria-pressed>`. Use for filter chips a visitor toggles on/off.
- **Removable** (`onDismiss` + `dismissLabel`): renders a non-interactive
  label with a single nested dismiss `<button>` — a chip can't be both a
  toggle and a removable value at once, since that would put two
  different interactive affordances on the same visual target.

## Usage

```tsx
<Chip selected={isActive} onClick={() => toggle("ai")}>
  AI
</Chip>

<Chip onDismiss={() => remove("next-js")} dismissLabel="Remove Next.js">
  Next.js
</Chip>
```

## Props

| Prop           | Type                                 | Default     | Notes                                                             |
| -------------- | ------------------------------------ | ----------- | ----------------------------------------------------------------- |
| `variant`      | `"neutral" \| "accent" \| "outline"` | `"neutral"` | Ignored when `selected` is `true` (renders accent).               |
| `selected`     | `boolean`                            | —           | Selectable mode.                                                  |
| `onDismiss`    | `() => void`                         | —           | Removable mode.                                                   |
| `dismissLabel` | `string`                             | —           | Required with `onDismiss` — the dismiss button's accessible name. |

## Accessibility / motion

Selectable mode is a real `<button>` with `aria-pressed`, keyboard
operable, and gets the global focus ring for free. Removable mode's only
interactive element is the dismiss button, which requires an explicit
`dismissLabel` (e.g. `"Remove Next.js"`) since an icon-only `×` has no
accessible name on its own. No motion — color/background transitions
only, via the existing `--duration-base` token.
