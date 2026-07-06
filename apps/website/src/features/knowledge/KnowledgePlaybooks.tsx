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
 * CLAUDE.md Part 18's Playbooks entry point (`/knowledge/playbooks`).
 * Filters the same article dataset to `type: "playbook"` rather than
 * introducing a separate playbook content model — a playbook is an
 * article, distinguished only by its `type`, the same way `KnowledgeGrid`
 * already renders every article regardless of type.
 *
 * Only one article (`accessibility-checklist-for-product-teams`) is
 * tagged `"playbook"` today. Rather than hide that behind a vague count,
 * or fabricate more playbooks to make the page feel fuller, the page
 * says so plainly — CLAUDE.md's content strategy never fabricates volume.
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
        onSelect={handleSelect}
      />
    </div>
  );
}
