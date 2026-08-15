"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Container } from "@/components/Container";
import type { ContainerSize } from "@/components/Container";
import { cn } from "@/utils/cn";

import { useCurrentSectionSync } from "./useCurrentSectionSync";
import { useSectionAnalytics } from "./useSectionAnalytics";

export interface HomepageSectionProps extends ComponentPropsWithoutRef<"section"> {
  id: string;
  /** Analytics section name, defaults to `id`. Override when the DOM id is more granular than the event should be (e.g. sub-sections). */
  analyticsId?: string;
  containerSize?: ContainerSize;
}

/**
 * Shared landmark wrapper for every homepage module: a semantic `<section>`
 * with a stable `id` (deep-linkable, used as the scroll-reveal margin
 * anchor), consistent vertical rhythm, automatic `section_viewed`
 * analytics, and syncing the AI Companion's `currentSection` — so
 * individual modules never wire visibility tracking themselves.
 */
export function HomepageSection({
  id,
  analyticsId,
  containerSize = "content",
  className,
  children,
  ...props
}: HomepageSectionProps) {
  const ref = useSectionAnalytics<HTMLElement>(analyticsId ?? id);
  useCurrentSectionSync(analyticsId ?? id, ref);

  return (
    <section id={id} ref={ref} className={cn("py-16 sm:py-24", className)} {...props}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
