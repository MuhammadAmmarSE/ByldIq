# KnowledgeNewsletterSignup

CLAUDE.md Part 18/22's Knowledge Center newsletter (Milestone 15): "Position it
around: Engineering insights, Product thinking, Architecture, AI,
Technology decisions... Avoid making the Knowledge Center feel like a
lead-generation funnel."

## Distinct from the homepage's newsletter

`features/homepage/conversion-experience/NewsletterSignup` is generic,
site-wide copy. This component is scoped specifically to the Knowledge
Center's own content — its own copy, its own `knowledge_newsletter_signup`
analytics event — placed at the bottom of `/knowledge` via
`KnowledgeExplorer`.

## Honest scope

A stub signup with no real email backend, the same honest scope the
homepage version documents — submitting transitions to a genuine success
state (it's not a dead button), but doesn't send the address anywhere
yet.
