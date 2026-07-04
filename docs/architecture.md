# Architecture

This document is the layering contract for the codebase. It exists so
"no business logic inside components" and "no API calls inside UI" (from
the Engineering Execution Guide) are enforceable rules, not just intentions.

## Directory contract

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
               store, analytics). One composition root: AppProviders.tsx.

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
               token mirrors, the analytics client.

  utils/       Pure helper functions with no framework dependency (cn,
               formatters, etc.).

  config/      Structural configuration — nav shape, feature flags, site
               metadata. No marketing copy or content decisions live here.

  types/       Shared TypeScript types used across layers.

  styles/      Design tokens (tokens.css) and anything that documents them
               (Tokens.stories.tsx).

  content/     MDX content collections (articles, guides, case studies).
               Empty until Milestone 5 defines the actual content types.
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
`globals.css`, and every semantic color token has a `.dark` override.

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
without repeating transition props everywhere. GSAP is still the tool for
complex scroll-driven sequences (Milestone 4+); it isn't provider-scoped and
should read the same `--duration-*`/`--ease-*` tokens directly.

## Component folder rules (Milestone 2+)

Once real components exist, each one gets its own folder:

```
Hero/
  Hero.tsx
  Hero.types.ts
  Hero.motion.ts
  Hero.test.tsx
  Hero.stories.tsx
  index.ts
```

Every component needs: TypeScript types, accessibility (keyboard, ARIA,
focus-visible), dark mode support, defined enter/hover/focus/exit/loading/
error states, a Storybook story, and a test. This isn't enforced by tooling
yet — it's the bar for review.
