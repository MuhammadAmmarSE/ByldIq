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

## Mobile horizontal-overflow fix

The root `<Link>` carries `min-w-0`. Every consumer of this card
(`SolutionSelector`, `IndustryDetail`, and `CaseStudyRelatedSolutions`
via `RelatedSolutions`) places it as a CSS grid item, and a grid item's
default `min-width` is `auto` — which resolves to its content's _intrinsic
minimum_ width, not `0`. The `architecturePreview` block below uses
`truncate` (`overflow: hidden; white-space: nowrap`), whose intrinsic
minimum width is its full, un-wrapped text — so on a long enough preview
string, the card (and the whole grid row it's in) was forced wider than
the mobile viewport instead of truncating, causing real page-level
horizontal scroll. `min-w-0` overrides the grid item's default sizing,
letting the card shrink to its grid track and the `truncate` block clip
as intended.
