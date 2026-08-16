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

## Mobile positioning

`bottom-24` (96px) below the `lg` breakpoint, `bottom-6` (24px) at and
above it. Below `lg`, `MobileNav` renders a full-width fixed dock at the
very bottom of the viewport — `PageShell`'s `main` already reserves 80px
(`pb-20`) of clearance for it. A plain `bottom-6` sat this button directly
on top of the dock's own Menu button; `bottom-24` clears the dock with a
small margin instead.

## Accessibility

Icon-only, so `label` is required and becomes the button's `aria-label`.
