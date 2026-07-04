import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import type { BadgeProps } from "./Badge.types";

const badgeStyles = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-surface-raised text-foreground",
        accent: "bg-accent text-accent-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
        outline: "border-border text-foreground border bg-transparent",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return <span className={cn(badgeStyles({ variant }), className)} {...props} />;
}
