import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import { defaultTagFor, type TextProps } from "./Text.types";

const textStyles = cva("font-body", {
  variants: {
    variant: {
      subtitle: "text-lg text-muted",
      body: "text-base text-foreground",
      caption: "text-sm text-muted",
      code: "rounded-sm bg-surface-raised px-1.5 py-0.5 font-mono text-sm text-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export function Text({ variant = "body", as, className, ...props }: TextProps) {
  const Tag = as ?? defaultTagFor(variant);
  return <Tag className={cn(textStyles({ variant }), className)} {...props} />;
}
