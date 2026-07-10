import { X } from "lucide-react";
import { cva } from "class-variance-authority";

import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

import type { ChipProps } from "./Chip.types";

const chipStyles = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        neutral: "bg-surface-raised text-foreground hover:bg-border/60",
        accent: "bg-accent text-accent-foreground hover:opacity-90",
        outline: "border-border text-foreground hover:bg-surface-raised border bg-transparent",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

/**
 * An interactive pill — unlike `Badge` (a static status/category label,
 * never interactive on its own), `Chip` always does something: toggling a
 * filter (`selected`) or removing an applied value (`onDismiss`). CLAUDE.md
 * Part 5's "if two components perform the same action, they should behave
 * identically" is why this exists as its own primitive rather than a
 * `Badge` variant — Badge's contract is explicitly non-interactive.
 */
export function Chip({
  variant = "neutral",
  selected,
  onDismiss,
  dismissLabel,
  className,
  children,
  ...props
}: ChipProps) {
  if (onDismiss) {
    return (
      <span className={cn(chipStyles({ variant }), "pr-1.5", className)}>
        {children}
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="hover:bg-foreground/10 -mr-1 rounded-full p-0.5 transition-colors"
        >
          <Icon icon={X} size="xs" />
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        chipStyles({ variant: selected ? "accent" : variant }),
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
