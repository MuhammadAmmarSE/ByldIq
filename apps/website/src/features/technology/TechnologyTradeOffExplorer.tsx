"use client";

import { Heading } from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TechnologyTradeOffExplorerProps } from "./TechnologyTradeOffExplorer.types";

const QUICK_FACTS = [
  { key: "cost", label: "Cost" },
  { key: "complexity", label: "Complexity" },
  { key: "teamSize", label: "Team size" },
  { key: "scalability", label: "Scalability" },
] as const;

/**
 * CLAUDE.md Part 22's flagship Trade-Off Explorer: technology is "never
 * best," only appropriate or inappropriate for a specific problem — so
 * this always shows Best For, Avoid When, and Alternatives together
 * rather than a single verdict, plus a quick-facts row for scannable
 * comparison (the deeper cost/scalability narrative lives in the page's
 * later Cost Analysis / Scalability sections).
 */
export function TechnologyTradeOffExplorer({
  technology,
  className,
}: TechnologyTradeOffExplorerProps) {
  const analytics = useAnalytics();

  function handleTabChange(section: string) {
    analytics.track("technology_trade_off_expanded", { slug: technology.slug, section });
  }

  return (
    <section id="trade-off-explorer" className={cn("max-w-3xl space-y-6", className)}>
      <Heading variant="h3" as="h2">
        Trade-off explorer
      </Heading>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {QUICK_FACTS.map(({ key, label }) => (
          <div key={key} className="border-border bg-surface-raised rounded-lg border p-4">
            <p className="text-foreground text-sm font-semibold">{technology.tradeOff[key]}</p>
            <p className="text-muted text-xs">{label}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="best-for" onValueChange={handleTabChange}>
        <TabsList aria-label="Trade-off explorer">
          <TabsTrigger value="best-for">Best for</TabsTrigger>
          <TabsTrigger value="avoid-when">Avoid when</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
        </TabsList>

        <TabsContent value="best-for">
          <ul className="space-y-2">
            {technology.tradeOff.bestFor.map((item) => (
              <li key={item}>
                <Text variant="body">{item}</Text>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="avoid-when">
          <ul className="space-y-2">
            {technology.tradeOff.avoidWhen.map((item) => (
              <li key={item}>
                <Text variant="body">{item}</Text>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="alternatives">
          <ul className="flex flex-wrap gap-2">
            {technology.tradeOff.alternatives.map((alternative) => (
              <li
                key={alternative}
                className="border-border bg-surface-raised rounded-full border px-3 py-1"
              >
                <Text variant="caption">{alternative}</Text>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </section>
  );
}
