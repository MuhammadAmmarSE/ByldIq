# KnowledgeWhyItMatters

CLAUDE.md Part 18's Why It Matters section: the problem, why it matters,
the business and engineering context, and real-world relevance — grouped
into one component since none carry their own interactivity — each keeps
a stable `id` (`#problem`, `#why-it-matters`,
`#business-and-engineering-context`, `#real-world-relevance`) for the
sticky sidebar/scrollspy a later phase adds.

## Order

Problem, then why it matters, then business/engineering context, then
real-world relevance — the same "problem before approach" ordering as
`TechnologyBusinessValue`.

## Heading hierarchy

Each section title renders as `<h2>` (`Heading variant="h3" as="h2"`) —
`KnowledgeArticleHero`'s title owns the page's `<h1>`.
