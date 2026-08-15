"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Select } from "@/components/Select";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { SOLUTIONS } from "./data/solutions";
import type { SolutionComparisonEngineProps } from "./SolutionComparisonEngine.types";

/**
 * Real pairs the 12-solution dataset naturally supports — never a
 * fabricated pairing like the M10 spec's illustrative "AI Automation vs
 * Manual Workflow" would require (there's no "Manual Workflow" solution
 * to compare against). Each pair compares two solutions visitors
 * genuinely would weigh against each other.
 */
const POPULAR_COMPARISONS = [
  { a: "saas-development", b: "enterprise", label: "SaaS Development vs Enterprise" },
  { a: "commerce", b: "custom-engineering", label: "Commerce vs Custom Engineering" },
  { a: "startup", b: "dedicated-teams", label: "Startup MVP vs Dedicated Teams" },
  { a: "automation", b: "custom-engineering", label: "Automation vs Custom Engineering" },
] as const;

const DEFAULT_A = "saas-development";
const DEFAULT_B = "enterprise";

function toOptions(excludeSlug: string) {
  return SOLUTIONS.map((solution) => ({
    value: solution.slug,
    label: solution.navLabel,
    disabled: solution.slug === excludeSlug,
  }));
}

/**
 * Milestone 10's Interactive Comparison, adapted from the Technology
 * Explorer's `ComparisonEngine` (CLAUDE.md Part 22) for `SOLUTIONS`:
 * visitors pick any two solutions and see them side by side across the
 * same dimensions — never a declared winner, only the trade-offs needed
 * to decide which fits.
 */
export function SolutionComparisonEngine({ className }: SolutionComparisonEngineProps) {
  const [slugA, setSlugA] = useState(DEFAULT_A);
  const [slugB, setSlugB] = useState(DEFAULT_B);
  const analytics = useAnalytics();

  const solutionA = SOLUTIONS.find((solution) => solution.slug === slugA);
  const solutionB = SOLUTIONS.find((solution) => solution.slug === slugB);

  useEffect(() => {
    analytics.track("solution_comparison_viewed", { slugs: [slugA, slugB] });
    // Track whenever the compared pair changes, not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugA, slugB]);

  function handleSelectPopular(a: string, b: string) {
    setSlugA(a);
    setSlugB(b);
  }

  return (
    <div className={cn("space-y-8", className)}>
      <div className="space-y-2">
        <Heading variant="h2">Compare solutions.</Heading>
        <Text variant="subtitle">
          There&apos;s no universal answer here — only which fits your goals, timeline, and budget
          better. Pick two solutions to compare across the same dimensions.
        </Text>
      </div>

      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Popular comparisons"
      >
        {POPULAR_COMPARISONS.map((comparison) => (
          <Button
            key={comparison.label}
            variant="outline"
            size="sm"
            onClick={() => handleSelectPopular(comparison.a, comparison.b)}
          >
            {comparison.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:max-w-xl sm:grid-cols-2">
        <Select
          aria-label="First solution"
          options={toOptions(slugB)}
          value={slugA}
          onValueChange={setSlugA}
        />
        <Select
          aria-label="Second solution"
          options={toOptions(slugA)}
          value={slugB}
          onValueChange={setSlugB}
        />
      </div>

      {solutionA && solutionB && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              {solutionA.navLabel} compared with {solutionB.navLabel}
            </caption>
            <thead>
              <tr className="border-border border-b">
                <th scope="col" className="p-3 text-sm font-medium">
                  <span className="sr-only">Dimension</span>
                </th>
                <th scope="col" className="p-3">
                  <Link href={`/solutions/${solutionA.slug}`} className="hover:text-accent">
                    <Heading variant="h5" as="span">
                      {solutionA.navLabel}
                    </Heading>
                  </Link>
                </th>
                <th scope="col" className="p-3">
                  <Link href={`/solutions/${solutionB.slug}`} className="hover:text-accent">
                    <Heading variant="h5" as="span">
                      {solutionB.navLabel}
                    </Heading>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Who it&apos;s for
                </th>
                <td className="p-3 align-top">
                  <Text variant="body">{solutionA.who}</Text>
                </td>
                <td className="p-3 align-top">
                  <Text variant="body">{solutionB.who}</Text>
                </td>
              </tr>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  The problem it solves
                </th>
                <td className="p-3 align-top">
                  <Text variant="body">{solutionA.businessProblem}</Text>
                </td>
                <td className="p-3 align-top">
                  <Text variant="body">{solutionB.businessProblem}</Text>
                </td>
              </tr>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Timeline
                </th>
                <td className="p-3 align-top">{solutionA.deliveryTimeline}</td>
                <td className="p-3 align-top">{solutionB.deliveryTimeline}</td>
              </tr>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Team
                </th>
                <td className="p-3 align-top">
                  <ul className="list-disc space-y-1 pl-4">
                    {solutionA.teamComposition.map((role) => (
                      <li key={role}>
                        <Text variant="body">{role}</Text>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 align-top">
                  <ul className="list-disc space-y-1 pl-4">
                    {solutionB.teamComposition.map((role) => (
                      <li key={role}>
                        <Text variant="body">{role}</Text>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Investment
                </th>
                <td className="p-3 align-top">
                  <Text variant="body">{solutionA.investmentGuidance}</Text>
                </td>
                <td className="p-3 align-top">
                  <Text variant="body">{solutionB.investmentGuidance}</Text>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Outcomes
                </th>
                <td className="p-3 align-top">
                  <ul className="list-disc space-y-1 pl-4">
                    {solutionA.businessOutcomes.map((outcome) => (
                      <li key={outcome}>
                        <Text variant="body">{outcome}</Text>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 align-top">
                  <ul className="list-disc space-y-1 pl-4">
                    {solutionB.businessOutcomes.map((outcome) => (
                      <li key={outcome}>
                        <Text variant="body">{outcome}</Text>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
