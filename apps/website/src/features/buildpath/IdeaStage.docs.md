# IdeaStage

CLAUDE.md Milestone 14 §§4, 6's Welcome Experience — not a form. One open
textarea ("what are you building?", bound to `discovery.accomplish` so
Discovery's AI conversation doesn't ask the same question twice) and a
`ProjectType` multi-select, both fully optional and revisable later.

Selections write directly to `useBuildPathStore` (`toggleProjectType`,
`updateDiscovery`) — this component has no local state and no explicit
save action, consistent with every other BuildPath stage.
