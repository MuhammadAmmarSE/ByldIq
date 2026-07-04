import { cn } from "@/utils/cn";

import { ICON_SIZES, type IconProps } from "./Icon.types";

/**
 * Consistent sizing/stroke and accessibility handling for Lucide icons.
 * Decorative by default (`aria-hidden`); pass `label` when the icon is the
 * only content conveying meaning (e.g. an icon-only button).
 */
export function Icon({ icon: IconComponent, size = "md", className, label }: IconProps) {
  return (
    <IconComponent
      size={ICON_SIZES[size]}
      strokeWidth={1.75}
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    />
  );
}
