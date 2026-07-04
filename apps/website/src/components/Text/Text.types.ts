import type { ComponentPropsWithoutRef, ElementType } from "react";

export const TEXT_VARIANTS = ["subtitle", "body", "caption", "code"] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];

const DEFAULT_TAG: Record<TextVariant, ElementType> = {
  subtitle: "p",
  body: "p",
  caption: "p",
  code: "code",
};

export function defaultTagFor(variant: TextVariant): ElementType {
  return DEFAULT_TAG[variant];
}

export interface TextProps extends ComponentPropsWithoutRef<"p"> {
  variant?: TextVariant;
  as?: ElementType;
}
