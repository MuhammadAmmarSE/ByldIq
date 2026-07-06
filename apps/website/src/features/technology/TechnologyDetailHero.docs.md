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

- **Primary** ("Plan Your Roadmap"): links to `/buildpath?technology={slug}`,
  which acknowledges the referring technology honestly (see
  `app/buildpath/page.tsx`) — the same pattern `SolutionHero` and
  `CaseStudyHero` use.
- **Secondary ("Talk to Byld")**: opens the same global AI Companion used
  everywhere else on the site.

## AI Companion context

Sets `pageContext` to `{ label: technology.name, slug: technology.slug }`
on mount (cleared on unmount) so opening Byld from this page greets with
the technology by name instead of the generic journey greeting — without
overwriting the visitor's own journey choice.

## Analytics

Fires `technology_viewed` once on mount, `technology_cta_selected` for
each CTA (tagged `cta: "hero-primary"` or `cta: "ai"`), and
`technology_buildpath_started` when the primary CTA is used — see
`analytics.ts`.
