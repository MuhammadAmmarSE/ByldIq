# KnowledgePlaybooks

CLAUDE.md Part 18/19's Playbooks entry point (`/knowledge/playbooks`).

## Playbooks are articles, with a dedicated checklist view

A playbook is an article whose `type` is `"playbook"` in
`data/articles.ts`, plus an optional `playbook` field (steps, checklist
items, resources) that only playbook-typed articles carry. This
component filters the same `KNOWLEDGE_ARTICLES` dataset
`KnowledgeExplorer`/`KnowledgeGrid` already use — no parallel playbook
data file — but its cards link to `/knowledge/playbooks/[slug]`
(`KnowledgePlaybookDetail`, a checklist UI) instead of the full
eleven-section article template at `/knowledge/[slug]`. Both routes
render the same real content; neither duplicates it.

## Honest scope

Three articles (`accessibility-checklist-for-product-teams`,
`architecture-review-playbook`, `production-readiness-playbook`) are
tagged `"playbook"` today. The page states the real count instead of
padding the collection with fabricated entries — CLAUDE.md's content
strategy never inflates volume to look more complete than it is.

## Analytics

Selecting a playbook card fires `knowledge_card_clicked`, the same event
the `/knowledge` landing page's grid fires. `KnowledgePlaybookDetail`
fires its own `knowledge_playbook_started` and
`knowledge_playbook_item_toggled` once a visitor is on the dedicated
checklist view.
