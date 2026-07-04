"use client";

import { motion, type Variants } from "motion/react";

import { duration, ease } from "@/lib/motion";

export interface LogoAssemblyProps {
  /** Whether the pieces should be in their assembled (visible) position. */
  assembled: boolean;
  className?: string;
}

const pieceTransition = { duration: duration.slow, ease: ease.decelerate };

const diagonal: Variants = {
  hidden: { opacity: 0, x: -16, y: -16 },
  visible: { opacity: 1, x: 0, y: 0, transition: pieceTransition },
};

const vertical: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { ...pieceTransition, delay: 0.12 } },
};

const horizontal: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { ...pieceTransition, delay: 0.24 } },
};

const innerCut: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { ...pieceTransition, delay: 0.36 } },
};

/**
 * The arrival sequence's "logo assembles from geometric pieces" moment
 * (CLAUDE.md Part 9, Stage 2: "Diagonal piece -> Vertical -> Horizontal ->
 * Inner cut -> Final lock... Motion should communicate precision, not
 * magic."). There's no shipped brand mark in this repo yet, so this is a
 * deliberately simple abstract geometric assembly (three angled strokes plus
 * a cut corner) rather than a literal logo — it only needs to read as
 * "engineered," per Part 2's "The logo represents construction... an
 * engineering symbol."
 */
export function LogoAssembly({ assembled, className }: LogoAssemblyProps) {
  const state = assembled ? "visible" : "hidden";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width={64}
      height={64}
      role="img"
      aria-label="Byld IQ"
    >
      <motion.rect
        x="8"
        y="8"
        width="20"
        height="8"
        rx="1"
        className="fill-accent"
        transform="skewX(-12)"
        variants={diagonal}
        initial="hidden"
        animate={state}
      />
      <motion.rect
        x="8"
        y="20"
        width="8"
        height="36"
        rx="1"
        className="fill-accent"
        variants={vertical}
        initial="hidden"
        animate={state}
      />
      <motion.rect
        x="20"
        y="48"
        width="36"
        height="8"
        rx="1"
        className="fill-accent"
        variants={horizontal}
        initial="hidden"
        animate={state}
      />
      <motion.rect
        x="44"
        y="20"
        width="12"
        height="12"
        rx="1"
        className="fill-foreground"
        variants={innerCut}
        initial="hidden"
        animate={state}
      />
    </svg>
  );
}
