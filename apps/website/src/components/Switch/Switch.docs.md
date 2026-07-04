# Switch

An on/off toggle for immediate-effect settings, built on Radix `Switch`.
Use `Checkbox` instead for form fields that require explicit submission.

## Usage

```tsx
<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

## Props

Extends Radix `SwitchPrimitive.Root` props (`checked`, `defaultChecked`,
`onCheckedChange`, `disabled`, ...).

## Accessibility

`Space` toggles when focused. Renders `role="switch"` with
`aria-checked`, distinct from `Checkbox`'s `role="checkbox"` — screen
readers announce it as a toggle, not a selection. Always pair with a
`Label` or `aria-label`.
