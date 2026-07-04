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
