# LightSweep

A faint diagonal beam that periodically sweeps across its container
(CLAUDE.md Part 9's "Light sweeps").

## Restrained, not looping

The beam pauses between passes (`repeatDelay`, defaulting to 6s)
rather than sweeping continuously — a premium accent reads as
occasional, not as a constantly-moving background that competes with
foreground content (CLAUDE.md Part 4: "Avoid... competing animations").

## Usage

```tsx
<div className="relative overflow-hidden">
  <LightSweep interval={8} />
  {/* foreground content */}
</div>
```

## Accessibility / motion

Always `aria-hidden`. Renders nothing under `prefers-reduced-motion`
rather than a static fallback — a light sweep with no motion isn't a
sweep.
