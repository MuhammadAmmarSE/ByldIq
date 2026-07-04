# Card

A compound component for grouping related content — per CLAUDE.md Part 5,
cards should "feel like physical objects," communicating grouping and
hierarchy, never existing purely for decoration.

## Usage

```tsx
<Card>
  <Card.Header>
    <h3>Startup Product Engineering</h3>
  </Card.Header>
  <Card.Content>
    <p>From validation to launch.</p>
  </Card.Content>
  <Card.Footer>
    <Button size="sm">Explore Startup Projects</Button>
  </Card.Footer>
</Card>
```

## Composition

| Part           | Notes                                                            |
| -------------- | ---------------------------------------------------------------- |
| `Card`         | Root container — border, background, elevation.                  |
| `Card.Header`  | Optional. Title/description area.                                |
| `Card.Content` | Main body. Assumes a preceding `Header` for correct top spacing. |
| `Card.Footer`  | Optional. Border-separated action area (buttons, links).         |

Compose in that order (`Header` → `Content` → `Footer`); each part is a
plain `div` with `ComponentPropsWithoutRef<"div">`, so any native prop
works.

## Accessibility / motion

`Card` carries no implicit semantics or interactivity — if the whole card
is clickable, make the primary heading or an explicit control the focus
target rather than attaching a click handler to the outer `div`. No
built-in motion; wrap in `Reveal` for scroll-triggered entrance where
appropriate.
