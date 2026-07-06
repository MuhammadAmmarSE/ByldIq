"use client";

import { motion, type Variants } from "motion/react";

import { duration, ease } from "@/lib/motion";

export interface LogoAssemblyProps {
  /** Whether the pieces should be in their assembled (visible) position. */
  assembled: boolean;
  className?: string;
}

const pieceTransition = { duration: duration.slow, ease: ease.decelerate };

const spineVariants: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: { opacity: 1, y: 0, transition: pieceTransition },
};

const upperFoldVariants: Variants = {
  hidden: { opacity: 0, x: 18, y: -14 },
  visible: { opacity: 1, x: 0, y: 0, transition: { ...pieceTransition, delay: 0.12 } },
};

const lowerFoldVariants: Variants = {
  hidden: { opacity: 0, x: 18, y: 14 },
  visible: { opacity: 1, x: 0, y: 0, transition: { ...pieceTransition, delay: 0.24 } },
};

const shadowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { ...pieceTransition, delay: 0.36 } },
};

/**
 * PLACEHOLDER pending CLAUDE.md Part 28 (Brand Asset Governance): this
 * hand-authored path data is exactly what Part 28 prohibits — a
 * procedurally reconstructed approximation of the logo, not the official
 * master SVG. It exists because no official asset exists yet in
 * `apps/website/public/brand/` (see that folder's README). Replace this
 * component with one that imports and animates the real
 * `byldiq-icon-master-transparent.svg` as soon as it's added; do not
 * extend or "improve" this approximation in the meantime.
 *
 * Until replaced, this renders the arrival sequence's "logo assembles
 * from geometric pieces" moment (CLAUDE.md Part 9, Stage 2): a dark navy
 * spine plus a folded blue-gradient ribbon forming the two bumps of the
 * "B," with a dark triangular reveal where the fold tucks behind itself.
 * Assembly order follows how the mark actually reads — spine (foundation)
 * first, then the upper fold, then the lower fold, then the inner shadow
 * that only makes sense once both folds are in place.
 */
export function LogoAssembly({ assembled, className }: LogoAssemblyProps) {
  const state = assembled ? "visible" : "hidden";

  return (
    <svg
      viewBox="0 0 100 136"
      className={className}
      width={72}
      height={98}
      role="img"
      aria-label="Byld IQ"
    >
      <defs>
        <linearGradient id="logo-ribbon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1b2fb5" />
          <stop offset="50%" stopColor="#46c6ff" />
          <stop offset="100%" stopColor="#2f6de8" />
        </linearGradient>
      </defs>

      <motion.path
        d="M10 34 L32 28 L32 122 L10 126 Z"
        fill="#101a35"
        variants={spineVariants}
        initial="hidden"
        animate={state}
      />
      <motion.path
        d="M46 10 L94 44 L60 68 L32 38 Z"
        fill="url(#logo-ribbon-gradient)"
        variants={upperFoldVariants}
        initial="hidden"
        animate={state}
      />
      <motion.path
        d="M46 126 L94 92 L60 68 L32 98 Z"
        fill="url(#logo-ribbon-gradient)"
        variants={lowerFoldVariants}
        initial="hidden"
        animate={state}
      />
      <motion.path
        d="M60 68 L32 38 L32 98 Z"
        fill="#101a35"
        variants={shadowVariants}
        initial="hidden"
        animate={state}
      />
    </svg>
  );
}
