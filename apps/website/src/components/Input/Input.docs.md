# Input

A single-line text field. A thin, styled wrapper around the native
`<input>` — every native prop (`type`, `placeholder`, `required`,
`onChange`, ...) works as expected.

## Usage

```tsx
<Label htmlFor="company-name">Company name</Label>
<Input id="company-name" placeholder="Byld IQ" />

{/* Invalid state */}
<Input invalid aria-describedby="email-error" />
<p id="email-error">We couldn't verify that email address.</p>
```

## Props

Extends `InputHTMLAttributes<HTMLInputElement>`, plus:

| Prop      | Type      | Default | Notes                                                             |
| --------- | --------- | ------- | ----------------------------------------------------------------- |
| `invalid` | `boolean` | `false` | Sets `aria-invalid` and switches to the danger border/focus ring. |

## Accessibility

Always pair with a `Label` (via `htmlFor`/`id`) rather than a bare
`placeholder` — placeholder text disappears on input and isn't a
reliable accessible name. When `invalid`, connect the error message with
`aria-describedby` so screen readers announce it alongside the field.
