"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { FeaturedGuideCard } from "@/features/homepage/knowledge-center-preview";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { CATEGORIES_BY_SLUG, POPULATED_CATEGORIES } from "./data/facets";
import { KnowledgeGrid } from "./KnowledgeGrid";
import { KnowledgeHero } from "./KnowledgeHero";
import type { KnowledgeExplorerProps } from "./KnowledgeExplorer.types";

const FEATURED_ARTICLE = KNOWLEDGE_ARTICLES.find((article) => article.featured);

/**
 * The `/knowledge` landing page's full experience (CLAUDE.md Part 18):
 * hero, a featured guide, category filtering, search, and the article
 * grid — all client-side over the small, fully-loaded article dataset.
 * Reuses the Knowledge Center preview's `ArticleCard`/`FeaturedGuideCard`
 * rather than a second card implementation for the same content, the same
 * "one card, not two" precedent `WorkExplorer` follows for case studies.
 *
 * Learning Paths and Playbooks are both linked below the hero, now that
 * `/knowledge/learning-paths` and `/knowledge/playbooks` are real routes.
 *
 * The `initial*`/`headline`/`supportingCopy` props let a future
 * `/knowledge/category/[category]` and `/knowledge/search` route reuse
 * this exact component pre-seeded with a filter or query, rather than
 * building a second, thinner listing page for the same content.
 */
export function KnowledgeExplorer({
  className,
  initialQuery = "",
  initialCategoryFilter,
  headline,
  supportingCopy,
}: KnowledgeExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(
    initialCategoryFilter ?? null,
  );
  const analytics = useAnalytics();

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return KNOWLEDGE_ARTICLES.filter((article) => {
      if (categoryFilter && article.category !== categoryFilter) return false;

      if (!normalizedQuery) return true;
      const haystack =
        `${article.title} ${article.summary} ${article.problem} ${article.audience.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query, categoryFilter]);

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery);
    if (nextQuery.trim()) {
      analytics.track("knowledge_search", { query: nextQuery });
    }
  }

  function handleCategoryFilterChange(value: string | null) {
    setCategoryFilter(value);
    if (value) {
      analytics.track("knowledge_category_selected", { category: value });
    }
  }

  function handleArticleSelect(slug: string) {
    analytics.track("knowledge_card_clicked", { slug });
  }

  return (
    <div className={cn("space-y-10", className)}>
      <KnowledgeHero
        query={query}
        onQueryChange={handleQueryChange}
        categories={POPULATED_CATEGORIES}
        categoryFilter={categoryFilter}
        onCategoryQuickFilter={handleCategoryFilterChange}
        headline={headline}
        supportingCopy={supportingCopy}
      />

      <section className="space-y-4" aria-labelledby="knowledge-learning-paths-heading">
        <Heading variant="h3" as="h2" id="knowledge-learning-paths-heading">
          Prefer a guided path?
        </Heading>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/knowledge/learning-paths">Explore Learning Paths</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/knowledge/playbooks">Explore Playbooks</Link>
          </Button>
        </div>
      </section>

      {FEATURED_ARTICLE && (
        <section className="space-y-4" aria-labelledby="knowledge-featured-heading">
          <Heading variant="h3" as="h2" id="knowledge-featured-heading">
            Featured guide
          </Heading>
          <FeaturedGuideCard
            article={FEATURED_ARTICLE}
            categoryLabel={CATEGORIES_BY_SLUG.get(FEATURED_ARTICLE.category)?.label}
            onSelect={handleArticleSelect}
          />
        </section>
      )}

      <section className="space-y-4" aria-labelledby="knowledge-all-heading">
        <Heading variant="h3" as="h2" id="knowledge-all-heading">
          All articles
        </Heading>
        <KnowledgeGrid
          articles={filteredArticles}
          categoriesBySlug={CATEGORIES_BY_SLUG}
          onSelect={handleArticleSelect}
        />
      </section>
    </div>
  );
}
