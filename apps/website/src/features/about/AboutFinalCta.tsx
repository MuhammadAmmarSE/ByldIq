"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { FINAL_CTA_OPTIONS } from "./data/final-cta-options";
import type { AboutFinalCtaProps } from "./AboutFinalCta.types";

/**
 * CLAUDE.md Milestone 13 §22's Final CTA: a decision-oriented menu, not
 * "Contact Us" — a flat set of four options (not a personalized
 * recommendation like the homepage's `DecisionCards`), since the spec
 * frames this as reinforcing the whole ecosystem rather than steering one
 * visitor toward one path.
 */
export function AboutFinalCta({ className }: AboutFinalCtaProps) {
  const { open: openAiCompanion } = useAiCompanion();
  const analytics = useAnalytics();

  function handleSelect(id: string, href: string) {
    analytics.track("about_cta_selected", { cta: id });
    if (id === "idea") analytics.track("about_buildpath_started", {});
    if (id === "learn") analytics.track("about_knowledge_clicked", {});
    if (!href) openAiCompanion();
  }

  return (
    <section id="get-started" className={cn("border-border space-y-10 border-t pt-16", className)}>
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <Heading variant="h2">Have something you want to build?</Heading>
        <Text variant="subtitle">Pick the option that matches where you are right now.</Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
        {FINAL_CTA_OPTIONS.map((option) => {
          const content = (
            <>
              <Text variant="caption" className="text-muted">
                {option.prompt}
              </Text>
              <span className="text-accent mt-3 flex items-center gap-1 text-sm font-medium">
                {option.action}
                <Icon icon={ArrowRight} size="sm" />
              </span>
            </>
          );

          return (
            <Card key={option.id} role="listitem" className="p-5">
              {option.href ? (
                <Link
                  href={option.href}
                  className="flex h-full flex-col"
                  onClick={() => handleSelect(option.id, option.href)}
                >
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  className="flex h-full w-full flex-col text-left"
                  onClick={() => handleSelect(option.id, option.href)}
                >
                  {content}
                </button>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
