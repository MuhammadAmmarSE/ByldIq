import { motion } from "motion/react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ease } from "@/lib/motion";
import { cn } from "@/utils/cn";

import type { LightSweepProps } from "./LightSweep.types";

/**
 * A faint diagonal beam of light that periodically sweeps across its
 * container (CLAUDE.md Part 9's "Light sweeps") — a premium, restrained
 * accent rather than a decorative loop, since it pauses (`repeatDelay`)
 * between passes instead of sweeping continuously.
 */
export function LightSweep({ interval = 6, className }: LightSweepProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="via-foreground/[0.06] absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent to-transparent"
        initial={{ x: "-120%" }}
        animate={{ x: "220%" }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: interval, ease: ease.standard }}
      />
    </div>
  );
}
