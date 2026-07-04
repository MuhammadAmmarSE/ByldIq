# FloatingActionButton

A generic fixed-position circular trigger. Structural home for a future
global entry point (e.g. the Byld AI Companion, per CLAUDE.md's Byld
master section: "Desktop: Bottom-right floating assistant") — not that
assistant itself.

## Usage

```tsx
<FloatingActionButton icon={Sparkles} label="Ask Byld" onClick={openByld} />
```

## Props

Extends `ButtonHTMLAttributes<HTMLButtonElement>` (minus `aria-label`,
supplied via `label`), plus:

| Prop       | Type                              | Default          | Notes                                         |
| ---------- | --------------------------------- | ---------------- | --------------------------------------------- |
| `icon`     | `LucideIcon`                      | —                | Required.                                     |
| `label`    | `string`                          | —                | Required — the button's only accessible name. |
| `position` | `"bottom-right" \| "bottom-left"` | `"bottom-right"` |                                               |

## Motion

Subtle hover/tap scale only (`whileHover`/`whileTap`), per Byld's own
guidance in CLAUDE.md: "Never exaggerated."

## Accessibility

Icon-only, so `label` is required and becomes the button's `aria-label`.
