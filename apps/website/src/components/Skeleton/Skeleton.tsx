import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

export type SkeletonProps = ComponentPropsWithoutRef<"div">;

/**
 * Loading placeholder. Animates opacity only (Tailwind's `animate-pulse`),
 * never width/height/layout — per the animation rules in
 * docs/architecture.md — and disables itself under prefers-reduced-motion
 * via `motion-reduce:animate-none`. Purely decorative, so it's hidden from
 * assistive tech; the real loading state should be announced separately
 * (e.g. an `aria-busy` region or a visually-hidden status message).
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        "bg-surface-raised animate-pulse rounded-md motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
