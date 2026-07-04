import type { ComponentPropsWithoutRef, ElementType } from "react";

export const CONTAINER_SIZES = ["narrow", "content", "wide"] as const;

export type ContainerSize = (typeof CONTAINER_SIZES)[number];

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  /** Maps to the `--container-*` width tokens in tokens.css. */
  size?: ContainerSize;
  as?: ElementType;
}
