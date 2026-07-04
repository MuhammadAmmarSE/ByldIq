"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import type { TooltipProps } from "./Tooltip.types";

/**
 * Wraps its own `TooltipPrimitive.Provider` per instance rather than
 * requiring a single app-wide provider — simpler composition, at the cost
 * of each tooltip having its own hover-intent delay group instead of a
 * shared one. Revisit if cursor-move-between-tooltips timing becomes a
 * real product requirement.
 */
export function Tooltip({ content, children, side = "top", delayDuration = 200 }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className="bg-foreground text-background z-tooltip rounded-md px-2.5 py-1.5 text-xs shadow-md"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-foreground" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
