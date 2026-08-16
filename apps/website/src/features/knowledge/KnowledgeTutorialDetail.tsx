"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { CodeBlock } from "@/components/CodeBlock";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { buildTutorialGroundedReplies } from "./groundedReplies";
import type { KnowledgeTutorialDetailProps } from "./KnowledgeTutorialDetail.types";

/**
 * CLAUDE.md Part 18/19's Tutorials: "Prerequisites → Setup → Step 1 →
 * Step 2 → Step 3 → Validation → Next Steps." Every code sample renders
 * through the shared `CodeBlock` (copy, line numbers, highlighting).
 */
export function KnowledgeTutorialDetail({
  tutorial,
  categoryLabel,
  className,
}: KnowledgeTutorialDetailProps) {
  const analytics = useAnalytics();
  const { setPageContext } = useAiCompanion();

  useEffect(() => {
    analytics.track("knowledge_tutorial_started", { slug: tutorial.slug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial.slug]);

  useEffect(() => {
    setPageContext({
      label: tutorial.title,
      slug: tutorial.slug,
      groundedReplies: buildTutorialGroundedReplies(tutorial),
    });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial.slug, tutorial.title]);

  return (
    <div className={cn("space-y-10", className)}>
      <Breadcrumb
        items={[
          { label: "Knowledge", href: "/knowledge" },
          { label: "Tutorials", href: "/knowledge/tutorials" },
          { label: tutorial.title },
        ]}
      />

      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {categoryLabel ? <Badge variant="neutral">{categoryLabel}</Badge> : null}
          <Badge variant="outline">{tutorial.difficulty}</Badge>
          <Badge variant="outline">{tutorial.duration}</Badge>
        </div>
        <Heading variant="display">{tutorial.title}</Heading>
        <Text variant="subtitle">{tutorial.summary}</Text>
      </div>

      <section className="max-w-3xl space-y-3" aria-labelledby="tutorial-prerequisites-heading">
        <Heading variant="h4" as="h2" id="tutorial-prerequisites-heading">
          Prerequisites
        </Heading>
        <ul className="list-disc space-y-1 pl-5">
          {tutorial.prerequisites.map((prerequisite) => (
            <li key={prerequisite}>
              <Text variant="body">{prerequisite}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-3xl space-y-3" aria-labelledby="tutorial-setup-heading">
        <Heading variant="h4" as="h2" id="tutorial-setup-heading">
          Setup
        </Heading>
        <Text variant="body">{tutorial.setup.instructions}</Text>
        {tutorial.setup.code && (
          <CodeBlock
            code={tutorial.setup.code.code}
            language={tutorial.setup.code.language}
            filename={tutorial.setup.code.filename}
          />
        )}
      </section>

      <div className="max-w-3xl space-y-8">
        {tutorial.steps.map((step, index) => (
          <section key={step.id} className="space-y-3" aria-labelledby={`tutorial-step-${step.id}`}>
            <Heading variant="h4" as="h2" id={`tutorial-step-${step.id}`}>
              Step {index + 1}: {step.title}
            </Heading>
            <Text variant="body">{step.instructions}</Text>
            {step.code && (
              <CodeBlock
                code={step.code.code}
                language={step.code.language}
                filename={step.code.filename}
              />
            )}
          </section>
        ))}
      </div>

      <section className="max-w-3xl space-y-3" aria-labelledby="tutorial-validation-heading">
        <Heading variant="h4" as="h2" id="tutorial-validation-heading">
          Validation
        </Heading>
        <Text variant="body">{tutorial.validation}</Text>
      </section>

      <section className="max-w-3xl space-y-3" aria-labelledby="tutorial-next-steps-heading">
        <Heading variant="h4" as="h2" id="tutorial-next-steps-heading">
          Next steps
        </Heading>
        <ul className="list-disc space-y-1 pl-5">
          {tutorial.nextSteps.map((step) => (
            <li key={step}>
              <Text variant="body">{step}</Text>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/knowledge/tutorials">Browse all tutorials</Link>
        </Button>
        <Button asChild>
          <Link href={`/buildpath?tutorial=${tutorial.slug}`}>
            Plan a similar build with BuildPath
          </Link>
        </Button>
      </div>
    </div>
  );
}
