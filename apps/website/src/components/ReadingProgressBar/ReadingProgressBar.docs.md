# ReadingProgressBar

CLAUDE.md Part 18/23's Reading Experience: a thin bar fixed to the top of
the viewport, filled by how far down the page a visitor has scrolled.
Built on `useReadingProgress` (`@/hooks`) and the design system's real
`Progress` primitive.

## History

Originally `KnowledgeReadingProgress`, specific to `/knowledge/[slug]`.
Promoted to this shared, generic component in Milestone 12 once Case
Studies (`/work/[slug]`) became a second real consumer — CLAUDE.md Part
27: "promote only after multiple real use cases." No knowledge-specific
logic ever existed in the original; the rename reflects that.

## Usage

```tsx
<ReadingProgressBar />
```

Render once per page, typically near the top of the page's JSX (it's
`fixed`, so placement in the tree doesn't affect layout).

## Reading completion (Milestone 12)

`onComplete` fires once, the first time scroll progress reaches 100% —
built for CLAUDE.md Part 12's `reading_completion` analytics event
without a second scroll listener duplicating this component's own:

```tsx
<ReadingProgressBar
  onComplete={() => analytics.track("case_study_reading_completed", { slug: caseStudy.slug })}
/>
```
