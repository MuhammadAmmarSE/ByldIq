import type { Transition, Variants } from "motion/react";

import { duration, ease } from "@/lib/motion";

/**
 * Reusable Framer Motion variants built from the duration/easing tokens in
 * motion.ts. Per the animation rules, every variant here only touches
 * opacity/transform — never layout-affecting properties.
 *
 * `motion.div variants={fade} initial="hidden" animate="visible"` — the
 * component doesn't need to know the timing values, just the variant name.
 */

const baseTransition: Transition = {
  duration: duration.base,
  ease: ease.standard,
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const revealTransition: Transition = {
  duration: duration.slow,
  ease: ease.decelerate,
};

/**
 * For scroll-triggered reveals: `motion.div variants={reveal} initial="hidden"
 * whileInView="visible" viewport={{ once: true, margin: "-80px" }}`. See the
 * `Reveal` component for the ready-to-use wrapper (it also handles delay).
 */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

/** Apply to a parent; children using `staggerItem` animate in sequence. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const staggerItem: Variants = fade;

/**
 * Transform-only stagger item — no `opacity` dimension at all, unlike
 * `staggerItem`. Use this instead of `staggerItem` when the animated
 * content contains marginal-contrast text tokens (e.g. `text-muted`,
 * `text-accent`) on a light/white surface: `ProjectGrid`'s docs record a
 * real, reproducible axe `color-contrast` failure caught mid-transition,
 * where partial opacity blended such text toward the background before
 * settling at its (passing) final value. Moving without ever touching
 * opacity sidesteps that failure mode entirely.
 */
export const staggerItemTransformOnly: Variants = {
  hidden: { y: 12 },
  visible: { y: 0, transition: baseTransition },
};

/** Page-level transition for route changes. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.decelerate } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: ease.accelerate } },
};

/** Overlay backdrop (modal/drawer scrims). */
export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast, ease: ease.standard } },
};

/** Modal/dialog panel entrance. */
export const modalPanel: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: baseTransition },
};

/** Side-sheet (Drawer) entrance, per side. */
export const drawerPanel = {
  right: {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: baseTransition },
  } satisfies Variants,
  left: {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0, transition: baseTransition },
  } satisfies Variants,
};

/**
 * Idle "breathing" loop for the AI companion orb (CLAUDE.md Part 16 Idle
 * state: "Slow breathing animation"). Infinite loops aren't covered by
 * `MotionProvider`'s `reducedMotion="user"` the way one-shot transforms are —
 * callers must also branch on `useReducedMotion()` and skip this variant
 * entirely for reduced-motion users.
 */
export const breathe: Variants = {
  idle: {
    scale: [1, 1.04, 1],
    transition: { duration: 3.2, repeat: Infinity, ease: ease.standard },
  },
};

/** Soft pulse for "active"/"thinking" indicators (AI companion, live status dots). Same reduced-motion caveat as `breathe`. */
export const pulse: Variants = {
  active: {
    opacity: [0.6, 1, 0.6],
    scale: [1, 1.08, 1],
    transition: { duration: 1.6, repeat: Infinity, ease: ease.standard },
  },
};

/** Ambient drift for decorative background particles/orbs (Part 9 background layers). Same reduced-motion caveat as `breathe`. */
export const float: Variants = {
  floating: {
    y: [0, -10, 0],
    transition: { duration: 6, repeat: Infinity, ease: ease.standard },
  },
};

/**
 * SVG path stroke draw-in for architecture/git-graph diagrams (Part 6:
 * "Blueprint drawing" is an explicitly allowed scroll-based motion). Pair
 * with `<motion.path variants={drawPath} initial="hidden" whileInView="visible">`
 * on a path that has a defined `pathLength`.
 */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: duration.slower * 2, ease: ease.decelerate },
  },
};
