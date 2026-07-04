import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Marks the field as invalid: sets `aria-invalid` and switches to the
   * danger border/focus ring. Pair with a visible error message connected
   * via `aria-describedby`.
   */
  invalid?: boolean;
}
