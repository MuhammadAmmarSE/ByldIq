import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * `ButtonHTMLAttributes<"button">` minus the handful of DOM event handlers
 * whose signatures collide with Framer Motion's own props of the same name
 * (drag/animation/transition events) — Framer Motion overrides those. See
 * `Reveal.types.ts` for the same pattern.
 */
type SafeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "aria-label"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onTransitionEnd"
>;

export interface FloatingActionButtonProps extends SafeButtonProps {
  icon: LucideIcon;
  /** Required — the button is icon-only, so this is its only accessible name. */
  label: string;
  position?: "bottom-right" | "bottom-left";
}
