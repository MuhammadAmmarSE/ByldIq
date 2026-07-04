import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import { defaultTagFor, type HeadingProps } from "./Heading.types";

const headingStyles = cva("font-sans text-foreground", {
  variants: {
    variant: {
      display: "text-6xl font-semibold tracking-tight",
      h1: "text-5xl font-semibold tracking-tight",
      h2: "text-4xl font-semibold tracking-tight",
      h3: "text-3xl font-semibold",
      h4: "text-2xl font-medium",
      h5: "text-xl font-medium",
      h6: "text-lg font-medium",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

export function Heading({ variant = "h1", as, className, ...props }: HeadingProps) {
  const Tag = as ?? defaultTagFor(variant);
  return <Tag className={cn(headingStyles({ variant }), className)} {...props} />;
}
