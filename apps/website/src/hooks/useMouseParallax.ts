"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "motion/react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface UseMouseParallaxOptions {
  /** Max pixel offset at the viewport's edge. Different layers pass different strengths to create depth. */
  strength?: number;
}

/**
 * Cursor-following parallax offset as spring-smoothed Motion values
 * (CLAUDE.md Part 6's "Mouse Parallax (subtle)"). Desktop only — touch
 * devices have no persistent pointer position — and inert under
 * `prefers-reduced-motion`, mirroring the exact scoping the Arrival
 * Experience's `BlueprintBackdrop` already established for its single
 * ambient light layer. This hook generalizes that one-off implementation
 * so multiple layers can each call it with a different `strength` to
 * build genuine multi-depth parallax, driven through `motion.div`'s
 * `style={{ x, y }}` rather than direct DOM mutation.
 */
export function useMouseParallax({ strength = 20 }: UseMouseParallaxOptions = {}) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function handlePointerMove(event: PointerEvent) {
      const { innerWidth, innerHeight } = window;
      x.set((event.clientX / innerWidth - 0.5) * 2 * strength);
      y.set((event.clientY / innerHeight - 0.5) * 2 * strength);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion, strength, x, y]);

  return { x: springX, y: springY };
}
