# Label

A form field label, built on Radix `Label`. Use it with every form
primitive — clicking the label text focuses (or, for `Checkbox`/`Switch`,
toggles) the associated control.

## Usage

```tsx
<Label htmlFor="company-name">Company name</Label>
<Input id="company-name" />
```

## Accessibility

Associate via `htmlFor` matching the control's `id` for native elements
(`Input`, `Textarea`). Radix `Checkbox`/`Switch`/`RadioGroup` items also
respond to label clicks the same way even though they're not native form
controls.
