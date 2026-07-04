# Modal

A focused, blocking overlay for a single task, built on Radix `Dialog`.
For a side-sheet variant that doesn't block the whole viewport, use
`Drawer` instead.

## Usage

```tsx
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onOpenChange={setOpen}
  title="Book a discovery call"
  description="Choose a time that works for your team."
  footer={<Button onClick={() => setOpen(false)}>Confirm</Button>}
>
  <p>We'll review your project beforehand.</p>
</Modal>;
```

## Props

| Prop           | Type                      | Default | Notes                                   |
| -------------- | ------------------------- | ------- | --------------------------------------- |
| `open`         | `boolean`                 | —       | Required — controlled.                  |
| `onOpenChange` | `(open: boolean) => void` | —       | Required.                               |
| `title`        | `ReactNode`               | —       | Required — every modal needs a heading. |
| `description`  | `ReactNode`               | —       | Optional supporting text.               |
| `children`     | `ReactNode`               | —       | Body content.                           |
| `footer`       | `ReactNode`               | —       | Typically action buttons.               |

## Accessibility

Radix `Dialog` provides the full pattern: focus trapped inside while
open, focus returned to the trigger on close, `Escape` closes, background
content marked `aria-hidden`. Always provide a `title` — it's the
dialog's accessible name.
