"use client";

import { motion, type Variants } from "motion/react";

import { revealTransition } from "@/lib/motion-variants";

import type { RevealProps } from "./Reveal.types";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...revealTransition, delay },
  }),
};

/**
 * Scroll-triggered fade + slide-up entrance — the most common motion
 * pattern for homepage/section content (see CLAUDE.md Part 6, "Entrance
 * Animations"). Animates once; respects `prefers-reduced-motion` via
 * `MotionProvider`'s `reducedMotion="user"`.
 */
export function Reveal({ children, as = "div", delay = 0, className, ...props }: RevealProps) {
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
