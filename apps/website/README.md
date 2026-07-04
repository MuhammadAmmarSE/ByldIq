# website

The Byld IQ marketing site. Next.js 15 (App Router) · React 19 ·
TypeScript (strict) · Tailwind CSS v4 · Zustand · TanStack Query · Zod ·
next-themes · `motion` (Framer Motion) · Storybook 10 · Vitest ·
Playwright.

Run everything from the repo root (`pnpm dev`, `pnpm test`, etc.) — see
the root `README.md`. The commands below are for running this app's
scripts directly from inside `apps/website/`.

```bash
pnpm dev               # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck
pnpm storybook         # http://localhost:6006
pnpm test              # vitest run (unit + storybook projects)
pnpm test:e2e          # playwright
```

Note: linting (`eslint .`) only works from the repo root — the config
lives there. See the root README's "Why ESLint lives at the repo root".

## Directory contract

```
src/
  app/         # routes, layouts — composition only, no business logic
  components/  # presentational UI (Milestone 2+)
  features/    # domain UI + logic, composed from components
  providers/   # app-wide React context providers
  store/       # Zustand store factories (per-request, not module singletons)
  services/    # data access / API calls — never called directly from UI
  hooks/       # shared React hooks
  lib/         # framework-adjacent utilities (env, fonts, motion tokens)
  utils/       # pure helper functions
  config/      # structural config (no marketing copy)
  types/       # shared TypeScript types
  styles/      # design tokens (tokens.css)
  content/     # MDX content collections (Milestone 5+)
```

Design tokens live in `src/styles/tokens.css` as CSS custom properties and
are mapped into Tailwind's `@theme` in `src/app/globals.css`. Components
must use the generated Tailwind utilities (`bg-surface`, `text-muted`, …) or
`var(--token)` directly — never a raw hex value or magic number.

See `/docs/architecture.md` at the repo root for the full layering
contract and `/CLAUDE.md` for the product/brand/engineering rules
everything here must follow.
