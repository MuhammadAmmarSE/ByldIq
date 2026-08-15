# FeatureCard

An icon + title + description card for "here's a capability" content —
technology grids, capability explorers, solution highlights.

## Static vs. linked

Without `href`, renders a plain `Card` (no hover elevation — nothing to
click). With `href`, renders the whole card as a `<Link>` with a hover
lift, matching the interaction pattern `JourneyCard` and `ProjectCard`
already use elsewhere.

## Not a replacement for JourneyCard

`JourneyCard` (homepage journey selection) is built on Radix
`RadioGroup.Item` — a genuinely different interaction (single choice
from a set, with `aria-checked` semantics) than this component's
"static or single link" card. It isn't rebuilt on top of `FeatureCard`.

## Usage

```tsx
<FeatureCard
  icon={Rocket}
  title="Fast Deployment"
  description="Ship to production in minutes, not days."
/>

<FeatureCard
  icon={ShieldCheck}
  title="Startup Solutions"
  description="MVPs built to validate fast."
  href="/solutions/startup"
  ctaLabel="Explore Startup Solutions"
/>
```

## `ctaLabel`

An optional visible "Learn more"-style line at the bottom of a linked
card (added in Milestone 9 for the homepage's "What We Build" grid,
which needed an explicit CTA per spec) — matches the "Explore X →"
treatment `SolutionCard`/`ProjectCard` already use. Ignored without
`href`, since a static card has nowhere to send the click.

## Accessibility

Linked mode is a real `<Link>` (renders an `<a>`), keyboard operable
with the global focus ring. The icon is decorative (`Icon` defaults to
`aria-hidden`) — the title text carries the meaning.
