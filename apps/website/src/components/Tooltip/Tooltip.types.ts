import type { ReactElement, ReactNode } from "react";

export interface TooltipProps {
  content: ReactNode;
  /** A single focusable element (e.g. `Button`, or an element with `tabIndex`) — becomes the tooltip trigger via Radix `Slot`. */
  children: ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}
