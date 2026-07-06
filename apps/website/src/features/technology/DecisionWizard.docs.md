# DecisionWizard

CLAUDE.md Part 22's Decision Framework (`/technology/decision-framework`):
two questions narrow to real candidates, then surface each one's own
authored content for the concern the visitor cares about.

## Why not a scoring algorithm

The spec's example questions (team size, budget, timeline, traffic,
compliance, SEO, offline, AI) suggest a matching engine, but the
underlying data (`bestFor`, `avoidWhen`, `teamSize`) is honest prose, not
structured tags — see `technology.schema.ts`. A naive keyword match
against that prose is actively unsafe: for example Kubernetes's
`teamSize` text says it's best suited to teams with "dedicated platform
capacity, not solo developers or very small teams," but it still contains
the word "small." A substring match for "small team" would incorrectly
recommend Kubernetes, contradicting the very sentence it matched against.

Instead, this component narrows only by the one genuinely structural
field (`category`), then shows the resulting technologies' own real
narrative field (performance/security/accessibility/scalability/cost)
for the chosen concern. No score, no invented confidence — just the
already-authored answer, one click closer.

## Questions

1. **What are you building?** — `POPULATED_CATEGORIES` (only categories
   with real technologies, same source as `TechnologyExplorer`'s filter).
2. **What matters most right now?** — Performance, Security,
   Accessibility, Scalability, or Cost & budget — each maps directly to
   one of `Technology`'s narrative fields.

## Analytics

`decision_wizard_answered` fires with `{ question, answer }` for each
question; `decision_wizard_completed` fires with `{ recommendedSlugs }`
once both questions are answered — see `analytics.ts`.
