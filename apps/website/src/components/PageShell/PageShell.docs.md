# PageShell

The global layout — composes `Navbar`, page content, `Footer`, and
`MobileNav` — wired into `app/layout.tsx` so every page gets it
automatically. Owns the mobile drawer's open state (shared between
`Navbar`'s hamburger trigger and `MobileNav`'s own dock trigger) since
neither component should know about the other directly.

## Usage

Already wired into `app/layout.tsx`:

```tsx
<AppProviders>
  <PageShell>{children}</PageShell>
</AppProviders>
```

Pages don't render `PageShell` themselves — it wraps every route
automatically via the root layout.

## Props

| Prop       | Type        | Notes                   |
| ---------- | ----------- | ----------------------- |
| `children` | `ReactNode` | The page's own content. |

## Notes

`primaryNav` (from `config/site.ts`) is empty until a later milestone
defines real information architecture — `Navbar`, `Footer`, and
`MobileNav` all render gracefully with no items in the meantime. Must
render inside `AppProviders` (for `CommandPaletteProvider`, which
`Navbar`/`MobileNav`'s search triggers depend on).
