# ArchitectureDiagram

CLAUDE.md Milestone 14 §12: a generated architecture diagram, built on
the same selectable-pipeline pattern as Case Studies'
`CaseStudyArchitecture` (a chip row in flow order, click to inspect one
node). Every node explains What / Why / Alternative / Trade-off / Cost /
Scaling — "no black-box AI decisions."

Nodes come from `mockAIProvider.generateArchitecture(answers)`,
recomputed on every render via `useMemo` keyed on the assembled answers
object (`useBuildPathAnswers`) — never cached or persisted. Toggling an
integration in `IntegrationsSelector` changes `answers.integrations`,
which changes the node list immediately.
