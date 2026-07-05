# CapabilityExplorer

CLAUDE.md Part 20's Capability Explorer: one expandable accordion item per
capability, each revealing why, when, benefits, risks, timeline, and
related technologies.

## Scope note

The spec also lists "related case studies" per capability. Not
implemented at that granularity — there are only five (fictional) case
studies total, and inventing a specific case-study pairing for each of a
solution's four capabilities would fabricate relevance that isn't real.
The solution-wide Related Case Studies section (a later phase) covers
this honestly instead, at the solution level rather than per-capability.

## Accessibility

Built on the design system's `Accordion` (Radix Accordion) — `tablist`/
`tab`/`tabpanel`-equivalent roles, `aria-expanded` state, and keyboard
support all come from the primitive.

## Analytics

`solution_capability_expanded` fires with the capability's `id` — see
`analytics.ts`.
