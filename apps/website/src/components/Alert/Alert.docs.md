# Alert

An inline, persistent message — distinct from `Toast` (transient,
appears/disappears on its own).

## Usage

```tsx
<Alert variant="success" title="Roadmap ready">
  Let's review the next steps together.
</Alert>
<Alert variant="danger" title="Something went wrong">
  We couldn't generate your roadmap. Please try again.
</Alert>
```

## Props

| Prop       | Type                                           | Default  | Notes                                    |
| ---------- | ---------------------------------------------- | -------- | ---------------------------------------- |
| `variant`  | `"info" \| "success" \| "warning" \| "danger"` | `"info"` | Determines icon, color, and ARIA role.   |
| `title`    | `ReactNode`                                    | —        | Required — every alert needs a headline. |
| `children` | `ReactNode`                                    | —        | Optional supporting detail.              |

## Accessibility

`warning`/`danger` use `role="alert"` (announced immediately, interrupting
the screen reader); `info`/`success` use `role="status"` (announced
politely, next available pause). Icons are decorative — the variant is
also carried by the title and body text, never color alone.

## Do / Don't

- Do write titles and body copy per CLAUDE.md Part 7 (calm, specific,
  never blame the user — "We couldn't verify that email address," not
  "Invalid email").
- Don't use `Alert` for transient confirmations that should disappear on
  their own — use `Toast`.
