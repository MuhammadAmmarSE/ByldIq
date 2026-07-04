# JourneyCard

A single journey choice within `JourneySelector` — icon, title, one
sentence, and a few example goals as chips. Not meant to be used outside a
`RadioGroupPrimitive.Root` ancestor (it renders `RadioGroupPrimitive.Item`
directly).

## Props

| Prop            | Type                         | Description                                                           |
| --------------- | ---------------------------- | --------------------------------------------------------------------- |
| `journey`       | `JourneyDefinition`          | Icon, title, description, and examples for one journey.               |
| `isSelected`    | `boolean`                    | Whether this card is the current selection.                           |
| `isAnySelected` | `boolean`                    | Whether any card is selected — de-emphasizes every non-selected card. |
| `onHover`       | `(journey: Journey) => void` | Fired on pointer enter, for the `journey_hovered` analytics event.    |

## Do

- Keep the description to one sentence — the card layout has no room for
  more, per CLAUDE.md Part 10 ("minimal text").

## Don't

- Don't render this outside a Radix `RadioGroup.Root` — it depends on that
  context for its ARIA role and keyboard behavior.
