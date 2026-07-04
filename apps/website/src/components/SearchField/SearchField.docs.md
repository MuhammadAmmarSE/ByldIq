# SearchField

A search input built on `Input` + `Icon` — a leading search icon, and an
optional clear ("x") button when `onClear` is provided and the field has
a value.

## Usage

```tsx
<SearchField
  aria-label="Search knowledge center"
  placeholder="Search articles, technologies..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery("")}
/>
```

## Props

Extends `InputHTMLAttributes<HTMLInputElement>` (minus `type`, fixed to
`"search"`), plus:

| Prop         | Type         | Default | Notes                                                                          |
| ------------ | ------------ | ------- | ------------------------------------------------------------------------------ |
| `aria-label` | `string`     | —       | Required — search fields rarely have a visible label.                          |
| `onClear`    | `() => void` | —       | Renders the clear button. Requires controlled usage (`value` set) — see below. |

## Accessibility

Renders as `role="searchbox"` (native `<input type="search">`). Because
the clear button's visibility depends on the current `value`, `onClear`
only takes effect in **controlled** usage (`value` + `onChange` both
set) — in uncontrolled usage the component never sees the typed value,
so the clear button won't appear.
