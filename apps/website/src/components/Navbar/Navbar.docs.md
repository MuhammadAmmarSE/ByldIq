# Navbar

The site's primary header — logo, nav items, search (opens
`CommandPalette`), theme toggle, and a mobile menu trigger. Structural
only: `items` is empty by default (see `config/site.ts`'s `primaryNav`)
until real IA is defined.

## Usage

```tsx
<Navbar items={primaryNav} onMobileMenuToggle={() => setMobileNavOpen(true)} />
```

Must render inside a `CommandPaletteProvider` (already true anywhere
`AppProviders` wraps the tree) — the search button calls
`useCommandPalette().open()`.

## Props

| Prop                 | Type         | Default | Notes                                                     |
| -------------------- | ------------ | ------- | --------------------------------------------------------- |
| `items`              | `NavItem[]`  | `[]`    | Items with a non-empty `children` render as a `MegaMenu`. |
| `onMobileMenuToggle` | `() => void` | —       | `PageShell` wires this to `MobileNav`'s open state.       |

## Motion

Scroll-aware per CLAUDE.md Part 6: transparent at the top; once scrolled,
a translucent/blurred background with a bottom border; hides on
scroll-down and reappears on scroll-up (`useScrollDirection`). Animates
only `transform` (`translateY`) and background color — never layout.

## Accessibility

`<header>` (implicit `role="banner"`) containing `<nav aria-label="Primary">`.
The mobile menu button is icon-only with an explicit `aria-label` — it's
a trigger only, `MobileNav` owns the actual drawer/dock.
