# Badge

A small status or category label. Never interactive on its own — if a tag
needs to be clickable, wrap it or use `Button` instead.

## Usage

```tsx
<Badge>Neutral</Badge>
<Badge variant="success">Live</Badge>
<Badge variant="danger">Deprecated</Badge>
```

## Props

| Prop      | Type                                                                       | Default     | Notes |
| --------- | -------------------------------------------------------------------------- | ----------- | ----- |
| `variant` | `"neutral" \| "accent" \| "success" \| "warning" \| "danger" \| "outline"` | `"neutral"` |       |

## Accessibility / motion

Purely visual — no motion, no interaction. If a badge conveys status that
matters to the task (e.g. "Failed"), don't rely on color alone; pair it
with the text label, as shown above.
