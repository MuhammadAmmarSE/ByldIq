"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { ArticleCardProps } from "./ArticleCard.types";

/**
 * A Knowledge Center preview card (CLAUDE.md Part 18). "Ask Byld" expands
 * a pre-written AI-style summary in place — a proportionate simplification
 * for a homepage preview rather than a live call into the AI Companion
 * (Phase 8) for a topic-specific answer it isn't built to generate.
 */
export function ArticleCard({
  article,
  categoryLabel,
  onSelect,
  onExpandAiSummary,
  className,
}: ArticleCardProps) {
  const [showAiSummary, setShowAiSummary] = useState(false);

  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <Card.Header>
        <div className="flex items-center gap-2">
          <Badge variant="neutral">{categoryLabel ?? article.category}</Badge>
          <Text variant="caption">{article.difficulty}</Text>
          <Text variant="caption">·</Text>
          <Text variant="caption">{article.readingTime}</Text>
        </div>
        {/* `as="h3"` keeps correct document heading order (this card follows
            the featured guide's h2) while `variant="h5"` keeps the smaller
            visual size a grid card needs — same pattern as Proof Engine's
            ProjectCard. */}
        <Heading variant="h5" as="h3" className="mt-2">
          <Link
            href={`/knowledge/${article.slug}`}
            onClick={() => onSelect?.(article.slug)}
            className="hover:text-accent transition-colors"
          >
            {article.title}
          </Link>
        </Heading>
      </Card.Header>

      <Card.Content className="flex flex-1 flex-col gap-3">
        <Text variant="body">{article.summary}</Text>

        {showAiSummary && (
          <div className="border-accent/30 bg-accent/5 rounded-lg border p-3">
            <p className="text-accent mb-1 flex items-center gap-1.5 text-xs font-medium">
              <Icon icon={Sparkles} size="xs" />
              Byld&apos;s summary
            </p>
            <Text variant="caption">{article.aiSummary}</Text>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="mt-auto self-start"
          onClick={() => {
            const next = !showAiSummary;
            setShowAiSummary(next);
            if (next) onExpandAiSummary?.(article.slug);
          }}
        >
          {showAiSummary ? "Hide summary" : "Ask Byld to summarize"}
        </Button>
      </Card.Content>
    </Card>
  );
}
