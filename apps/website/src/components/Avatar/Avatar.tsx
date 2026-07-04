"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import { type AvatarProps } from "./Avatar.types";

const avatarStyles = cva(
  "bg-surface-raised relative inline-flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  return (
    <AvatarPrimitive.Root className={cn(avatarStyles({ size }), className)}>
      {src && <AvatarPrimitive.Image src={src} alt={alt} className="h-full w-full object-cover" />}
      <AvatarPrimitive.Fallback
        delayMs={src ? 400 : 0}
        className="text-foreground flex h-full w-full items-center justify-center font-medium"
      >
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
