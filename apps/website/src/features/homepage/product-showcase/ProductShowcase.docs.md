# ProductShowcase

CLAUDE.md Part 14's Interactive Product Showcase: seven "Experience Pods"
switched via the design system's `Tabs`. Every pod is a small, genuinely
interactive mini-product over local mock state (typed data, `useState`,
real event handlers) — CLAUDE.md's "never fake functionality" — not a
static screenshot:

| Pod                   | Company          | Interaction                                                |
| --------------------- | ---------------- | ---------------------------------------------------------- |
| AI Workspace          | Northwind AI     | Send a message, get a canned assistant reply               |
| Commerce Dashboard    | Nova Commerce    | Sort by amount, filter by order status                     |
| Enterprise Operations | Atlas Logistics  | Approve/reject requests, updating state live               |
| Automation Builder    | —                | Toggle steps on/off, run a simulated workflow              |
| Developer Platform    | Harborline Cloud | Select an API endpoint, view its mock JSON response        |
| Mobile Product        | —                | Tap between bottom-nav tabs in a phone-frame mockup        |
| Healthcare Platform   | Acme Health      | Filter appointments by status (clearly fictional patients) |

## Data

Pods reuse company names from the shared fictional-companies roster
(`@/features/homepage/shared`) established in Phase 5, so e.g. "Nova
Commerce" is consistent between its Proof Engine case study and its
showcase pod. Patient data in the Healthcare pod is explicitly labeled
"(fictional)" per CLAUDE.md Part 14's specific caveat for that pod.

## Scope note

Each pod is intentionally scoped as a focused, single-interaction demo
rather than a full standalone product — they're feature-owned building
blocks used only within this showcase, so (unlike the design system
primitives in `src/components/`) individual pods don't ship their own
Storybook stories; this top-level story and each pod's unit test cover
them.
