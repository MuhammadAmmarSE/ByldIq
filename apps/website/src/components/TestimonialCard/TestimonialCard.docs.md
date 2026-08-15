# TestimonialCard

A quote + attribution card, built on `Card` and `Avatar`.

## Avatar fallback

`Avatar` requires an explicit `fallback` (initials); `TestimonialCard`
derives it from `authorName` (first + last word's initials, or a single
initial for a one-word name) rather than making every caller do that
derivation themselves.

## Usage

```tsx
<TestimonialCard
  quote="BuildPath turned a vague idea into a roadmap we actually trusted."
  authorName="Priya Shah"
  authorRole="CTO, Nova Commerce"
/>
```

## Content

Storybook stories use clearly fictional example quotes and names — the
same "fictional but realistic" precedent CLAUDE.md Part 21 sets for
case study companies. Real testimonials are the consuming page's
responsibility, not this component's.
