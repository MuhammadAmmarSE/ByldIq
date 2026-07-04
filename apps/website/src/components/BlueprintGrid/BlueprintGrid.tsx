import { cn } from "@/utils/cn";

import type { BlueprintGridProps } from "./BlueprintGrid.types";

/**
 * Decorative background/empty-state illustration — fine grid lines, per
 * CLAUDE.md Part 5's illustration philosophy ("Blueprint, Wireframe,
 * Minimal geometric... never childish cartoons") and Part 9's "very subtle
 * blueprint grid" background layer. Explains nothing on its own; it's
 * texture, not content — always decorative (`aria-hidden`).
 */
export function BlueprintGrid({ id = "blueprint-grid", className, ...props }: BlueprintGridProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("text-border pointer-events-none absolute inset-0 h-full w-full", className)}
      {...props}
    >
      <defs>
        <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.4" />
    </svg>
  );
}
