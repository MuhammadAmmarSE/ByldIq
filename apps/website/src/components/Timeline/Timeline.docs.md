# Timeline

A vertical sequence of steps — e.g. the Product Thinking Experience's
Idea → Discovery → ... → Growth stages (CLAUDE.md Part 12), or a
BuildPath roadmap phase list.

## Usage

```tsx
<Timeline
  items={[
    { title: "Discovery", description: "Understand the business.", status: "complete" },
    { title: "Architecture", description: "Design the system.", status: "current" },
    { title: "Launch", status: "upcoming" },
  ]}
/>
```

## Props

| Prop    | Type                                 | Default | Notes                                        |
| ------- | ------------------------------------ | ------- | -------------------------------------------- |
| `items` | `{ title, description?, status? }[]` | —       | Required. `status` defaults to `"upcoming"`. |

`status` is `"complete" \| "current" \| "upcoming"` — determines the dot
style (filled with a checkmark, hollow accent ring, or muted).

## Accessibility / motion

Renders as a semantic `<ol>`/`<li>` list. The connecting line and dots
are decorative (`aria-hidden`); status is also conveyed through text
color and the title itself, never color alone. No motion — wrap in
`Reveal`/`staggerContainer` for scroll-triggered entrance where
appropriate.
