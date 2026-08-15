# TechnologyEcosystem

Milestone 9's Technology Ecosystem homepage section: a category-filterable
preview of the real Technology Explorer platform (Milestone 6).

## Reuses the real platform, not a parallel "our stack" list

The M9 spec names eight illustrative categories (Frontend, Backend,
Cloud, AI, DevOps, Commerce, Mobile, Databases). Rather than hand-listing
technology names against those categories — a second taxonomy that
would drift out of sync with the real `/technology` platform — this
section filters and renders the actual `TECHNOLOGIES` dataset via the
same `TechnologyCard`/`TechnologyGrid` components the full platform
uses, over the real `POPULATED_CATEGORIES` (categories with at least one
technology, per CLAUDE.md Part 8's "no dead ends").

## Filtering

Category `Chip`s (Milestone 8 Phase B) toggle a client-side filter over
`TECHNOLOGIES`. Selecting a category again, or "All", clears it. Every
filter change fires `technology_ecosystem_category_filtered`.

## Analytics

- `technology_ecosystem_category_filtered` — `{ category }` (`null` when cleared).
- `technology_ecosystem_card_clicked` — `{ slug }`, fired via `TechnologyGrid`'s `onSelect`.
