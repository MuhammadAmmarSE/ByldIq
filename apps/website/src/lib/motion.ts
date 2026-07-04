/**
 * JS-side mirror of the `--duration-*` / `--ease-*` tokens in
 * src/styles/tokens.css, for animation libraries (Framer Motion, GSAP,
 * Motion One) that need numeric/easing values rather than CSS custom
 * properties. Keep these in sync with tokens.css by hand — there is no
 * build step that generates one from the other.
 *
 * Animation rule (see docs/architecture.md): only animate opacity,
 * transform, and filter. Never width, height, margin, padding, or
 * top/left — those force layout and break the 60fps budget.
 */
export const duration = {
  fast: 0.12,
  base: 0.2,
  slow: 0.32,
  slower: 0.48,
} as const;

export const ease = {
  standard: [0.4, 0, 0.2, 1],
  decelerate: [0, 0, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
  emphasized: [0.2, 0, 0, 1],
} as const;
