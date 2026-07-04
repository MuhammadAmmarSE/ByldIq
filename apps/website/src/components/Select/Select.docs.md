# Select

A styled dropdown, built on Radix `Select`. Takes an `options` array
rather than exposing Radix's full Trigger/Content/Item composition —
there's no current need for rich option content (icons, descriptions)
that would justify the larger API.

## Usage

```tsx
<Label htmlFor="journey">Journey</Label>
<Select
  options={[
    { value: "startup", label: "Startup" },
    { value: "enterprise", label: "Enterprise" },
  ]}
  placeholder="Choose a journey"
  onValueChange={(value) => setJourney(value)}
/>
```

## Props

| Prop            | Type                            | Default              | Notes                                                             |
| --------------- | ------------------------------- | -------------------- | ----------------------------------------------------------------- |
| `options`       | `{ value, label, disabled? }[]` | —                    | Required.                                                         |
| `value`         | `string`                        | —                    | Controlled selection.                                             |
| `defaultValue`  | `string`                        | —                    | Uncontrolled initial selection.                                   |
| `onValueChange` | `(value: string) => void`       | —                    |                                                                   |
| `placeholder`   | `string`                        | `"Select an option"` |                                                                   |
| `invalid`       | `boolean`                       | `false`              | Sets `aria-invalid` and switches to the danger border/focus ring. |
| `disabled`      | `boolean`                       | `false`              |                                                                   |
| `id`            | `string`                        | —                    | Set to pair with an external `Label`'s `htmlFor`.                 |

## Accessibility

Radix `Select` implements the full ARIA `listbox` pattern: `Enter`/`Space`
opens it, arrow keys move through options, typing jumps to a matching
option, `Escape` closes without changing the value. Always provide
`aria-label` or pair with a `Label`.
