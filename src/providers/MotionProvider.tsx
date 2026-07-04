"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { duration, ease } from "@/lib/motion";

/**
 * App-wide Motion (formerly Framer Motion) defaults. `reducedMotion="user"`
 * makes every animated component respect `prefers-reduced-motion`
 * automatically — no per-component opt-in needed — on top of the
 * `useReducedMotion` hook and CSS `--duration-*` tokens already covering
 * non-Motion transitions.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: duration.base, ease: ease.standard }}
    >
      {children}
    </MotionConfig>
  );
}
