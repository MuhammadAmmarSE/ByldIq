"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/utils/cn";

import type { SwitchProps } from "./Switch.types";

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "bg-border data-[state=checked]:bg-accent inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="bg-surface pointer-events-none block size-5 rounded-full shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
    </SwitchPrimitive.Root>
  );
}
