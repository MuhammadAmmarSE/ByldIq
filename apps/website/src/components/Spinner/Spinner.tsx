import { cn } from "@/utils/cn";

import { SPINNER_SIZES, type SpinnerProps } from "./Spinner.types";

const SIZE_PX: Record<(typeof SPINNER_SIZES)[number], number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * Indeterminate loading indicator. Unlike `Skeleton` (decorative, disabled
 * under reduced motion), the spin here keeps running regardless of motion
 * preference — it's the only signal that a busy state is in progress, it's
 * small and contained (no vestibular risk), and there's no static
 * equivalent that communicates the same thing.
 */
export function Spinner({ size = "md", className, label = "Loading" }: SpinnerProps) {
  const px = SIZE_PX[size];
  return (
    <span role="status" className={cn("inline-flex", className)}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="animate-spin"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
        <path
          d="M22 12a10 10 0 0 0-10-10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
