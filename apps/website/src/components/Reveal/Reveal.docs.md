# Reveal

Scroll-triggered fade + slide-up entrance. The default motion pattern for
homepage/section content per CLAUDE.md Part 6 ("Entrance Animations").

## Usage

```tsx
<Reveal>
  <Card>...</Card>
</Reveal>;

{
  /* staggered sequence */
}
{
  items.map((item, i) => (
    <Reveal key={item.id} delay={i * 0.1}>
      {item.content}
    </Reveal>
  ));
}
```

## Props

| Prop    | Type          | Default | Notes                                        |
| ------- | ------------- | ------- | -------------------------------------------- |
| `as`    | `ElementType` | `"div"` | Rendered tag.                                |
| `delay` | `number`      | `0`     | Seconds, for hand-written stagger sequences. |

## Accessibility / motion

Animates once (`viewport={{ once: true }}`) — content never re-hides after
its first reveal, so it can't trap a keyboard/screen-reader user in a
"not yet visible" state. Automatically respects `prefers-reduced-motion`
via the app-wide `MotionConfig` (`reducedMotion="user"`).
