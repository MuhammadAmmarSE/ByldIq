# Radio

A single-select group of options, built on Radix `RadioGroup`.
`RadioGroup` is the container; `RadioGroupItem` is each option.

## Usage

```tsx
<RadioGroup aria-label="Journey" defaultValue="startup">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="startup" id="journey-startup" />
    <Label htmlFor="journey-startup">Startup</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="enterprise" id="journey-enterprise" />
    <Label htmlFor="journey-enterprise">Enterprise</Label>
  </div>
</RadioGroup>
```

## Props

`RadioGroup` extends Radix `RadioGroupPrimitive.Root` props (`value`,
`defaultValue`, `onValueChange`, `disabled`, ...). `RadioGroupItem`
extends `RadioGroupPrimitive.Item` props (`value`, `disabled`, ...).

## Accessibility

- Arrow keys move focus and selection between items in the group; `Tab`
  enters/exits the group as a single stop — the roving-tabindex pattern
  Radix implements matches the native ARIA radio-group spec.
- `RadioGroup` needs an accessible name (`aria-label` or
  `aria-labelledby`) describing the choice being made.
- Each `RadioGroupItem` needs its own `Label`.
