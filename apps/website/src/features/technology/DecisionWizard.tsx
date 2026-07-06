"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { POPULATED_CATEGORIES } from "./data/facets";
import { TECHNOLOGIES } from "./data/technologies";
import type { Technology } from "./data/technology.schema";
import type { DecisionWizardProps } from "./DecisionWizard.types";

const CONCERNS = [
  { key: "performance", label: "Performance & speed" },
  { key: "security", label: "Security & compliance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "scalability", label: "Scalability & traffic" },
  { key: "costAnalysis", label: "Cost & budget" },
] as const satisfies ReadonlyArray<{ key: keyof Technology; label: string }>;

type ConcernKey = (typeof CONCERNS)[number]["key"];

/**
 * CLAUDE.md Part 22's Decision Framework (`/technology/decision-framework`):
 * two questions — what you're building, and what matters most right now —
 * narrow to real candidates and surface each one's own authored answer to
 * that concern.
 *
 * Deliberately not a scoring or matching algorithm: `bestFor`/`avoidWhen`/
 * `teamSize` are prose, not structured tags (see this component's
 * `.docs.md`), so a keyword-matching "recommendation" would risk
 * contradicting the very content it's built from. Instead, this narrows by
 * the one genuinely structural field (`category`) and then shows the
 * technology's own real narrative field for the chosen concern — teaching
 * through existing honest content rather than inventing a confidence
 * score BuildPath doesn't even claim to produce.
 */
export function DecisionWizard({ className }: DecisionWizardProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [concern, setConcern] = useState<ConcernKey | null>(null);
  const analytics = useAnalytics();

  const results = category
    ? TECHNOLOGIES.filter((technology) => technology.category === category)
    : [];

  useEffect(() => {
    if (category && concern) {
      analytics.track("decision_wizard_completed", {
        recommendedSlugs: results.map((technology) => technology.slug),
      });
    }
    // Fire once per completed (category + concern) combination, not on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, concern]);

  function handleCategorySelect(value: string) {
    setCategory(value);
    analytics.track("decision_wizard_answered", {
      question: "what-are-you-building",
      answer: value,
    });
  }

  function handleConcernSelect(value: ConcernKey) {
    setConcern(value);
    analytics.track("decision_wizard_answered", { question: "what-matters-most", answer: value });
  }

  return (
    <div className={cn("space-y-10", className)}>
      <div className="max-w-2xl space-y-3">
        <Heading variant="h2">Find the right technology</Heading>
        <Text variant="body" className="text-muted">
          Two questions, real answers — not a generated score. Every result links back to the full
          reasoning on that technology&apos;s own page.
        </Text>
      </div>

      <div className="space-y-3">
        <Heading variant="h4" as="h3">
          What are you building?
        </Heading>
        <div className="flex flex-wrap gap-2" role="group" aria-label="What are you building?">
          {POPULATED_CATEGORIES.map((option) => (
            <Button
              key={option.slug}
              variant={category === option.slug ? "primary" : "outline"}
              size="sm"
              aria-pressed={category === option.slug}
              onClick={() => handleCategorySelect(option.slug)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Heading variant="h4" as="h3">
          What matters most right now?
        </Heading>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="What matters most right now?"
        >
          {CONCERNS.map((option) => (
            <Button
              key={option.key}
              variant={concern === option.key ? "primary" : "outline"}
              size="sm"
              aria-pressed={concern === option.key}
              onClick={() => handleConcernSelect(option.key)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {category && concern && (
        <div className="space-y-4">
          <Heading variant="h4" as="h3">
            {results.length > 1 ? "Candidates to consider" : "Your candidate"}
          </Heading>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((technology) => (
              <Card key={technology.slug}>
                <Card.Header>
                  <Heading variant="h5" as="h4">
                    <Link href={`/technology/${technology.slug}`} className="hover:text-accent">
                      {technology.name}
                    </Link>
                  </Heading>
                  <Text variant="caption" className="text-muted">
                    {technology.tagline}
                  </Text>
                </Card.Header>
                <Card.Content>
                  <Text variant="body" className="line-clamp-4">
                    {technology[concern]}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
