"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ShareButton } from "@/components/ShareButton";
import { siteConfig } from "@/config/site";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { ProjectVisual } from "@/features/homepage/proof-engine/ProjectVisual";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { BUSINESS_PROBLEMS } from "./data/business-problems";
import { estimateReadingTime } from "./estimateReadingTime";
import { buildCaseStudyGroundedReplies } from "./groundedReplies";
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
 *
 * Milestone 12 additions: a `ProjectVisual` band (no real project imagery
 * exists — see that component's own docs), an estimated reading time
 * badge (`estimateReadingTime`, computed from the case study's actual
 * text rather than hand-authored and left to drift), a fixed
 * `ReadingProgressBar` that fires `case_study_reading_completed` once
 * scroll reaches the end, a `ShareButton`, and a tertiary "Explore the
 * architecture" link jumping straight to `#architecture` for visitors who
 * came specifically for the engineering detail.
 */
export function CaseStudyHero({ caseStudy, company, className }: CaseStudyHeroProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion, setPageContext } = useAiCompanion();
  const readingTimeMinutes = estimateReadingTime(caseStudy);

  useEffect(() => {
    analytics.track("case_study_viewed", { slug: caseStudy.slug });
    // Fire once per mount (page view), not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudy.slug]);

  useEffect(() => {
    setPageContext({
      label: `the ${company.name} case study`,
      slug: caseStudy.slug,
      groundedReplies: buildCaseStudyGroundedReplies(caseStudy),
    });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudy, company.name]);

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

  function handleExploreArchitecture() {
    analytics.track("case_study_cta_selected", { slug: caseStudy.slug, cta: "hero-architecture" });
  }

  function handleShare() {
    analytics.track("case_study_shared", { slug: caseStudy.slug });
  }

  function handleReadingCompleted() {
    analytics.track("case_study_reading_completed", { slug: caseStudy.slug });
  }

  return (
    <div className={cn("space-y-6", className)}>
      <ReadingProgressBar onComplete={handleReadingCompleted} />
      <Breadcrumb items={[{ label: "Work", href: "/work" }, { label: company.name }]} />

      <ProjectVisual
        id={`case-study-hero-visual-${caseStudy.slug}`}
        className="h-40 w-full rounded-lg sm:h-56"
      />

      <div className="max-w-3xl space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">{company.industry}</Badge>
          <Badge variant="outline">{businessProblemLabel}</Badge>
          <Badge variant="outline">{caseStudy.projectType}</Badge>
          {caseStudy.aiInvolvement && <Badge variant="accent">AI-powered</Badge>}
          <Badge variant="outline">{readingTimeMinutes} min read</Badge>
        </div>

        <Heading variant="display">{caseStudy.headline}</Heading>

        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {KEY_FACTS.map((fact) => (
            <div key={fact.key}>
              <dt className="text-muted text-xs">{fact.label}</dt>
              <dd className="text-foreground text-sm font-medium">{caseStudy[fact.key]}</dd>
            </div>
          ))}
          <div>
            <dt className="text-muted text-xs">Platform</dt>
            <dd className="text-foreground text-sm font-medium">{caseStudy.platform.join(", ")}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg" onClick={handlePrimaryCta}>
            <Link href={`/buildpath?caseStudy=${caseStudy.slug}`}>Plan a similar project</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={handleTalkToByld}>
            Talk to Byld
          </Button>
          <ShareButton
            title={caseStudy.headline}
            url={`${siteConfig.url}/work/${caseStudy.slug}`}
            onShare={handleShare}
          />
        </div>

        <Link
          href="#architecture"
          onClick={handleExploreArchitecture}
          className="text-accent hover:text-accent/80 inline-block text-sm font-medium underline-offset-4 hover:underline"
        >
          Explore the architecture
        </Link>
      </div>
    </div>
  );
}
