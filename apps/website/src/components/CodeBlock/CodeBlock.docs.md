# CodeBlock

CLAUDE.md Part 18/19's code presentation requirements (Milestone 15):
syntax highlighting, copy button, line numbers, line highlighting,
filename, language label, expand/collapse. Used by Knowledge Center
tutorials and, where relevant, articles and playbooks.

## Highlighting is intentionally lightweight

`tokenize.ts` is a small, dependency-free regex tokenizer for four
languages (`bash`, `typescript`, `tsx`, `json`) — not a grammar-based
highlighter like Shiki or Prism. CLAUDE.md explicitly asks code blocks to
"avoid unnecessarily shipping large client-side bundles"; pulling in a
full highlighter's language grammars would cost far more than this
site's small set of tutorial code samples needs. It's good enough to
read at a glance, not a claim of professional-grade accuracy for
arbitrary code.

## Props

- `code` / `language` — required.
- `filename` — shown in the header bar next to the language label.
- `highlightLines` — 1-indexed line numbers to visually emphasize.
- `collapseAfterLines` — defaults to 16; pass `Infinity` to disable
  collapsing entirely.

## Accessibility

Line numbers are `aria-hidden` (decorative, not part of the code's
meaning). Per-line wrappers are `<span>`, not `<div>`, so nesting inside
`<code>` stays valid phrasing content.

## Copy

Uses the real Clipboard API (`navigator.clipboard.writeText`). If
permission is denied or the API is unavailable, the button simply
doesn't confirm — there's nothing else safe to do, and it never throws
into the page.
