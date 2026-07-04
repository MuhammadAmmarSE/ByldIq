"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/utils/cn";

import type { DividerProps } from "./Divider.types";

export function Divider({
  orientation = "horizontal",
  decorative = true,
  className,
}: DividerProps) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      decorative={decorative}
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
