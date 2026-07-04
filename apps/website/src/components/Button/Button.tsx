import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { Icon } from "@/components/Icon";
import { Spinner } from "@/components/Spinner";
import { cn } from "@/utils/cn";

import type { ButtonProps } from "./Button.types";

const buttonStyles = cva(
  "focus-visible:outline-none inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:opacity-90",
        secondary: "bg-surface-raised text-foreground border-border border hover:bg-border/60",
        outline: "border-border text-foreground border bg-transparent hover:bg-surface-raised",
        ghost: "text-foreground bg-transparent hover:bg-surface-raised",
        destructive: "bg-danger text-danger-foreground hover:opacity-90",
        link: "text-accent h-auto p-0 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

/**
 * `asChild` renders `Slot` with `children` passed through untouched (Radix
 * `Slot` requires exactly one child), so `loading`/`iconLeft`/`iconRight`
 * only apply to the default `<button>` path.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    asChild = false,
    loading = false,
    iconLeft,
    iconRight,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  if (asChild) {
    return (
      <Slot ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      className={cn(buttonStyles({ variant, size }), className)}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" className="text-current" />
      ) : (
        iconLeft && <Icon icon={iconLeft} size="sm" />
      )}
      {children}
      {!loading && iconRight && <Icon icon={iconRight} size="sm" />}
    </button>
  );
});
