"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { BUSINESS_PROBLEMS } from "./data/business-problems";
import type { CaseStudyHeroProps } from "./CaseStudyHero.types";

const KEY_FACTS = [
  { label: "Team", key: "teamSize" },
  { label: "Timeline", key: "timeline" },
  { label: "Scale", key: "projectScale" },
] as const;

/**
 * Every case study's hero (CLAUDE.md Part 21): breadcrumb back to `/work`,
 * industry/business-problem/AI badges, headline, key facts, and two
 * CTAs — BuildPath (linking to `/buildpath?caseStudy={slug}`, which
 * acknowledges the referring case study) and the AI Companion. Mirrors
 * `SolutionHero`'s structure so the two platforms feel like one system.
 */
export function CaseStudyHero({ caseStudy, company, className }: CaseStudyHeroProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion, setPageContext } = useAiCompanion();

  useEffect(() => {
    analytics.track("case_study_viewed", { slug: caseStudy.slug });
    // Fire once per mount (page view), not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudy.slug]);

  useEffect(() => {
    setPageContext({ label: `the ${company.name} case study`, slug: caseStudy.slug });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudy.slug, company.name]);

  const businessProblemLabel =
    BUSINESS_PROBLEMS.find((problem) => problem.slug === caseStudy.businessProblem)?.label ??
    caseStudy.businessProblem;

  function handlePrimaryCta() {
    analytics.track("case_study_cta_selected", { slug: caseStudy.slug, cta: "hero-primary" });
    analytics.track("case_study_buildpath_started", { slug: caseStudy.slug });
  }

  function handleTalkToByld() {
    analytics.track("case_study_cta_selected", { slug: caseStudy.slug, cta: "ai" });
    openAiCompanion();
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Breadcrumb items={[{ label: "Work", href: "/work" }, { label: company.name }]} />

      <div className="max-w-3xl space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">{company.industry}</Badge>
          <Badge variant="outline">{businessProblemLabel}</Badge>
          {caseStudy.aiInvolvement && <Badge variant="accent">AI-powered</Badge>}
        </div>

        <Heading variant="display">{caseStudy.headline}</Heading>

        <dl className="grid grid-cols-3 gap-4">
          {KEY_FACTS.map((fact) => (
            <div key={fact.key}>
              <dt className="text-muted text-xs">{fact.label}</dt>
              <dd className="text-foreground text-sm font-medium">{caseStudy[fact.key]}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg" onClick={handlePrimaryCta}>
            <Link href={`/buildpath?caseStudy=${caseStudy.slug}`}>Plan a similar project</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={handleTalkToByld}>
            Talk to Byld
          </Button>
        </div>
      </div>
    </div>
  );
}
