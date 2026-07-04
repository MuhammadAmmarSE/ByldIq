# JourneySelector

CLAUDE.md Part 10's Journey Selection Engine — five cards (Startup,
Enterprise, Commerce, AI, Platform), one choice, which personalizes the
rest of the homepage via `useJourneyContent` (see
`features/homepage/shared`).

## Behavior

- Selecting a card persists the journey to the store (and, via Phase 0's
  `app-store.ts`, to `localStorage`) — it survives reloads until changed.
- A "Change journey" control appears once a journey is chosen, resetting
  back to `null` (the generic/default homepage state).
- Skipping the selector entirely is a valid, supported path — every
  journey-adaptive module falls back to its `default` content.

## Accessibility

Built on Radix's `RadioGroup` primitive (not the design system's circular
`RadioGroupItem` — same ARIA pattern, styled as a card):

- Native `radiogroup`/`radio` roles and `aria-checked` state, so screen
  readers announce selection changes automatically.
- Arrow-key roving focus between cards; Tab enters/exits the group as a
  single stop, matching native `<input type="radio">` behavior.
- Each card is a real button-sized touch target (`min-h-52`), never a bare
  icon.

## Analytics

`journey_hovered`, `journey_selected` (includes `previousJourney` so
"changed" vs. "first pick" is derivable), `journey_reset` — see
`analytics.ts`.
