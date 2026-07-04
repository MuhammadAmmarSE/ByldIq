"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/utils/cn";

import type { RadioGroupItemProps, RadioGroupProps } from "./Radio.types";

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive.Root className={cn("flex flex-col gap-2", className)} {...props} />;
}

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "border-border bg-surface data-[state=checked]:border-accent flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="bg-accent size-2.5 rounded-full" />
    </RadioGroupPrimitive.Item>
  );
}
