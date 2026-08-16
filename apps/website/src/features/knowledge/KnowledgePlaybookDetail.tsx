"use client";

import { useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAppStore } from "@/providers/StoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { buildKnowledgeArticleGroundedReplies } from "./groundedReplies";
import { KnowledgeBookmarkButton } from "./KnowledgeBookmarkButton";
import type { KnowledgePlaybookDetailProps } from "./KnowledgePlaybookDetail.types";

/**
 * CLAUDE.md Part 18/19's Playbooks: "Steps, Explanations, Checklists,
 * Resources, Export" — a dedicated, action-oriented view of a
 * playbook-typed article's `playbook` field, distinct from the full
 * educational template at `/knowledge/[slug]` (which the same article
 * still renders — see `KnowledgePlaybooks.docs.md`). Checklist state
 * persists via the app store's `checkedPlaybookItemIds`, the same
 * pattern as bookmarks and learning-path completion.
 *
 * "Export" is the browser's own print dialog (which can already save as
 * PDF) rather than a bespoke PDF pipeline — the same honest choice
 * BuildPath's `/buildpath/print` makes.
 */
export function KnowledgePlaybookDetail({
  article,
  categoryLabel,
  className,
}: KnowledgePlaybookDetailProps) {
  const { playbook } = article;
  const analytics = useAnalytics();
  const { setPageContext } = useAiCompanion();
  const checkedItemIds = useAppStore((state) => state.checkedPlaybookItemIds);
  const toggleChecklistItem = useAppStore((state) => state.toggleChecklistItem);

  useEffect(() => {
    analytics.track("knowledge_playbook_started", { slug: article.slug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.slug]);

  useEffect(() => {
    setPageContext({
      label: article.title,
      slug: article.slug,
      groundedReplies: buildKnowledgeArticleGroundedReplies(article),
    });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.slug, article.title]);

  if (!playbook) return null;

  const totalItems = playbook.steps.reduce((sum, step) => sum + step.checklistItems.length, 0);
  const checkedCount = playbook.steps.reduce(
    (sum, step) =>
      sum +
      step.checklistItems.filter((_, index) =>
        checkedItemIds.includes(`${article.slug}:${step.id}:${index}`),
      ).length,
    0,
  );

  function handleToggle(itemId: string) {
    const nowChecked = !checkedItemIds.includes(itemId);
    toggleChecklistItem(itemId);
    analytics.track("knowledge_playbook_item_toggled", {
      slug: article.slug,
      itemId,
      checked: nowChecked,
    });
  }

  function handlePrint() {
    analytics.track("knowledge_cta_selected", { slug: article.slug, cta: "print-playbook" });
    window.print();
  }

  return (
    <div className={cn("space-y-10", className)}>
      <div className="print:hidden">
        <Breadcrumb
          items={[
            { label: "Knowledge", href: "/knowledge" },
            { label: "Playbooks", href: "/knowledge/playbooks" },
            { label: article.title },
          ]}
        />
      </div>

      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {categoryLabel ? <Badge variant="neutral">{categoryLabel}</Badge> : null}
          <Badge variant="outline">{article.difficulty}</Badge>
          <Badge variant="outline">{article.readingTime}</Badge>
        </div>

        <Heading variant="display">{article.title}</Heading>
        <Text variant="subtitle">{article.summary}</Text>
        <Text variant="caption">
          {checkedCount} of {totalItems} checked
        </Text>

        <div className="flex flex-wrap items-center gap-3 pt-2 print:hidden">
          <Button asChild variant="outline">
            <Link href={`/knowledge/${article.slug}`}>Read the full guide</Link>
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            Print or save as PDF
          </Button>
          <KnowledgeBookmarkButton slug={article.slug} />
        </div>
      </div>

      <div className="max-w-3xl space-y-8">
        {playbook.steps.map((step) => (
          <div key={step.id} className="space-y-3">
            <Heading variant="h4" as="h2">
              {step.title}
            </Heading>
            <Text variant="body">{step.explanation}</Text>
            <ul className="space-y-2">
              {step.checklistItems.map((item, index) => {
                const itemId = `${article.slug}:${step.id}:${index}`;
                const checked = checkedItemIds.includes(itemId);
                return (
                  <li key={itemId}>
                    <button
                      type="button"
                      className="flex w-full items-start gap-2.5 text-left"
                      aria-pressed={checked}
                      onClick={() => handleToggle(itemId)}
                    >
                      <Icon
                        icon={checked ? CheckCircle2 : Circle}
                        size="sm"
                        className={cn("mt-0.5 shrink-0", checked ? "text-success" : "text-muted")}
                      />
                      <Text
                        variant="body"
                        className={checked ? "text-muted line-through" : undefined}
                      >
                        {item}
                      </Text>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {playbook.resources.length > 0 && (
        <div className="max-w-3xl space-y-3 print:hidden">
          <Heading variant="h4" as="h2">
            Resources
          </Heading>
          <ul className="space-y-1.5">
            {playbook.resources.map((resource) => (
              <li key={resource.href}>
                <Link href={resource.href} className="text-accent hover:underline">
                  {resource.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
