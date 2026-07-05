# SolutionCard

A single card in the Solutions landing page's Solution Selector (CLAUDE.md
Part 20): business problem, one headline business outcome, typical
companies, an architecture preview (the first three architecture nodes),
and up to four technologies — a real navigable link to the solution page,
not a radio choice.

## Props

| Prop            | Type                     | Default | Description                                              |
| --------------- | ------------------------ | ------- | -------------------------------------------------------- |
| `solution`      | `Solution`               | —       | The full solution record (`features/solutions/data`).    |
| `isRecommended` | `boolean`                | `false` | Shows the "Recommended for you" badge and accent border. |
| `onSelect`      | `(slug: string) => void` | —       | Fired on click, before navigation.                       |
| `onHover`       | `(slug: string) => void` | —       | Fired on pointer enter.                                  |

## Accessibility

The whole card is a single `<Link>` — its accessible name is the card's
full text content, which is intentional (a screen reader user hears the
complete card, not just a title, before deciding whether to follow it).
Keyboard users reach it exactly like any other link (Tab, Enter).
