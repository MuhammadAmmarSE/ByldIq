"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

import { Icon } from "@/components/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fade } from "@/lib/motion-variants";
import { cn } from "@/utils/cn";

export interface ScrollIndicatorProps {
  className?: string;
}

const SCROLL_HIDE_THRESHOLD = 40;

/**
 * A quiet "there's more below" affordance shown once the Arrival Experience
 * finishes, per the homepage brief's "scroll indicator." Purely a visual
 * cue — disappears as soon as the visitor starts scrolling, so it never
 * competes with content once its job is done.
 */
export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY < SCROLL_HIDE_THRESHOLD);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none flex justify-center", className)}
      variants={fade}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={
          reducedMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
        }
        className="text-muted"
      >
        <Icon icon={ChevronDown} size="lg" />
      </motion.div>
    </motion.div>
  );
}
