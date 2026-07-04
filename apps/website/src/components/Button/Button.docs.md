# Button

The primary interactive trigger. Every clickable action that isn't a plain
text link should be a `Button`.

## Usage

```tsx
<Button>Book Discovery</Button>
<Button variant="secondary" size="lg">Explore Our Process</Button>
<Button iconRight={ArrowRight}>Explore Solutions</Button>
<Button loading>Generating Roadmap</Button>

{/* Link styled as a button */}
<Button asChild>
  <Link href="/solutions">Explore Solutions</Link>
</Button>
```

## Props

| Prop        | Type                                                                          | Default     | Notes                                                                         |
| ----------- | ----------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------- |
| `variant`   | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"` | `"primary"` | `destructive` is for irreversible actions only.                               |
| `size`      | `"sm" \| "md" \| "lg" \| "icon"`                                              | `"md"`      | `icon` requires an `aria-label` — there's no visible text.                    |
| `loading`   | `boolean`                                                                     | `false`     | Swaps the leading icon for a spinner, disables the button.                    |
| `iconLeft`  | `LucideIcon`                                                                  | —           | Ignored when `asChild` is set.                                                |
| `iconRight` | `LucideIcon`                                                                  | —           | Ignored when `asChild` is set.                                                |
| `asChild`   | `boolean`                                                                     | `false`     | Renders the single child directly (via Radix `Slot`) instead of a `<button>`. |

## Accessibility

- Native `<button>` by default — full keyboard support (`Tab`, `Enter`,
  `Space`) for free.
- `loading` sets `disabled` and `aria-busy="true"`; the spinner carries a
  visually-hidden "Loading" label.
- Icon-only buttons (`size="icon"`) must always receive an explicit
  `aria-label` — the button has no other accessible name.

## Do / Don't

- Do describe the outcome in the label ("Explore Startup Projects"), not
  the mechanism ("Click Here") — per CLAUDE.md Part 7.
- Do use `asChild` for navigation so the page transitions via `next/link`
  instead of a full reload.
- Don't nest a `Button` inside another interactive element (e.g. inside an
  `<a>`) — use `asChild` on the outer element instead.
