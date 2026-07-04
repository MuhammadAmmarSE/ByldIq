# ArrivalExperience

The homepage's entrance sequence (CLAUDE.md Part 9): a fixed, full-viewport
overlay that assembles an abstract geometric mark, reveals the "Byld IQ"
wordmark and tagline, then dissolves to reveal the real page underneath —
including the navbar, which is already mounted, so it "feels earned" rather
than appearing separately.

## Props

| Prop                  | Type      | Default | Description                                                                                               |
| --------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `initialHasSeenIntro` | `boolean` | `false` | Server-determined (via the `byld_intro_seen` cookie) — when `true`, the component renders nothing at all. |

## Do

- Render this once, at the top of the homepage's Server Component, passing
  `initialHasSeenIntro` from `cookies().get("byld_intro_seen")` so returning
  visitors get a true zero-render skip with no flash (see Phase 12's
  composition).
- Let the component manage its own timeline — it needs no external stage
  control.

## Don't

- Don't render it on any route other than the homepage.
- Don't try to replay it manually from other UI — there's no "watch the
  intro again" affordance in this milestone (see the docs' scope notes on
  the tagline-rotation rule).

## Accessibility

- `prefers-reduced-motion` skips straight to the finished state — no overlay
  is ever shown.
- The "Skip intro" button is real, keyboard-focusable (auto-focused on
  mount), and is the only focusable element while the overlay is visible;
  everything else in the overlay is `aria-hidden`, per Part 9's "Screen
  Readers: Ignore decorative animations."
- No sound, ever, per Part 9.

## Analytics

Fires `intro_started`, `intro_completed`, `intro_skipped`, and
`intro_time_to_interaction` (see `analytics.ts`). "Scroll After Intro" from
the CLAUDE.md tracking list is covered by the homepage-wide
`scroll_depth_reached` event (Phase 0) rather than a separate event here.

## Known scope note

CLAUDE.md's Tagline subsection says alternate tagline lines "rotate slowly
on later visits," which reads in tension with the Time Budget section's
"Returning visitors: 0 seconds." Since the intro only ever plays once per
browser (persisted via `hasSeenIntro` + the cookie) and this milestone has
no "replay intro" affordance, the rotation rule has no trigger yet — the
canonical tagline always plays on the one time the intro runs.
