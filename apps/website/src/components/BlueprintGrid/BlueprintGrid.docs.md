# BlueprintGrid

A decorative fine-grid-line background, per CLAUDE.md Part 5's
illustration philosophy (blueprint/wireframe/geometric, never cartoons)
and Part 9's "very subtle blueprint grid" background layer. Used behind
empty states, section backgrounds, or as ambient texture — never as
standalone content.

## Usage

```tsx
<div className="relative overflow-hidden">
  <BlueprintGrid />
  <p className="relative">No results found.</p>
</div>
```

The parent needs `position: relative` (and typically `overflow-hidden`)
since `BlueprintGrid` is absolutely positioned to fill it; sibling
content needs `position: relative` (or higher) to render above it.

## Props

| Prop | Type     | Default            | Notes                                                                      |
| ---- | -------- | ------------------ | -------------------------------------------------------------------------- |
| `id` | `string` | `"blueprint-grid"` | Set a unique value per instance if more than one renders on the same page. |

## Accessibility

Always `aria-hidden="true"` — purely decorative texture, never conveys
information on its own.
