import { forwardRef } from "react";

import { cn } from "@/utils/cn";

import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid = false, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "border-border bg-surface text-foreground placeholder:text-muted flex h-10 w-full rounded-md border px-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        invalid && "border-danger focus-visible:outline-danger",
        className,
      )}
      {...props}
    />
  );
});
