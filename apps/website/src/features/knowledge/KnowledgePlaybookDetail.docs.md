# KnowledgePlaybookDetail

CLAUDE.md Part 18/19's Playbooks: "Steps, Explanations, Checklists,
Resources, Export." Renders a playbook-typed article's `playbook` field
as a dedicated, actionable checklist — distinct from the full
eleven-section educational template the same article renders at
`/knowledge/[slug]`. Both views share one real content source; nothing
is duplicated.

## Checklist persistence

Checked items persist via the app store's `checkedPlaybookItemIds`
(localStorage-backed, degrading to session memory when storage is
blocked — the same pattern as bookmarks and learning-path completion).
Each item's id is `${playbookSlug}:${stepId}:${itemIndex}`, so checking
an item in one playbook can never collide with another.

## Export

"Print or save as PDF" calls the browser's own print dialog rather than
a bespoke PDF pipeline — the same honest choice BuildPath's
`/buildpath/print` makes. `print:hidden` classes hide chrome (breadcrumb,
CTAs, bookmark button, resources) that doesn't belong on a printed page.

## AI Companion integration

Sets the AI Companion's `pageContext` on mount, with grounded Q&A built
from the same article's real content (`buildKnowledgeArticleGroundedReplies`)
— a visitor asking Byld a question from the checklist view gets the same
honest, grounded answers as one reading the full article.

## Heading hierarchy

The article title renders as `<h1>` (`Heading variant="display"`, whose
default tag is `h1`); every step title renders as `<h2>`
(`Heading variant="h4" as="h2"`).

## Analytics

`knowledge_playbook_started` fires once per mount.
`knowledge_playbook_item_toggled` fires on every checkbox toggle, with
whether it was checked or unchecked.
