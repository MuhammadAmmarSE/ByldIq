"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { staggerContainer, staggerItemTransformOnly } from "@/lib/motion-variants";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { ENGINEERING_STANDARDS } from "./data/engineering-standards";
import type { EngineeringStandardsProps } from "./EngineeringStandards.types";

/**
 * CLAUDE.md Milestone 13 §5's Engineering Standards, in the spec's own
 * manifesto voice (see `data/engineering-standards.ts`). Deliberately not
 * a duplicate of the homepage's `EngineeringExcellenceEngine` (CLAUDE.md
 * Part 15) — that section demonstrates *how* these principles show up in
 * this actual repository (real CI stages, real testing tools); this one
 * states *why* they exist. The "see it in practice" link connects the two
 * rather than repeating one inside the other.
 */
export function EngineeringStandards({ className }: EngineeringStandardsProps) {
  const analytics = useAnalytics();

  function handleView(principle: string) {
    analytics.track("about_engineering_principle_viewed", { principle });
  }

  return (
    <section id="engineering-standards" className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="Engineering Standards"
        heading="What we won't compromise on."
        description="Every one of these is a real standard applied to this repository, not aspirational copy — see it in practice on the homepage's Engineering Excellence section."
        actions={
          <Link
            href="/#engineering-excellence"
            className="text-accent hover:text-accent/80 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
            onClick={() => analytics.track("about_cta_selected", { cta: "engineering-excellence" })}
          >
            See it in practice
            <Icon icon={ArrowRight} size="xs" />
          </Link>
        }
      />

      <motion.dl
        className="grid gap-x-8 gap-y-6 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {ENGINEERING_STANDARDS.map((standard) => (
          <motion.div
            key={standard.id}
            variants={staggerItemTransformOnly}
            onPointerEnter={() => handleView(standard.id)}
            className="border-border space-y-1.5 border-t pt-4"
          >
            <dt className="text-foreground font-medium">{standard.title}</dt>
            <dd>
              <Text variant="body" className="text-foreground">
                {standard.statement}
              </Text>
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
