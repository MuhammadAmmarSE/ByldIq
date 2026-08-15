import { motion } from "motion/react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ease } from "@/lib/motion";
import { cn } from "@/utils/cn";

import type { ParticleFieldProps } from "./ParticleField.types";

const GOLDEN_ANGLE_RADIANS = 137.5 * (Math.PI / 180);

/**
 * Deterministic positions via a golden-angle spiral — not `Math.random()`,
 * which would render differently on the server than the client and fail
 * hydration. The same seeding approach the Arrival Experience's
 * `BlueprintBackdrop` used for its 4 hardcoded particles, generalized to
 * any count.
 */
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = index * GOLDEN_ANGLE_RADIANS;
    const radius = Math.sqrt((index + 0.5) / count);
    return {
      top: `${50 + radius * 45 * Math.sin(angle)}%`,
      left: `${50 + radius * 45 * Math.cos(angle)}%`,
      size: 2 + (index % 3),
      delay: (index % 5) * 0.3,
    };
  });
}

/**
 * A field of faint floating dots (CLAUDE.md Part 6/9's "Particle system" /
 * "tiny particle movement") — texture, not content, always `aria-hidden`
 * and under 5% opacity. Generalizes the fixed 4-particle array
 * `BlueprintBackdrop` hardcoded into a reusable, configurable primitive.
 */
export function ParticleField({ count = 12, className }: ParticleFieldProps) {
  const reducedMotion = useReducedMotion();
  const particles = generateParticles(count);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="bg-foreground absolute rounded-full opacity-[0.04]"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: ease.standard, delay: particle.delay }}
        />
      ))}
    </div>
  );
}
