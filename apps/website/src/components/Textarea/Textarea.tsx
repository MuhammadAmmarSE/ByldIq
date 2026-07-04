import { forwardRef } from "react";

import { cn } from "@/utils/cn";

import type { TextareaProps } from "./Textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid = false, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "border-border bg-surface text-foreground placeholder:text-muted flex min-h-24 w-full rounded-md border px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        invalid && "border-danger focus-visible:outline-danger",
        className,
      )}
      {...props}
    />
  );
});
