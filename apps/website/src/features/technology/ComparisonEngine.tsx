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

import type { ComparisonEngineProps } from "./ComparisonEngine.types";
import { TECHNOLOGIES } from "./data/technologies";

const POPULAR_COMPARISONS = [
  { a: "next-js", b: "remix", label: "Next.js vs Remix" },
  { a: "postgresql", b: "mongodb", label: "PostgreSQL vs MongoDB" },
] as const;

const DEFAULT_A = "next-js";
const DEFAULT_B = "remix";

function isRealSlug(slug: string | undefined): slug is string {
  return Boolean(slug) && TECHNOLOGIES.some((technology) => technology.slug === slug);
}

function toOptions(excludeSlug: string) {
  return TECHNOLOGIES.map((technology) => ({
    value: technology.slug,
    label: technology.name,
    disabled: technology.slug === excludeSlug,
  }));
}

/**
 * CLAUDE.md Part 22's Comparison Engine: visitors pick any two
 * technologies and see them side by side across the same dimensions —
 * never a declared winner, only the trade-offs needed to decide for a
 * specific project. "Popular comparisons" surfaces the two pairs the real
 * dataset actually supports well (Next.js vs Remix, both frontend
 * frameworks; PostgreSQL vs MongoDB, both databases) rather than
 * fabricating comparisons between unrelated categories.
 */
export function ComparisonEngine({ initialSlugA, initialSlugB, className }: ComparisonEngineProps) {
  const [slugA, setSlugA] = useState(isRealSlug(initialSlugA) ? initialSlugA : DEFAULT_A);
  const [slugB, setSlugB] = useState(isRealSlug(initialSlugB) ? initialSlugB : DEFAULT_B);
  const analytics = useAnalytics();

  const technologyA = TECHNOLOGIES.find((technology) => technology.slug === slugA);
  const technologyB = TECHNOLOGIES.find((technology) => technology.slug === slugB);

  useEffect(() => {
    analytics.track("technology_comparison_viewed", { slugs: [slugA, slugB] });
    // Track whenever the compared pair changes, not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugA, slugB]);

  function handleSelectPopular(a: string, b: string) {
    setSlugA(a);
    setSlugB(b);
  }

  return (
    <div className={cn("space-y-8", className)}>
      <div className="max-w-2xl space-y-3">
        <Heading variant="display">Compare technologies</Heading>
        <Text variant="body" className="text-muted">
          There&apos;s no universal winner here — only which fits your team, timeline, and
          constraints better. Pick two technologies to compare across the same dimensions.
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
          aria-label="First technology"
          options={toOptions(slugB)}
          value={slugA}
          onValueChange={setSlugA}
        />
        <Select
          aria-label="Second technology"
          options={toOptions(slugA)}
          value={slugB}
          onValueChange={setSlugB}
        />
      </div>

      {technologyA && technologyB && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              {technologyA.name} compared with {technologyB.name}
            </caption>
            <thead>
              <tr className="border-border border-b">
                <th scope="col" className="p-3 text-sm font-medium">
                  <span className="sr-only">Dimension</span>
                </th>
                <th scope="col" className="p-3">
                  <Link href={`/technology/${technologyA.slug}`} className="hover:text-accent">
                    <Heading variant="h5" as="span">
                      {technologyA.name}
                    </Heading>
                  </Link>
                </th>
                <th scope="col" className="p-3">
                  <Link href={`/technology/${technologyB.slug}`} className="hover:text-accent">
                    <Heading variant="h5" as="span">
                      {technologyB.name}
                    </Heading>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Tagline
                </th>
                <td className="p-3 align-top">
                  <Text variant="body">{technologyA.tagline}</Text>
                </td>
                <td className="p-3 align-top">
                  <Text variant="body">{technologyB.tagline}</Text>
                </td>
              </tr>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Cost
                </th>
                <td className="p-3 align-top">{technologyA.tradeOff.cost}</td>
                <td className="p-3 align-top">{technologyB.tradeOff.cost}</td>
              </tr>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Complexity
                </th>
                <td className="p-3 align-top">{technologyA.tradeOff.complexity}</td>
                <td className="p-3 align-top">{technologyB.tradeOff.complexity}</td>
              </tr>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Team size
                </th>
                <td className="p-3 align-top">{technologyA.tradeOff.teamSize}</td>
                <td className="p-3 align-top">{technologyB.tradeOff.teamSize}</td>
              </tr>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Scalability
                </th>
                <td className="p-3 align-top">{technologyA.tradeOff.scalability}</td>
                <td className="p-3 align-top">{technologyB.tradeOff.scalability}</td>
              </tr>
              <tr className="border-border border-b">
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Best for
                </th>
                <td className="p-3 align-top">
                  <ul className="list-disc space-y-1 pl-4">
                    {technologyA.tradeOff.bestFor.map((item) => (
                      <li key={item}>
                        <Text variant="body">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 align-top">
                  <ul className="list-disc space-y-1 pl-4">
                    {technologyB.tradeOff.bestFor.map((item) => (
                      <li key={item}>
                        <Text variant="body">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-muted p-3 text-sm font-medium">
                  Avoid when
                </th>
                <td className="p-3 align-top">
                  <ul className="list-disc space-y-1 pl-4">
                    {technologyA.tradeOff.avoidWhen.map((item) => (
                      <li key={item}>
                        <Text variant="body">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 align-top">
                  <ul className="list-disc space-y-1 pl-4">
                    {technologyB.tradeOff.avoidWhen.map((item) => (
                      <li key={item}>
                        <Text variant="body">{item}</Text>
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
