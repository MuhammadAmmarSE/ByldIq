# TechnologyCard

A Technology Explorer grid card (CLAUDE.md Part 22). Shows the technology's
name, category, maturity, tagline, and top three strengths as scannable
chips.

## Navigation, not a modal

Clicking navigates straight to `/technology/[slug]` — the same pattern the
Proof Engine's `ProjectCard` and Case Studies' cards use, so business
outcomes and engineering reasoning always live on a dedicated page rather
than a shallow preview.

## Props

- `technology` — the full `Technology` record.
- `categoryLabel` — resolved by the parent grid from `TECHNOLOGY_CATEGORIES`;
  optional so the card still renders sensibly if a category is ever removed.
- `onSelect` — reports the clicked slug for analytics; the parent is
  responsible for calling `analytics.track("technology_card_clicked", ...)`.

## Accessibility

The entire card is clickable via a single accessible link (the
`after:absolute after:inset-0` overlay technique) rather than nested
interactive elements.
