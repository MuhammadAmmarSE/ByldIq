import type { ButtonHTMLAttributes } from "react";

export const CHIP_VARIANTS = ["neutral", "accent", "outline"] as const;

export type ChipVariant = (typeof CHIP_VARIANTS)[number];

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  /**
   * Selectable mode: whether this chip is currently active. Renders
   * `aria-pressed` and toggled styling. Omit entirely for a chip that's
   * only ever removable (see `onDismiss`), not selectable.
   */
  selected?: boolean;
  /**
   * Removable mode: renders a trailing dismiss control. Mutually exclusive
   * with `selected` in practice — a chip is either something you toggle
   * (a filter) or something you remove (an applied value), not both.
   */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button, e.g. `Remove {label}`. Required when `onDismiss` is set. */
  dismissLabel?: string;
}
