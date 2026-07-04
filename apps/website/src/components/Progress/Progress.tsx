"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/utils/cn";

import type { ProgressProps } from "./Progress.types";

export function Progress({ value, max = 100, label, className, ...props }: ProgressProps) {
  const percent = ((value ?? 0) / max) * 100;

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      aria-label={label}
      className={cn(
        "bg-surface-raised relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="bg-accent h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
