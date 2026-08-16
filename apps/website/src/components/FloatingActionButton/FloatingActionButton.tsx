"use client";

import { motion } from "motion/react";

import { Icon } from "@/components/Icon";
import { scaleIn } from "@/lib/motion-variants";
import { cn } from "@/utils/cn";

import type { FloatingActionButtonProps } from "./FloatingActionButton.types";

/**
 * Generic floating action trigger — structural home for a future global
 * entry point (e.g. the Byld AI Companion, per CLAUDE.md's Master Section
 * on Byld: "Desktop: Bottom-right floating assistant"), not that
 * assistant itself. Motion stays restrained (subtle hover/tap scale) per
 * Byld's own guidance: "Never exaggerated."
 *
 * `bottom-24` on mobile clears `MobileNav`'s full-width fixed dock — the
 * same 80px (`pb-20`) of clearance `PageShell`'s `main` already reserves
 * for it — instead of `bottom-6`, which sat the button directly on top of
 * the dock's own Menu button below the `lg` breakpoint.
 */
export function FloatingActionButton({
  icon,
  label,
  position = "bottom-right",
  className,
  ...props
}: FloatingActionButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-accent text-accent-foreground z-fixed fixed flex size-14 items-center justify-center rounded-full shadow-lg",
        "bottom-24 lg:bottom-6",
        position === "bottom-right" ? "right-6" : "left-6",
        className,
      )}
      {...props}
    >
      <Icon icon={icon} size="lg" />
    </motion.button>
  );
}
