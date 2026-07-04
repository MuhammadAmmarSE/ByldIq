import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Marks the field as invalid: sets `aria-invalid` and switches to the
   * danger border/focus ring. Pair with a visible error message connected
   * via `aria-describedby`.
   */
  invalid?: boolean;
}
