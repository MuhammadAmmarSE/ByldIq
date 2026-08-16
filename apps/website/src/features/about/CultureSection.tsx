"use client";

import { motion } from "motion/react";

import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeader } from "@/components/SectionHeader";
import { staggerContainer, staggerItemTransformOnly } from "@/lib/motion-variants";
import { cn } from "@/utils/cn";

import { CULTURE_VALUES } from "./data/culture-values";
import type { CultureSectionProps } from "./CultureSection.types";

/**
 * CLAUDE.md Milestone 13 §9's Culture: "Use real examples rather than
 * generic statements." See `data/culture-values.ts` for why every example
 * here describes a genuine, demonstrated pattern in this codebase's own
 * engineering practice, not generic culture-deck language.
 */
export function CultureSection({ className }: CultureSectionProps) {
  return (
    <section id="culture" className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="Culture"
        heading="How we actually operate."
        description="Not a list of values on a wall — these are patterns you can see in how this very website was built."
      />

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {CULTURE_VALUES.map((value) => (
          <motion.div key={value.id} variants={staggerItemTransformOnly}>
            <FeatureCard
              icon={value.icon}
              title={value.title}
              description={value.example}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
