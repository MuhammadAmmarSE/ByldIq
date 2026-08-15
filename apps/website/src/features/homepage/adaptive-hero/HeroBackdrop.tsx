"use client";

import { motion } from "motion/react";

import { BlueprintGrid } from "@/components/BlueprintGrid";
import { LightSweep } from "@/components/LightSweep";
import { ParticleField } from "@/components/ParticleField";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { cn } from "@/utils/cn";

import type { HeroBackdropProps } from "./HeroBackdrop.types";

/**
 * The Adaptive Hero's layered background — Milestone 9's "Hero Animation"
 * requirements composed from real design-system primitives rather than a
 * one-off implementation: a near-invisible `--gradient-surface` wash
 * (Milestone 8 Phase A), a blueprint grid, two ambient glow layers moving
 * at different `useMouseParallax` strengths for genuine depth (unlike the
 * Arrival Experience's single-layer light), a `ParticleField`, and a
 * `LightSweep`. Every layer stays under ~6% opacity so it reads as
 * texture behind the hero content, not as competing motion.
 */
export function HeroBackdrop({ className }: HeroBackdropProps) {
  const backLayer = useMouseParallax({ strength: 12 });
  const frontLayer = useMouseParallax({ strength: 28 });

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-[image:var(--gradient-surface)] opacity-60" />
      <BlueprintGrid className="opacity-[0.04]" />

      <motion.div
        style={{ x: backLayer.x, y: backLayer.y }}
        className="bg-accent absolute top-1/4 left-1/4 h-[36vh] w-[36vh] rounded-full opacity-[0.06] blur-3xl"
      />
      <motion.div
        style={{ x: frontLayer.x, y: frontLayer.y }}
        className="bg-accent absolute right-1/4 bottom-1/4 h-[28vh] w-[28vh] rounded-full opacity-[0.05] blur-3xl"
      />

      <ParticleField count={14} />
      <LightSweep interval={8} />
    </div>
  );
}
