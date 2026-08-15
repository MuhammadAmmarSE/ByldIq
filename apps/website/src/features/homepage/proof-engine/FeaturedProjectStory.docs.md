# FeaturedProjectStory

The Proof Engine's large, single-project cinematic presentation
(CLAUDE.md Part 13 and Part 11's Featured Project structure: image, name,
industry, problem, technology, business result).

## Two consumers

Originally built for the homepage's Proof Engine (`ProofEngine.tsx`).
Milestone 11 also uses it on `/work` (`WorkExplorer`) for the single
most-featured case study, replacing what had been a regular-sized
`ProjectCard` there — the spec calls for one large cinematic story, not a
grid, and this component already existed rather than needing a second
one built for Work specifically.

## Visual band

`ProjectVisual` (Milestone 11) — see its own docs for why this is a
gradient + blueprint grid rather than a real photo.

## Analytics

Takes an optional `onSelect(slug)`, called when "Read the full story" is
clicked — the caller (`ProofEngine`, `WorkExplorer`) is responsible for
the actual `track()` call, the same division of responsibility
`ProjectCard` already uses.
