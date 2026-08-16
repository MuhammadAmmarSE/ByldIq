"use client";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { CATEGORIES_BY_SLUG } from "./data/facets";
import { KnowledgeGrid } from "./KnowledgeGrid";
import type { KnowledgePlaybooksProps } from "./KnowledgePlaybooks.types";

const PLAYBOOKS = KNOWLEDGE_ARTICLES.filter((article) => article.type === "playbook");

/**
 * CLAUDE.md Part 18/19's Playbooks entry point (`/knowledge/playbooks`).
 * Filters the same article dataset to `type: "playbook"` rather than
 * introducing a separate playbook content model — a playbook is an
 * article, distinguished only by its `type` and an optional `playbook`
 * field (steps/checklist/resources), the same way `KnowledgeGrid` already
 * renders every article regardless of type. Cards link straight to the
 * dedicated checklist view (`hrefBase="/knowledge/playbooks"`) rather
 * than the full educational article — the actionable format the spec
 * asks a playbook to be, not a second listing of the same prose.
 *
 * The count in the intro copy is real, not padded — CLAUDE.md's content
 * strategy never fabricates volume to make a collection look busier than
 * it is.
 */
export function KnowledgePlaybooks({ className }: KnowledgePlaybooksProps) {
  const analytics = useAnalytics();

  function handleSelect(slug: string) {
    analytics.track("knowledge_card_clicked", { slug });
  }

  return (
    <div className={cn("space-y-6", className)} aria-labelledby="knowledge-playbooks-heading">
      <Heading variant="h3" as="h2" id="knowledge-playbooks-heading">
        All playbooks
      </Heading>
      <Text variant="body" className="text-muted max-w-2xl">
        {PLAYBOOKS.length === 1
          ? "One practical playbook is published so far. More are added as they're written — never padded out to look busier than the collection really is."
          : `${PLAYBOOKS.length} practical playbooks are published so far. More are added as they're written.`}
      </Text>
      <KnowledgeGrid
        articles={PLAYBOOKS}
        categoriesBySlug={CATEGORIES_BY_SLUG}
        hrefBase="/knowledge/playbooks"
        onSelect={handleSelect}
      />
    </div>
  );
}
