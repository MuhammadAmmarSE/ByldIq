import type { LucideIcon } from "lucide-react";

export const ICON_SIZES = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

export interface IconProps {
  /** A Lucide icon component, imported directly by the caller (e.g. `ArrowRight` from "lucide-react") so bundlers can tree-shake unused icons. */
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  /**
   * Only set this when the icon conveys meaning with no adjacent text
   * (e.g. an icon-only button). Adds `role="img"` + `aria-label`. Leave
   * unset for decorative icons next to a text label — they default to
   * `aria-hidden`.
   */
  label?: string;
}
