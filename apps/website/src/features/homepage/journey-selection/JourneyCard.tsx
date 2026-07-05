"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { JourneyCardProps } from "./JourneyCard.types";

/**
 * A single journey choice, per CLAUDE.md Part 10's card layout: icon, title,
 * one sentence, example goals, hover lift, and a selection state. Built on
 * Radix's `RadioGroup.Item` directly (rather than the design system's
 * circular `RadioGroupItem`) — same "single choice from a set" ARIA pattern
 * and keyboard behavior, styled as a card instead of a literal radio input.
 */
export function JourneyCard({
  journey,
  isSelected,
  isAnySelected,
  onHover,
  className,
}: JourneyCardProps) {
  return (
    <RadioGroupPrimitive.Item
      value={journey.id}
      onPointerEnter={() => onHover?.(journey.id)}
      className={cn(
        "border-border bg-surface relative flex min-h-52 flex-col items-start gap-4 rounded-lg border p-6 text-left shadow-sm transition",
        "hover:border-accent/50 hover:-translate-y-1 hover:shadow-md",
        "focus-visible:ring-focus-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        isSelected && "border-accent z-10 -translate-y-1 shadow-lg",
        // De-emphasize non-selected cards by receding them spatially rather
        // than dimming opacity/color — opacity on already-muted text drops
        // below the WCAG AA contrast threshold (caught by the Storybook a11y
        // gate), and this reads just as clearly as "not the chosen one."
        isAnySelected && !isSelected && "scale-[0.97] shadow-none",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full transition-colors",
          isSelected ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent",
        )}
      >
        <Icon icon={journey.icon} size="lg" />
      </span>

      <div className="space-y-1.5">
        <Heading variant="h5" as="h2">
          {journey.title}
        </Heading>
        <Text variant="caption">{journey.description}</Text>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {journey.examples.map((example) => (
          <Badge key={example} variant="neutral">
            {example}
          </Badge>
        ))}
      </div>
    </RadioGroupPrimitive.Item>
  );
}
