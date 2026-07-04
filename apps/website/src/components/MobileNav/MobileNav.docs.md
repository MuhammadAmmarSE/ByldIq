# MobileNav

The mobile navigation shell, per CLAUDE.md Part 8: a persistent bottom
dock (Home, Search, Menu) plus a full-screen drawer for the rest of the
IA and the theme toggle. Only visible below the `lg` breakpoint —
`Navbar`'s desktop nav takes over above it.

## Usage

```tsx
const [mobileNavOpen, setMobileNavOpen] = useState(false);

<Navbar onMobileMenuToggle={() => setMobileNavOpen(true)} />
<MobileNav items={primaryNav} open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
```

Must render inside a `CommandPaletteProvider` — the dock's Search button
calls `useCommandPalette().open()`.

## Props

| Prop           | Type                      | Default | Notes                                                        |
| -------------- | ------------------------- | ------- | ------------------------------------------------------------ |
| `items`        | `NavItem[]`               | `[]`    | Rendered flat in the drawer, with children indented beneath. |
| `open`         | `boolean`                 | —       | Required — controlled, shared with `Navbar`'s trigger.       |
| `onOpenChange` | `(open: boolean) => void` | —       | Required.                                                    |

## Accessibility

The dock's Menu button carries `aria-haspopup="dialog"` and
`aria-expanded`, reflecting the drawer's state. The drawer itself is
`Drawer` (Radix `Dialog`) — full focus trap, `Escape` to close, focus
returned to the Menu button on close.
