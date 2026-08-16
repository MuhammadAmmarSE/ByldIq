# EcosystemSection

CLAUDE.md Milestone 13 §20's Case Study Integration: "We believe
engineering decisions should create measurable outcomes. Then show
selected case studies." Reuses the real `ProjectGrid`/`ProjectCard` from
the homepage's Proof Engine and real `CASE_STUDIES` data — the philosophy
stated throughout the rest of this page is only credible next to actual
proof, not a second illustration of it.

## Why not also embed Knowledge/BuildPath previews here

CLAUDE.md §§19/21 ask for Knowledge and BuildPath integration too, but
both are folded into `AboutFinalCta` instead of duplicated here as a
second "go explore" moment — `AboutFinalCta`'s decision-oriented cards
already route to `/knowledge` and `/buildpath`. Embedding the homepage's
full `KnowledgeCenterPreview` (its own featured-guide-plus-grid layout)
here as well would make an already long page heavier without adding a
genuinely new idea.

## Analytics

`about_case_study_clicked` fires with `{ slug }` when a case study card
is selected. `about_cta_selected` fires with `{ cta: "explore-work" }` on
the "Explore all our work" link.
