"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

import { BlueprintGrid } from "@/components/BlueprintGrid";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { float } from "@/lib/motion-variants";
import { cn } from "@/utils/cn";

export interface BlueprintBackdropProps {
  className?: string;
}

const PARTICLES = [
  { top: "18%", left: "22%", size: 3, delay: 0 },
  { top: "64%", left: "78%", size: 4, delay: 0.6 },
  { top: "38%", left: "58%", size: 2, delay: 1.1 },
  { top: "80%", left: "30%", size: 3, delay: 1.6 },
];

/**
 * The Arrival Experience's layered background (CLAUDE.md Part 9): theme
 * color (inherited from the page), a very subtle blueprint grid, a soft
 * light that drifts toward the cursor on desktop, fine grain texture, and a
 * handful of barely-visible floating particles — every layer under ~5%
 * opacity so it reads as texture, not content. All decorative; `aria-hidden`
 * throughout.
 */
export function BlueprintBackdrop({ className }: BlueprintBackdropProps) {
  const reducedMotion = useReducedMotion();
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    // Desktop-only ambient light follow — touch devices have no persistent
    // pointer position, and Part 9 explicitly scopes this to desktop.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function handlePointerMove(event: PointerEvent) {
      const node = lightRef.current;
      if (!node) return;
      const { innerWidth, innerHeight } = window;
      const offsetX = (event.clientX / innerWidth - 0.5) * 2 * 20;
      const offsetY = (event.clientY / innerHeight - 0.5) * 2 * 20;
      node.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <BlueprintGrid className="opacity-[0.04]" />

      <div
        ref={lightRef}
        className="bg-accent absolute top-1/3 left-1/2 h-[40vh] w-[40vh] -translate-x-1/2 rounded-full opacity-[0.05] blur-3xl transition-transform duration-700 ease-out"
      />

      {!reducedMotion &&
        PARTICLES.map((particle, index) => (
          <motion.span
            key={index}
            className="bg-foreground absolute rounded-full opacity-[0.04]"
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
            }}
            variants={float}
            animate="floating"
            custom={particle.delay}
          />
        ))}

      <svg className="absolute inset-0 h-full w-full opacity-[0.025]">
        <filter id="arrival-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#arrival-grain)" />
      </svg>
    </div>
  );
}
