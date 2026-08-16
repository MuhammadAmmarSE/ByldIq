# SummaryStage

CLAUDE.md Milestone 14 §§27-28's Final Plan. Marks the session
completed (`markCompleted`) the first time it's viewed, then offers
three genuinely working export paths — each honestly scoped rather than
over-promised:

- **Export as PDF** — opens `/buildpath/print`, a dedicated
  print-optimized view that calls `window.print()`. No PDF-generation
  library; this is the browser's own "Save as PDF" in the print dialog.
- **Share** (`ShareButton`, reused from the Knowledge Center's reading
  experience) — the link's `[id]` segment _is_ the encoded summary
  (`share-encoding.ts`), since there's no backend to persist a payload
  against. Scoped by URL length, and deliberately carries only the
  Final Plan's summary, not the full session or conversation.
- **Copy summary** — a plain-text version of the same summary, via the
  clipboard.

"Saved automatically in your browser" is literal — `buildpath-store.ts`
persists to `localStorage` on every change, so Save & Resume needs no
separate action here.
