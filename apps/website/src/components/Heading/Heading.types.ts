import type { ComponentPropsWithoutRef, ElementType } from "react";

export const HEADING_VARIANTS = ["display", "h1", "h2", "h3", "h4", "h5", "h6"] as const;

export type HeadingVariant = (typeof HEADING_VARIANTS)[number];

const DEFAULT_TAG: Record<HeadingVariant, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

export function defaultTagFor(variant: HeadingVariant): ElementType {
  return DEFAULT_TAG[variant];
}

export interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  variant?: HeadingVariant;
  /**
   * Override the rendered element without changing the visual style — e.g.
   * a visually-h1 heading that should semantically be an `h2` because an
   * `h1` already exists on the page.
   */
  as?: ElementType;
}
