# TechnologyDetailHero

Every technology page's hero (CLAUDE.md Part 22): a breadcrumb back to
`/technology`, the technology's name, tagline, category/maturity/
learning-curve at a glance, who benefits from it, and two CTAs.

## Props

| Prop            | Type         | Description                                               |
| --------------- | ------------ | --------------------------------------------------------- |
| `technology`    | `Technology` | The full technology record.                               |
| `categoryLabel` | `string?`    | Resolved from `TECHNOLOGY_CATEGORIES` by the parent page. |

## CTAs

- **Primary** ("Plan Your Roadmap"): links to `/buildpath`. A later phase
  prefills BuildPath from the technology, mirroring `SolutionHero`.
- **Secondary ("Talk to Byld")**: opens the same global AI Companion used
  everywhere else on the site.

## Analytics

Fires `technology_viewed` once on mount, and `technology_cta_selected`
for each CTA (tagged `cta: "hero-primary"` or `cta: "ai"`) — see
`analytics.ts`.
