# EffortStage

CLAUDE.md Milestone 14 §§20-23: ranged effort estimate, recommended
team, and risk assessment — grouped together since they're all part of
"what would this actually take?" `EffortEstimate` is typed as ranges
(`teamSizeRange`, `durationRange`) rather than numbers, so there's no
fabricated-precision value to accidentally render — "Do not present
fabricated precision."

Risk `impact` maps to badge severity (`Low` → outline, `Medium` →
warning, `High` → danger) so the visually loudest risks are the ones
that actually matter most.
