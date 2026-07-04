# ProductThinkingTimeline

CLAUDE.md Part 12's ten-stage product thinking experience — Idea through
Growth. Built on the design system's `Tabs` (Radix) rather than a bespoke
stepper: the horizontally scrollable trigger strip is both the stage
selector and, on touch devices, the "swipeable" interaction the spec calls
for, with no additional carousel dependency.

## Content

Stage headline/description text is verbatim from CLAUDE.md Part 12
(`data/stages.ts`). The side-panel fields (overview, common mistake,
approach, deliverables, technologies) are original supplementary copy
written to the same voice, since the spec only gives the top-level
narrative per stage.

## Accessibility

Radix `Tabs` provides `tablist`/`tab`/`tabpanel` roles, `aria-selected`
state, and arrow-key roving focus for free. The "common mistake" callout
uses `Alert`'s `info` variant (not `warning`) deliberately — it's
educational copy, not an urgent warning about the visitor's own action, and
`warning`'s `role="alert"` would assertively interrupt screen readers on
every stage switch.
