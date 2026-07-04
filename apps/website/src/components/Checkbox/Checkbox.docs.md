# Checkbox

A single on/off control, built on Radix `Checkbox` for correct
`role="checkbox"` semantics and keyboard behavior.

## Usage

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">I agree to the terms of service</Label>
</div>
```

## Props

Extends Radix `CheckboxPrimitive.Root` props (`checked`, `defaultChecked`,
`onCheckedChange`, `disabled`, `required`, ...).

## Accessibility

- `Space` toggles when focused.
- Always pair with a `Label` — either wrap both in a `<label>` or connect
  via `htmlFor`/`id` (Radix `Label` handles activating the checkbox on
  click either way).
- Always provide an accessible name (`Label` or `aria-label`) — the
  checkbox itself has no visible text.
