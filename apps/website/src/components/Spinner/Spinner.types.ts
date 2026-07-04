export const SPINNER_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export type SpinnerSize = (typeof SPINNER_SIZES)[number];

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  /** Accessible name for the loading state. Defaults to "Loading". */
  label?: string;
}
