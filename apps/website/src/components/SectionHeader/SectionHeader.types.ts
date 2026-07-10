import type { ElementType, ReactNode } from "react";

import type { HeadingVariant } from "@/components/Heading";

export interface SectionHeaderProps {
  /** A short label above the heading, e.g. "Startup Journey". Rendered as an outline `Badge`. */
  eyebrow?: string;
  heading: ReactNode;
  /** Visual size, per `Heading`'s own scale. Defaults to `"h2"` — a page-top header should pass `"display"` explicitly. */
  headingVariant?: HeadingVariant;
  /** Semantic tag override, per `Heading`'s own `as` prop — for keeping document heading order correct. */
  headingAs?: ElementType;
  description?: ReactNode;
  /** A CTA or link, rendered alongside the heading on wide screens and below it on narrow ones. */
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
}
