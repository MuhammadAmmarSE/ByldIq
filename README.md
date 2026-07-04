# Byld IQ

Engineering foundation for the Byld IQ platform — a pnpm monorepo, per
`CLAUDE.md` Part 25 (the authoritative company/product/engineering
knowledge base; **read that file before making any product or
architecture decision in this repo**).

This is **Milestone 1**: architecture, design tokens, theming, providers,
and tooling only. No marketing pages or feature UI exist yet;
`apps/website/src/app/page.tsx` is a throwaway placeholder that proves the
foundation boots, and is replaced in Milestone 4.

## Repository layout

```
apps/            # deployable applications
  website/       # the Next.js 15 marketing site (the only app so far)
packages/        # reusable code shared across 2+ apps (empty — nothing to share yet)
services/        # business-capability services: ai, cms, search, ... (empty)
infrastructure/  # deployment/cloud config: docker, terraform, vercel, ... (empty)
docs/            # repo-wide living documentation
tools/           # developer tooling, generators, CLIs (empty)
scripts/         # repository automation (empty)
tests/           # cross-app testing: perf, security, visual regression (empty)
.github/         # CI workflows
```

`packages/`, `services/`, `infrastructure/`, `tools/`, `scripts/`, and
`tests/` are intentionally empty scaffolding right now — each has a
`README.md` explaining what belongs there. Per CLAUDE.md Part 27
("promote only after multiple real use cases"), code stays inside
`apps/website` until a second app or package genuinely needs to share it.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm storybook  # http://localhost:6006
```

Copy `apps/website/.env.example` to `apps/website/.env.local` if you need
analytics vendor keys — everything works with no env vars set.

## Scripts (run from the repo root)

| Script                   | Purpose                                               |
| ------------------------ | ----------------------------------------------------- |
| `pnpm dev`               | Next.js dev server (`apps/website`)                   |
| `pnpm build`             | Production build                                      |
| `pnpm typecheck`         | `tsc --noEmit` in every workspace package that has it |
| `pnpm lint`              | ESLint across the whole repo (config is root-level)   |
| `pnpm format` / `:check` | Prettier write / check, whole repo                    |
| `pnpm test`              | Vitest — unit tests + Storybook a11y checks           |
| `pnpm test:watch`        | Vitest in watch mode                                  |
| `pnpm test:e2e`          | Playwright e2e (builds + starts the app)              |
| `pnpm storybook`         | Storybook dev server                                  |
| `pnpm build-storybook`   | Static Storybook build                                |

See `apps/website/README.md` for app-specific detail and
`docs/architecture.md` for the full layering contract.

## Why ESLint lives at the repo root

ESLint's flat config doesn't search parent directories, so `eslint.config.mjs`
lives at the repo root rather than inside `apps/website` — that also matches
CLAUDE.md Part 25 ("Configuration Files: Centralized ... Avoid duplicate
configuration"). It targets `apps/website` via
`settings.next.rootDir`. `tsconfig.json`, `next.config.ts`, `vitest.config.ts`,
etc. all stay inside `apps/website` since those tools resolve config relative
to the app's own directory, not the workspace root.

## CI/CD

`.github/workflows/ci.yml` runs typecheck, lint, format check, tests
(Vitest + Storybook a11y), build, Storybook build, Playwright e2e, and
Lighthouse CI on every PR to `main`/`develop` and every push to
`feature/**`.

**Manual follow-ups for a repo admin** (can't be done from code):

- Create a `develop` branch and set `main`/`develop` branch protection
  (require PR review, require the CI checks above to pass, no direct pushes).
- Provision analytics vendor keys (PostHog/GA4/Clarity) in
  `apps/website/.env.local` / deployment env when those integrations are
  actually needed.

## Testing

- **Vitest** (`apps/website/vitest.config.ts`) runs two projects: `unit`
  (jsdom, plain function/hook/store tests) and `storybook` (real Chromium
  via Playwright, runs every story through the accessibility addon and
  fails on violations).
- **Playwright** (`apps/website/e2e/`) drives the built app in a real
  browser, including an automated `@axe-core/playwright` scan.

## Notes on scope

This milestone intentionally does not include: navigation, buttons, forms,
the AI companion, BuildPath, or any homepage content — those are later
milestones. React Three Fiber and Rive are not installed yet; they're added
when the sections that need them (Milestone 4) are built.
