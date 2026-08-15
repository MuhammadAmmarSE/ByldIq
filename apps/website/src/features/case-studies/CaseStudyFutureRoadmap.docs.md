# CaseStudyFutureRoadmap

Milestone 12's Future Roadmap section (CLAUDE.md Part 12): what's planned
next for this project, with each item explicitly tagged as either the
client's own plan or a Byld IQ recommendation — never presented as one
undifferentiated wishlist, since the spec explicitly requires visitors
be able to tell the two apart.

## Data

`caseStudy.futureRoadmap` — a required array of `{ item, source }`
pairs, `source` being `"client"` or `"byld-recommendation"`. Populated
for all five case studies in `data/case-studies.ts`, split realistically
per project rather than defaulting every item to one source.

## Placement

Between Lessons Learned and Related Solutions in the page template,
matching CLAUDE.md Part 12's section order.
