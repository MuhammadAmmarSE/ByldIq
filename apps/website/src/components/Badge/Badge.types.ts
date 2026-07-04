import type { ComponentPropsWithoutRef } from "react";

export const BADGE_VARIANTS = [
  "neutral",
  "accent",
  "success",
  "warning",
  "danger",
  "outline",
] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
}
