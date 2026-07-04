import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * `ComponentPropsWithoutRef<"div">` minus the handful of DOM event handlers
 * whose signatures collide with Framer Motion's own props of the same name
 * (drag/animation/transition events) — Framer Motion overrides those.
 */
type SafeDivProps = Omit<
  ComponentPropsWithoutRef<"div">,
  | "children"
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

export interface RevealProps extends SafeDivProps {
  children: ReactNode;
  as?: ElementType;
  /** Delay in seconds before the reveal starts (e.g. for staggering a hand-written sequence). */
  delay?: number;
}
