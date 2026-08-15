# PricingCard

A pricing tier card: name, price, feature list, and a CTA.

## Featured tier

`featured` applies a 1px `--gradient-accent` border (Milestone 8 Phase
A's brand gradient token) and a "Recommended" badge — the first real
consumer of that token.

## CTA: button or link

Provide `onCtaClick` for a button, or `ctaHref` for a link (rendered via
`Button asChild`). They're mutually exclusive in practice — a pricing
CTA either performs an action in place or navigates somewhere.

## Usage

```tsx
<PricingCard
  tier="Growth"
  price="$4,500/mo"
  description="For teams shipping regularly."
  features={["Weekly architecture reviews", "Priority support"]}
  ctaLabel="Talk to Byld"
  onCtaClick={openAiCompanion}
  featured
/>
```

## Price is a string, not a number

Unlike `MetricCard`, `price` is pre-formatted text (`"$4,500/mo"`,
`"Custom"`) rather than an animated number — real pricing display
rarely fits one numeric shape, and a price isn't a metric worth
counting up to.

## Content

No real Byld IQ pricing is published anywhere in this component or its
stories — CLAUDE.md's "never fabricate numbers" applies to prices as
much as any other figure. Storybook examples are illustrative only.
