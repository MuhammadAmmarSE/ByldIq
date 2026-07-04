# Container

Centers content and caps its width using the `--container-*` tokens
(`tokens.css` → `--layout-width-{narrow,content,wide}`). This is the
"Responsive Grid" / "Global Layout" building block every page section
should wrap its content in, instead of hardcoding a max-width.

## Usage

```tsx
<Container size="content">
  <Heading variant="h1">...</Heading>
</Container>
```

## Props

| Prop   | Type                              | Default     |
| ------ | --------------------------------- | ----------- |
| `size` | `"narrow" \| "content" \| "wide"` | `"content"` |
| `as`   | `ElementType`                     | `"div"`     |
