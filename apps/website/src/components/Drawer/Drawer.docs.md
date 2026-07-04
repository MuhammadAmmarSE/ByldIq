# Drawer

A side-sheet overlay, built on Radix `Dialog` (the same foundation as
`Modal`, docked to a viewport edge instead of centered) — for filters,
secondary navigation, or contextual detail panels.

## Usage

```tsx
const [open, setOpen] = useState(false);

<Drawer open={open} onOpenChange={setOpen} title="Filter projects" side="right">
  <p>Filter controls...</p>
</Drawer>;
```

## Props

Same as `Modal`, plus:

| Prop   | Type                | Default   | Notes                           |
| ------ | ------------------- | --------- | ------------------------------- |
| `side` | `"left" \| "right"` | `"right"` | Which edge the drawer docks to. |

## Accessibility

Identical guarantees to `Modal` (focus trap, `Escape` to close, focus
returned to trigger) — Drawer is a Modal with different positioning, not
a different interaction pattern.
