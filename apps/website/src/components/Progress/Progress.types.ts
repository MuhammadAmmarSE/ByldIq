import type { ComponentPropsWithoutRef } from "react";
import type * as ProgressPrimitive from "@radix-ui/react-progress";

export interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** Accessible label announced alongside the percentage (e.g. "Generating roadmap"). */
  label?: string;
}
