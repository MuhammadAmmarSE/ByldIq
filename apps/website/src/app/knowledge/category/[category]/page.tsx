import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { KnowledgeExplorer, POPULATED_CATEGORIES } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface CategoryKnowledgePageProps {
  params: Promise<{ category: string }>;
}

/** Pre-renders every populated category at build time — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return POPULATED_CATEGORIES.map((category) => ({ category: category.slug }));
}

function getCategory(slug: string) {
  return POPULATED_CATEGORIES.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: CategoryKnowledgePageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  const title = `${category.label} guides`;
  const description = `Practical ${category.label} guides — an engineering learning platform, not a blog.`;

  return {
    title,
    description,
    alternates: { canonical: `/knowledge/category/${category.slug}` },
    openGraph: {
      title,
      description,
      url: `/knowledge/category/${category.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * CLAUDE.md Part 18's `/knowledge/category/[category]` route: reuses
 * `KnowledgeExplorer` pre-seeded with this category's filter — one
 * component, every category, the same pattern as
 * `/technology/category/[category]`. Only categories with at least one
 * real article are pre-rendered (`POPULATED_CATEGORIES`) — see
 * `data/categories.ts` for why the full 20-category taxonomy doesn't all
 * get routes yet.
 */
export default async function CategoryKnowledgePage({ params }: CategoryKnowledgePageProps) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  return (
    <Container size="wide" className="py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            {
              name: category.label,
              url: `${siteConfig.url}/knowledge/category/${category.slug}`,
            },
          ]),
        )}
      />
      <KnowledgeExplorer
        initialCategoryFilter={category.slug}
        headline={`${category.label} guides.`}
        supportingCopy={`Articles in ${category.label} — search or filter further to explore the rest of the Knowledge Center.`}
      />
    </Container>
  );
}
