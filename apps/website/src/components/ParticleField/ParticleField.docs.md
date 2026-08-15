# ParticleField

A field of faint floating dots — decorative texture, never content.
Generalizes the Arrival Experience's `BlueprintBackdrop`, which
hardcoded 4 fixed particles, into a reusable, configurable primitive
any section can drop into a `relative` background container.

## Deterministic, not random

Particle positions come from a golden-angle spiral formula, not
`Math.random()` — a random layout would render differently on the
server than the client and fail hydration. The same reasoning
`BlueprintBackdrop`'s hardcoded array already followed, generalized to
any `count`.

## Usage

```tsx
<div className="relative overflow-hidden">
  <ParticleField count={16} />
  {/* foreground content */}
</div>
```

## Accessibility / motion

Always `aria-hidden` — parent containers must not rely on this for any
meaningful content. Renders nothing at all under
`prefers-reduced-motion` rather than a static fallback, since a field
of motionless dots adds no value once it can't drift.
