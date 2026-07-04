# Textarea

A multi-line text field. A thin, styled wrapper around the native
`<textarea>`.

## Usage

```tsx
<Label htmlFor="description">Project description</Label>
<Textarea id="description" placeholder="Tell us about your product..." />
```

## Props

Extends `TextareaHTMLAttributes<HTMLTextAreaElement>`, plus:

| Prop      | Type      | Default | Notes                                                             |
| --------- | --------- | ------- | ----------------------------------------------------------------- |
| `invalid` | `boolean` | `false` | Sets `aria-invalid` and switches to the danger border/focus ring. |

## Accessibility

Always pair with a `Label`. When `invalid`, connect the error message
with `aria-describedby`.
