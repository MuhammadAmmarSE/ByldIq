# KnowledgeTutorials

CLAUDE.md Part 18/19's Tutorials entry point (`/knowledge/tutorials`).

## A distinct content model, not a filtered article view

Unlike Playbooks (an article with an optional `playbook` field), a
`Tutorial` is a genuinely different shape — no executive summary, core
concepts, or common mistakes; instead prerequisites, setup, steps, and
validation (`data/tutorial.schema.ts`). It lives in its own
`data/tutorials.ts`, and this component renders its own small card
rather than reusing `ArticleCard`, which would otherwise need fields a
tutorial doesn't have.

## Honest scope

One real tutorial ships today. The spec names no required tutorial
count (unlike Playbooks' "2-3" or Learning Paths' "2"), so one complete,
accurate tutorial is the honest starting point — CLAUDE.md's content
strategy never pads a collection to look busier than it is.

## Analytics

Selecting a tutorial card fires `knowledge_card_clicked`, the same event
every other Knowledge Center grid fires. `KnowledgeTutorialDetail` fires
its own `knowledge_tutorial_started` once a visitor reaches the detail
view.
