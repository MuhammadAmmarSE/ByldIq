# KnowledgeTutorialDetail

CLAUDE.md Part 18/19's Tutorials: "Prerequisites → Setup → Step 1 → Step
2 → Step 3 → Validation → Next Steps." Renders a `Tutorial`'s full
structure in that exact order; every code sample renders through the
shared `CodeBlock` (`@/components/CodeBlock`).

## Content accuracy

The one tutorial that exists today (`automated-accessibility-testing-with-axe`)
describes the exact `@axe-core/playwright` pattern this repository's own
e2e suite already uses — every command and code sample is real and
accurate, not illustrative pseudocode.

## AI Companion integration

Sets `pageContext` on mount with grounded Q&A built from the tutorial's
own real content (`buildTutorialGroundedReplies`) — prerequisites,
setup, each step, validation, and next steps are all genuinely
answerable, not fabricated for the AI.

## BuildPath integration

Links to `/buildpath?tutorial={slug}` — a distinct query param from
articles' `?article=` and playbooks (which reuse `?article=`, since a
playbook is still a `KnowledgeArticle`), since a `Tutorial` is a
separate data shape `BuildPath`'s entry-context resolution looks up
independently.

## Heading hierarchy

The title renders as `<h1>` (`Heading variant="display"`); every section
and step title renders as `<h2>` (`Heading variant="h4" as="h2"`).

## Analytics

`knowledge_tutorial_started` fires once per mount.
