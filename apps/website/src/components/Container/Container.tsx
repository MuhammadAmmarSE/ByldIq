import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import type { ContainerProps } from "./Container.types";

const containerStyles = cva("mx-auto w-full px-6", {
  variants: {
    size: {
      narrow: "max-w-narrow",
      content: "max-w-content",
      wide: "max-w-wide",
    },
  },
  defaultVariants: {
    size: "content",
  },
});

export function Container({
  size = "content",
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return <Tag className={cn(containerStyles({ size }), className)} {...props} />;
}
