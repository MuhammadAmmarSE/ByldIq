export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  /** Set to `false` when the divider separates distinct sections that assistive tech should announce as a boundary, rather than a purely visual rule. */
  decorative?: boolean;
  className?: string;
}
