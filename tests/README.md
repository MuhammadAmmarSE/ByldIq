# tests/

Repository-wide testing that spans multiple apps/packages: performance,
accessibility, security, visual-regression, load, integration (per
CLAUDE.md Part 25).

Empty for now. `apps/website/e2e/` holds that app's own Playwright
suite — it stays colocated with the app until a test genuinely needs
to exercise more than one app or package.
