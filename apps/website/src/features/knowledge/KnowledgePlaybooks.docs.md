# KnowledgePlaybooks

CLAUDE.md Part 18's Playbooks entry point (`/knowledge/playbooks`).

## Playbooks are articles, not a separate content model

A playbook is simply an article whose `type` is `"playbook"` in
`data/articles.ts` — this component filters the same
`KNOWLEDGE_ARTICLES` dataset `KnowledgeExplorer` and `KnowledgeGrid`
already use, rather than introducing a parallel playbook schema or data
file.

## Honest scope

Only one article (`accessibility-checklist-for-product-teams`) is
tagged `"playbook"` today. The page says so plainly instead of padding
the collection with fabricated entries — CLAUDE.md's content strategy
never inflates volume to look more complete than it is.

## Analytics

Selecting a playbook fires `knowledge_card_clicked`, the same event the
`/knowledge` landing page's grid fires — a playbook click is still an
article click.
