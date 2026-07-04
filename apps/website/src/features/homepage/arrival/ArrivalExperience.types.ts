export interface ArrivalExperienceProps {
  /**
   * Whether the visitor has already seen the intro, as determined
   * server-side from the `byld_intro_seen` cookie (see Phase 12's homepage
   * composition). Defaults to `false` so the component is self-contained
   * for isolated use (tests, Storybook) — real usage always passes this
   * explicitly to get a true zero-flash skip for returning visitors.
   */
  initialHasSeenIntro?: boolean;
}
