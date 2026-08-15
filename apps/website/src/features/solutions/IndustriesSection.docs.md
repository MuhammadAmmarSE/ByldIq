# IndustriesSection

Milestone 10's Industries section on the Solutions landing page: a card
per industry, linking to `/solutions/industry/{slug}`.

## Honest content, not a fabricated portfolio

Each industry's `challenges` are Byld IQ's own expertise framing —
legitimate authored content, the same category as the Solutions
platform's own service descriptions. `recommendedSolutionSlugs` always
reference real `SOLUTIONS`; `exampleCaseStudySlugs` reference a real
case study only where one genuinely exists for that industry (six of
the ten industries have none yet) — see `data/industries.ts` and the
detail page (`app/solutions/industry/[industry]/page.tsx`) for how the
empty case is handled honestly rather than hidden or fabricated.

## Analytics

Clicking a card fires `industry_card_clicked` with `{ slug }` — see
`analytics.ts`.
