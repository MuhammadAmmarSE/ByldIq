"use client";

import { motion } from "motion/react";

import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeader } from "@/components/SectionHeader";
import { staggerContainer, staggerItemTransformOnly } from "@/lib/motion-variants";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { PHILOSOPHY_PRINCIPLES } from "./data/philosophy-principles";
import type { PhilosophyPrinciplesProps } from "./PhilosophyPrinciples.types";

/**
 * CLAUDE.md Milestone 13 §3's Our Philosophy: six core beliefs, each with
 * a short explanation and a visual treatment (icon + card). Reveals
 * sequentially on scroll into view via `staggerItemTransformOnly` (not
 * the fade-based `staggerItem`) — `FeatureCard`'s description uses
 * `text-muted`, the same marginal-contrast token whose opacity-fade
 * entrance produced a real axe `color-contrast` failure in `ProjectGrid`
 * (see `CaseStudyEngineeringProcess.docs.md` for the full history). Cards
 * aren't links — a principle isn't a page to navigate to — so
 * `about_philosophy_interaction` fires on hover, the only interaction a
 * non-interactive card actually offers.
 */
export function PhilosophyPrinciples({ className }: PhilosophyPrinciplesProps) {
  const analytics = useAnalytics();

  function handleInteract(principle: string) {
    analytics.track("about_philosophy_interaction", { principle });
  }

  return (
    <section id="philosophy" className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="Our Philosophy"
        heading="What we believe, before any line of code."
        description="These beliefs shape every decision — from the first conversation about a product to the last line of a pull request."
      />

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {PHILOSOPHY_PRINCIPLES.map((principle) => (
          <motion.div
            key={principle.id}
            variants={staggerItemTransformOnly}
            onPointerEnter={() => handleInteract(principle.id)}
          >
            <FeatureCard
              icon={principle.icon}
              title={principle.title}
              description={principle.description}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
