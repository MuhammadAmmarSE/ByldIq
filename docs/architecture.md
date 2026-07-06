# Architecture

This document is the layering contract for `apps/website`. It exists so
"no business logic inside components" and "no API calls inside UI" are
enforceable rules, not just intentions. `CLAUDE.md` at the repo root is
authoritative — this file is the practical, repo-specific application of
its Parts 24–27 (the Engineering Constitution) and takes a back seat to it
wherever they'd conflict.

## Repository structure (monorepo)

```
apps/            deployable applications (website, and future admin /
                 client-portal / buildpath apps)
packages/        code shared across 2+ apps — empty until there's a real
                 second consumer (CLAUDE.md Part 27: "promote only after
                 multiple real use cases")
services/        business-capability services (ai, cms, search, ...)
infrastructure/  deployment/cloud config
docs/            repo-wide living documentation (this file)
tools/, scripts/, tests/   dev tooling, automation, cross-app tests
```

See `CLAUDE.md` Part 25 for the full rationale and target package/service
list. `packages/`, `services/`, `infrastructure/`, `tools/`, `scripts/`,
and `tests/` each have their own `README.md` explaining what belongs
there — they're intentionally empty right now.

ESLint's config (`eslint.config.mjs`) lives at the repo root, not inside
`apps/website`, because flat config doesn't search parent directories;
every other app-specific tool config (`tsconfig.json`, `next.config.ts`,
`vitest.config.ts`, `playwright.config.ts`, `.storybook/`) stays inside
`apps/website` since those tools resolve paths relative to the app's own
directory.

## Directory contract (`apps/website/src/`)

```
src/
  app/         Routes, layouts, route handlers. Composition only: wire
               providers, fetch via services/hooks, render components.
               No fetch/axios calls, no business rules here.

  components/  Presentational UI. Props in, JSX out. No data fetching, no
               store access beyond what's passed in as props. Each
               component owns its own folder (see Component Folder Rules).

  features/    Domain UI + logic (e.g. a BuildPath question flow). Composes
               components + hooks + services into a working feature.
               Business logic that's specific to one feature lives here,
               not in components/.

  providers/   App-wide React context providers (theme, query client,
               store, analytics, motion). One composition root: AppProviders.tsx.

  store/       Zustand store factories. Always a factory function, never a
               module-level store instance — the App Router can render
               multiple requests concurrently on the server, and a shared
               instance would leak state between them.

  services/    Data access: API calls, external service clients. UI code
               never calls fetch/axios directly — it calls a service
               function, typically through a TanStack Query hook.

  hooks/       Shared React hooks with no UI of their own.

  lib/         Framework-adjacent utilities that are still infrastructure,
               not business logic: env validation, font loading, motion
               token mirrors, the analytics client, JSON-LD helpers.

  utils/       Pure helper functions with no framework dependency (cn,
               formatters, etc.).

  config/      Structural configuration — nav shape, feature flags, site
               metadata. No marketing copy or content decisions live here.

  types/       Shared TypeScript types used across layers.

  styles/      Design tokens (tokens.css) and anything that documents them
               (Tokens.stories.tsx).

  content/     MDX content collections (articles, guides, case studies).
               Empty until a future Knowledge Center milestone defines the
               actual content types — Milestone 3's homepage Knowledge
               Center preview uses local typed data instead (see
               `docs/homepage.md`).
```

## State management: which tool, when

- **Zustand** — client state that multiple, unrelated components need to
  read or write (e.g. the selected visitor journey). Always created via a
  factory + `StoreProvider`, never a module singleton.
- **React Context** — state that's local to a subtree and doesn't need
  Zustand's selector/subscription model (e.g. a single component's
  compound-component internal state).
- **TanStack Query** — anything that comes from a server: fetched data,
  cache invalidation, loading/error states for async calls. Don't hand-roll
  `useEffect` + `useState` data fetching.
- **Redux** — never. Not part of this stack.

## Design tokens

Every color, radius, shadow, font size, duration, and easing value is a CSS
custom property defined once in `src/styles/tokens.css`, then mapped into
Tailwind's `@theme` in `src/app/globals.css` so components can use ordinary
utility classes (`bg-surface`, `rounded-lg`, `shadow-md`) that resolve to
the token. Component code should never contain a raw hex value, a magic
pixel number for spacing/radius, or an inline `style` attribute for
anything a token already covers.

Dark mode is `next-themes` toggling a `.dark` class on `<html>`; Tailwind's
`dark:` variant is wired to that same class via `@custom-variant dark` in
`globals.css`, and every semantic color token has a `.dark` override. Per
CLAUDE.md Part 5, dark mode is independently designed, not an inverted
light mode.

## Motion

Only `opacity`, `transform`, and `filter` may be animated — anything that
forces layout (`width`, `height`, `margin`, `padding`, `top`, `left`) is off
limits, per the 60fps budget. Duration/easing values live in
`src/styles/tokens.css` (`--duration-*`, `--ease-*`) with a JS-side mirror
in `src/lib/motion.ts` for animation libraries that need numbers instead of
CSS custom properties. `src/hooks/useReducedMotion.ts` exists so any
animation beyond a simple transition can be skipped when the user has
`prefers-reduced-motion` set; the duration tokens themselves also collapse
to `0ms` under that media query as a baseline safety net.

`src/providers/MotionProvider.tsx` wraps the app in `motion`'s
`MotionConfig` (the `motion` package is the unified successor to Framer
Motion + Motion One) with `reducedMotion="user"` and the token-derived
duration/easing as defaults, so any `motion.*` component automatically
respects `prefers-reduced-motion` and matches the rest of the design system
without repeating transition props everywhere. Per CLAUDE.md Part 27,
animation logic stays isolated in motion-specific components rather than
scattered through business code. GSAP remains the tool for complex
scroll-driven sequences beyond what `motion`'s `whileInView` covers (none
of the homepage's Milestone 3 sections needed it — every scroll-triggered
reveal is a `Reveal`/stagger fade, per `docs/homepage.md`); it isn't
provider-scoped and should read the same `--duration-*`/`--ease-*` tokens
directly whenever it's introduced.

## Component folder rules

Per CLAUDE.md Part 27, every component gets its own folder:

```
TechnologyCard/
  TechnologyCard.tsx
  TechnologyCard.types.ts
  TechnologyCard.test.tsx
  TechnologyCard.stories.tsx
  TechnologyCard.docs.md
  index.ts
```

Rules, applied to every component in `src/components/` as of Milestone 2:

- Named exports only, no default exports.
- Variants via `cva` (`class-variance-authority`); classes merged through
  `cn()` (`src/utils/cn.ts`) — never raw string concatenation or template
  literals for conditional classes.
- Interactive components: full keyboard operability, a visible focus ring
  (token-driven, global via `:focus-visible` in `globals.css` — components
  should not need to add their own focus styling), dark mode (automatic,
  since components only ever reference semantic tokens), and
  loading/disabled/error states where the component has them.
- `ComponentName.test.tsx`: render + accessibility-relevant assertions +
  keyboard interaction (`@testing-library/user-event`) for anything
  interactive.
- `ComponentName.stories.tsx`: default story + every variant/state; dark
  mode is covered for free by the `addon-themes` toolbar. The Storybook
  a11y addon (`@storybook/addon-a11y`, backed by axe-core) fails the
  `vitest --project=storybook` run on any violation — this is the primary
  accessibility gate, not a manual checklist.
- `ComponentName.docs.md`: purpose, usage, props table, accessibility
  notes. Short — it documents decisions, not restates the prop types
  already visible in `ComponentName.types.ts`.
- Components built on a Radix primitive (`@radix-ui/react-*`) get
  `"use client"` — they use hooks/context internally. Components that
  merely accept and forward an `onClick`-style prop (e.g. `Button`) don't
  need it; only the module that actually calls a hook does.

## Component inventory (Milestone 2)

Everything below lives in `apps/website/src/components/`. "Built on"
marks primitives built on top of a lower-level dependency (Radix UI,
`cmdk`, `next-themes`) rather than hand-rolled from scratch.

### Foundation / layout

| Component       | Built on       | Notes                                                      |
| --------------- | -------------- | ---------------------------------------------------------- |
| `Icon`          | `lucide-react` | Consistent sizing/stroke; decorative or named via `label`. |
| `Heading`       | —              | Display/H1–H6 type scale.                                  |
| `Text`          | —              | Subtitle/Body/Caption/Code type scale.                     |
| `Container`     | —              | `narrow`/`content`/`wide` layout widths.                   |
| `Reveal`        | `motion`       | Scroll-triggered fade + slide-up entrance.                 |
| `BlueprintGrid` | —              | Decorative fine-grid-line illustration/background.         |

### Core display

| Component  | Built on               | Notes                                                       |
| ---------- | ---------------------- | ----------------------------------------------------------- |
| `Button`   | `@radix-ui/react-slot` | `asChild` for rendering as a link; loading/disabled.        |
| `Badge`    | —                      |                                                             |
| `Avatar`   | Radix Avatar           | Image with initials fallback.                               |
| `Card`     | —                      | Compound: `Card.Header` / `.Content` / `.Footer`.           |
| `Divider`  | Radix Separator        |                                                             |
| `Spinner`  | —                      | Indeterminate loading; keeps spinning under reduced motion. |
| `Alert`    | —                      | Inline persistent message (vs. `Toast`, transient).         |
| `Skeleton` | —                      | Milestone 1 — loading placeholder, opacity-only pulse.      |

### Form

| Component     | Built on         | Notes                                          |
| ------------- | ---------------- | ---------------------------------------------- |
| `Label`       | Radix Label      | Pairs with every form control below.           |
| `Input`       | —                |                                                |
| `Textarea`    | —                |                                                |
| `Select`      | Radix Select     | Options array in, value out.                   |
| `Checkbox`    | Radix Checkbox   |                                                |
| `Radio`       | Radix RadioGroup | Exports `RadioGroup` + `RadioGroupItem`.       |
| `Switch`      | Radix Switch     |                                                |
| `SearchField` | `Input` + `Icon` | Optional clear button (controlled usage only). |

### Overlay & feedback

| Component  | Built on       | Notes                                                            |
| ---------- | -------------- | ---------------------------------------------------------------- |
| `Tooltip`  | Radix Tooltip  |                                                                  |
| `Modal`    | Radix Dialog   | `forceMount` + `AnimatePresence` for exit animation.             |
| `Drawer`   | Radix Dialog   | Side-sheet variant of `Modal`.                                   |
| `Toast`    | Radix Toast    | `ToastProvider` (mounted in `AppProviders`) + `useToast()` hook. |
| `Progress` | Radix Progress |                                                                  |

### Disclosure & wayfinding

| Component    | Built on        | Notes                                                                                |
| ------------ | --------------- | ------------------------------------------------------------------------------------ |
| `Tabs`       | Radix Tabs      |                                                                                      |
| `Accordion`  | Radix Accordion | Height animation is the one exception to "never animate height" — see `globals.css`. |
| `Breadcrumb` | `next/link`     |                                                                                      |
| `Pagination` | `Button`        | First/last + sibling window, collapsing into ellipses.                               |
| `Timeline`   | —               | Vertical step sequence (complete/current/upcoming).                                  |

### Command

| Component                | Built on                      | Notes                                                                                         |
| ------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------- |
| `CommandPalette`         | `cmdk` + Radix Dialog         | `groups` empty by default — no content yet to search.                                         |
| `CommandPaletteProvider` | `next/dynamic` (`ssr: false`) | Global `Cmd`/`Ctrl`+`K` shortcut; lazy-loads `CommandPalette`; exposes `useCommandPalette()`. |

### Navigation shell (structural — no final IA/content)

| Component              | Built on                          | Notes                                                                     |
| ---------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| `Navbar`               | `motion` + `useScrollDirection`   | Transparent at top, glass background once scrolled, hides on scroll-down. |
| `MegaMenu`             | Radix Popover                     | Used by `Navbar` for any `NavItem` with `children`.                       |
| `MobileNav`            | `Drawer`                          | Bottom dock (Home/Search/Menu) + full drawer for the rest of the IA.      |
| `Footer`               | —                                 | Columns/social links empty by default.                                    |
| `FloatingActionButton` | `motion`                          | Generic fixed trigger — future home for the Byld AI Companion.            |
| `ThemeToggle`          | `next-themes`                     | Quick light/dark switch (not the full light/dark/system choice).          |
| `PageShell`            | `Navbar` + `Footer` + `MobileNav` | Wired into `app/layout.tsx`; owns the mobile drawer's shared open state.  |

`config/site.ts`'s `primaryNav` held real information architecture as of
Milestone 4 (`Knowledge`, `BuildPath`); the Solutions, Work (Milestone 5),
and Technology (Milestone 6) mega menus are composed separately in
`app/layout.tsx` since they need feature data that `config/site.ts` (read
by the Shared-layer `PageShell`) must not depend on — see
`docs/solutions.md`, `docs/case-studies.md`, and `docs/technology.md`.
Every component above still renders correctly with zero items, for any
future route that doesn't need the full nav.
`apps/website/src/app/page.tsx` is the real homepage (Milestone 3,
CLAUDE.md Part 9's eleven modules), rendered inside `PageShell`; see
`docs/homepage.md` for its architecture.
