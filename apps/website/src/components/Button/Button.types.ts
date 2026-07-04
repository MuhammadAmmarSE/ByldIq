import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = ["sm", "md", "lg", "icon"] as const;

export type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Render as the single child element instead of a `<button>` (via Radix
   * `Slot`) — e.g. `<Button asChild><Link href="/">Home</Link></Button>` so
   * a navigation link gets button styling without an invalid nested
   * interactive element. When set, `loading`/`iconLeft`/`iconRight` are
   * ignored: `Slot` requires exactly one child, so compose icons into the
   * child yourself.
   */
  asChild?: boolean;
  /** Shows a spinner and disables interaction, without changing button width. Ignored when `asChild` is set. */
  loading?: boolean;
  /** Ignored when `asChild` is set — see `asChild`. */
  iconLeft?: LucideIcon;
  /** Ignored when `asChild` is set — see `asChild`. */
  iconRight?: LucideIcon;
}
