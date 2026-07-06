# KnowledgeSidebar

CLAUDE.md Part 18's sticky in-page navigation with scrollspy, desktop
only — mirrors `TechnologySidebar`. The section list is fixed (not derived
from `KnowledgeArticle` data) since every article shares the same
eleven-section template; only the content within each section varies.

## Related-content sections stay listed even when empty

`related-technologies`, `related-case-studies`, and `related-learning` are
always in the list even though the corresponding section sometimes renders
nothing for a given article (CLAUDE.md Part 8 accepts a slightly stale
sidebar link over deriving this list per-article just to hide it).
