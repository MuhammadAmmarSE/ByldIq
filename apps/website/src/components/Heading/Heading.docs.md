# Heading

Display / H1–H6 type scale, per CLAUDE.md Part 5 ("Typography carries
authority... large headings, comfortable reading, clear hierarchy").

## Usage

```tsx
<Heading variant="h1">Build products that scale.</Heading>;

{
  /* Visually h1, but semantically h2 because an h1 already exists */
}
<Heading variant="h1" as="h2">
  Section heading
</Heading>;
```

## Props

| Prop      | Type                                                        | Default | Notes                            |
| --------- | ----------------------------------------------------------- | ------- | -------------------------------- |
| `variant` | `"display" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h1"`  | Controls visual size/weight.     |
| `as`      | `ElementType`                                               | —       | Overrides the rendered tag only. |

## Accessibility

Keep heading _order_ (semantic tag) correct for document outline even
when the visual size needs to differ — that's what `as` is for. Never
skip heading levels to achieve a visual effect; use `variant` instead.
