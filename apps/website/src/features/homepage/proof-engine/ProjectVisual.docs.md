# ProjectVisual

Milestone 11's "Project Image" slot (CLAUDE.md Part 11) on `ProjectCard`
and `FeaturedProjectStory` — without any real project photography.

## Why not a real image

No product photography exists for the fictional companies in
`data/case-studies.ts`, and CLAUDE.md Part 5's photography philosophy
explicitly rules out generic stock imagery as a stand-in ("Avoid generic
office photos... whenever possible, create original imagery"). Rather
than skip the visual slot entirely or fabricate a fake screenshot,
`ProjectVisual` renders an accent gradient plus `BlueprintGrid` — reads
as "engineered," per Part 5's illustration philosophy
(blueprint/wireframe/minimal geometric), not as an empty placeholder or
a lie about being a real photo.

## One consistent treatment, not per-project variation

Every instance looks the same (gradient + grid) — CLAUDE.md Part 20's
visual direction explicitly warns against "random gradients." Variety
isn't worth trading away "Consistency builds trust" (Part 4) for.

## Usage

The parent must apply `group` (for the hover-responsive grid scale/opacity)
and size the visual via `className` — `ProjectVisual` itself is
unstyled beyond the gradient/grid treatment:

```tsx
<Card className="group overflow-hidden">
  <ProjectVisual id={`project-visual-${caseStudy.slug}`} className="h-32 w-full" />
  <Card.Header>...</Card.Header>
</Card>
```

`id` must be unique per instance on the page — passed straight through to
`BlueprintGrid`, whose SVG `<pattern>` id is otherwise global to the
document.

## Accessibility

Entirely decorative — `BlueprintGrid` is `aria-hidden`, and
`ProjectVisual` itself renders no text content.
