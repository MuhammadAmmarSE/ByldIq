"use client";

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/utils/cn";

import type { LabelProps } from "./Label.types";

/**
 * Pairs with every form primitive (`Input`, `Textarea`, `Select`,
 * `Checkbox`, `Radio`, `Switch`). Built on Radix `Label` so clicking the
 * text focuses/activates the associated control, including custom
 * (non-native) controls like `Checkbox` and `Switch`.
 */
export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-foreground text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
