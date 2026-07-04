# Text

Subtitle / Body / Caption / Code type scale — the non-heading half of the
typography system (see `Heading` for Display/H1–H6).

## Usage

```tsx
<Text variant="body">Regular paragraph copy.</Text>
<Text variant="caption">Supporting detail.</Text>
<Text variant="code" as="span">inline code</Text>
```

## Props

| Prop      | Type                                          | Default  | Notes                       |
| --------- | --------------------------------------------- | -------- | --------------------------- |
| `variant` | `"subtitle" \| "body" \| "caption" \| "code"` | `"body"` | Controls size/color/family. |
| `as`      | `ElementType`                                 | —        | Overrides the rendered tag. |
