# Byld IQ

Engineering foundation for the Byld IQ platform. This repo is being built in
milestones (see `Engineering Execution Guide`) — **this is Milestone 1**:
architecture, design tokens, theming, providers, and tooling only. No
marketing pages or feature UI exist yet; `src/app/page.tsx` is a throwaway
placeholder that proves the foundation boots, and is replaced in Milestone 4.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Zustand · TanStack Query · Zod · next-themes · Storybook 10 · Vitest ·
Playwright.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm storybook  # http://localhost:6006
```

Copy `.env.example` to `.env.local` if you need analytics vendor keys —
everything works with no env vars set.

## Scripts

| Script                   | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| `pnpm dev`               | Next.js dev server                          |
| `pnpm build`             | Production build                            |
| `pnpm typecheck`         | `tsc --noEmit`                              |
| `pnpm lint`              | ESLint                                      |
| `pnpm format` / `:check` | Prettier write / check                      |
| `pnpm test`              | Vitest — unit tests + Storybook a11y checks |
| `pnpm test:watch`        | Vitest in watch mode                        |
| `pnpm test:e2e`          | Playwright e2e (builds + starts the app)    |
| `pnpm storybook`         | Storybook dev server                        |
| `pnpm build-storybook`   | Static Storybook build                      |

## Architecture

See `docs/architecture.md` for the full layering contract. Short version:

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

## CI/CD

`.github/workflows/ci.yml` runs typecheck, lint, format check, tests
(Vitest + Storybook a11y), build, Storybook build, Playwright e2e, and
Lighthouse CI on every PR to `main`/`develop` and every push to
`feature/**`.

**Manual follow-ups for a repo admin** (can't be done from code):

- Create a `develop` branch and set `main`/`develop` branch protection
  (require PR review, require the CI checks above to pass, no direct pushes).
- Provision analytics vendor keys (PostHog/GA4/Clarity) in `.env.local` /
  deployment env when those integrations are actually needed.

## Testing

- **Vitest** runs two projects: `unit` (jsdom, plain function/hook/store
  tests) and `storybook` (real Chromium via Playwright, runs every story
  through the accessibility addon and fails on violations).
- **Playwright** (`e2e/`) drives the built app in a real browser, including
  an automated `@axe-core/playwright` scan.

## Notes on scope

This milestone intentionally does not include: navigation, buttons, forms,
the AI companion, BuildPath, or any homepage content — those are later
milestones. React Three Fiber and Rive are not installed yet; they're added
when the sections that need them (Milestone 4) are built.
