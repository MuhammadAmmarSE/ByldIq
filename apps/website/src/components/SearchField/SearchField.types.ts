import type { InputHTMLAttributes } from "react";

export interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "aria-label"
> {
  /** Required — a search field conveys its purpose visually (icon + placeholder), so it needs an explicit accessible name. */
  "aria-label": string;
  /** Renders a clear ("x") button when the field has a value; called on click. */
  onClear?: () => void;
}
