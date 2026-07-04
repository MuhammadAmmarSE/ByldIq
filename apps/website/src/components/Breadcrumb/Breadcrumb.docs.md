# Breadcrumb

Shows a visitor where they are in the site hierarchy — per CLAUDE.md Part
8, every page should answer "Where am I?"

## Usage

```tsx
<Breadcrumb
  items={[
    { label: "Solutions", href: "/solutions" },
    { label: "AI", href: "/solutions/ai" },
    { label: "Conversational Systems" },
  ]}
/>
```

## Props

| Prop    | Type                 | Default | Notes                                                           |
| ------- | -------------------- | ------- | --------------------------------------------------------------- |
| `items` | `{ label, href? }[]` | —       | Required. Omit `href` on the last item — it's the current page. |

## Accessibility

Wrapped in `<nav aria-label="Breadcrumb">`; the current page is a
non-link `<span aria-current="page">`, never a link to itself. Uses
`next/link` for client-side navigation between prior levels.
