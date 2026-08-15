# HeroBackdrop

The Adaptive Hero's layered background, composed entirely from real
primitives (`BlueprintGrid`, `ParticleField`, `LightSweep`,
`useMouseParallax`, the `--gradient-surface` token) rather than a
one-off implementation — see each primitive's own `.docs.md` for its
individual reasoning.

## Genuine parallax depth

Two glow layers each call `useMouseParallax` with a different
`strength` (12 and 28) so they drift at different rates as the cursor
moves — real multi-depth parallax, distinct from the Arrival
Experience's `BlueprintBackdrop`, which moves a single light layer.

## Not reused for Arrival

`BlueprintBackdrop` isn't rebuilt on these primitives here — it's a
full-screen takeover with its own pacing tied to the intro sequence,
while `HeroBackdrop` sits behind hero content on every homepage visit.
Both now share the same underlying primitives; only the composition
differs.
