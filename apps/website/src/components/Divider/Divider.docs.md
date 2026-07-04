# Divider

A visual (and optionally semantic) rule separating content.

## Usage

```tsx
<Divider />
<Divider orientation="vertical" />
{/* Separates genuinely distinct sections, announced to assistive tech */}
<Divider decorative={false} />
```

## Props

| Prop          | Type                         | Default        | Notes                                                           |
| ------------- | ---------------------------- | -------------- | --------------------------------------------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Vertical dividers need an explicit height from their container. |
| `decorative`  | `boolean`                    | `true`         | `false` exposes `role="separator"` for assistive tech.          |

## Accessibility / motion

Decorative by default (hidden from the accessibility tree) since most
dividers are purely visual rhythm, not a semantic boundary. Set
`decorative={false}` only when the separation itself is meaningful. No
motion.
