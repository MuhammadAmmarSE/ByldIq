# Tooltip

A short, supplementary hint shown on hover or keyboard focus, built on
Radix `Tooltip`.

## Usage

```tsx
<Tooltip content="Book a discovery call">
  <Button>Talk to Byld</Button>
</Tooltip>
```

## Props

| Prop            | Type                                     | Default | Notes                                                        |
| --------------- | ---------------------------------------- | ------- | ------------------------------------------------------------ |
| `content`       | `ReactNode`                              | —       | Required.                                                    |
| `children`      | `ReactElement`                           | —       | A single focusable element — becomes the trigger via `Slot`. |
| `side`          | `"top" \| "right" \| "bottom" \| "left"` | `"top"` |                                                              |
| `delayDuration` | `number`                                 | `200`   | Milliseconds of hover before showing.                        |

## Accessibility

Shows on both mouse hover and keyboard focus (`Tab` to the trigger) —
never hover-only. Dismisses on `Escape` or blur. Content should be a
short label, not essential information — anything the user needs to
complete a task belongs in visible UI, not a tooltip.
