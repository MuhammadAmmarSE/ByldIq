"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";
import { ProjectGrid } from "@/features/homepage/proof-engine";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { EcosystemSectionProps } from "./EcosystemSection.types";

const FEATURED_SLUGS = ["fieldnote-mvp", "atlas-logistics-modernization", "nova-commerce-checkout"];

const companiesById = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));

/**
 * CLAUDE.md Milestone 13 §20's Case Study Integration: "We believe
 * engineering decisions should create measurable outcomes. Then show
 * selected case studies." Reuses the real `ProjectGrid`/`ProjectCard`
 * from the homepage's Proof Engine and real `CASE_STUDIES` data — the
 * philosophy stated throughout this page is only credible next to actual
 * proof, not a second illustration of it.
 */
export function EcosystemSection({ className }: EcosystemSectionProps) {
  const analytics = useAnalytics();
  const featured = FEATURED_SLUGS.map((slug) =>
    CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug),
  ).filter((caseStudy) => caseStudy !== undefined);

  return (
    <section id="ecosystem" className={cn("space-y-8", className)}>
      <SectionHeader
        eyebrow="Proof, Not Just Philosophy"
        heading="We believe engineering decisions should create measurable outcomes."
        description="Here's what that's looked like in practice."
        actions={
          <Button
            asChild
            variant="outline"
            onClick={() => analytics.track("about_cta_selected", { cta: "explore-work" })}
          >
            <Link href="/work">
              Explore all our work
              <Icon icon={ArrowRight} size="sm" />
            </Link>
          </Button>
        }
      />

      <ProjectGrid
        caseStudies={featured}
        companiesById={companiesById}
        onSelect={(slug) => analytics.track("about_case_study_clicked", { slug })}
      />
    </section>
  );
}
