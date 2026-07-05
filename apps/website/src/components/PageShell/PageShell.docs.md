# PageShell

The global layout — composes `Navbar`, page content, `Footer`, and
`MobileNav` — wired into `app/layout.tsx` so every page gets it
automatically. Owns the mobile drawer's open state (shared between
`Navbar`'s hamburger trigger and `MobileNav`'s own dock trigger) since
neither component should know about the other directly.

## Usage

Already wired into `app/layout.tsx`, which assembles the real nav (a
Solutions dropdown built from `SOLUTIONS` data, plus `config/site.ts`'s
static entries) and passes it down:

```tsx
<AppProviders>
  <PageShell navItems={navItems}>{children}</PageShell>
</AppProviders>
```

Pages don't render `PageShell` themselves — it wraps every route
automatically via the root layout.

## Props

| Prop       | Type                   | Notes                                               |
| ---------- | ---------------------- | --------------------------------------------------- |
| `children` | `ReactNode`            | The page's own content.                             |
| `navItems` | `NavItem[]` (optional) | Rendered by `Navbar` and `MobileNav`. Default `[]`. |

## Notes

`navItems` isn't read from `config/site.ts` directly inside this
component — `config/site.ts` only holds nav entries with no dropdown
(routes with no feature data behind them), since it's config that
Shared-layer components like this one can depend on. Anything needing
feature data (the Solutions dropdown) is composed in `app/layout.tsx`
instead, per CLAUDE.md Part 27's dependency direction (Shared must not
depend on Features). Must render inside `AppProviders` (for
`CommandPaletteProvider`, which `Navbar`/`MobileNav`'s search triggers
depend on).
