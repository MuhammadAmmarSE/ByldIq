import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { POPULATED_CATEGORIES, TechnologyExplorer } from "@/features/technology";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface CategoryTechnologyPageProps {
  params: Promise<{ category: string }>;
}

/** Pre-renders every populated category at build time — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return POPULATED_CATEGORIES.map((category) => ({ category: category.slug }));
}

function getCategory(slug: string) {
  return POPULATED_CATEGORIES.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: CategoryTechnologyPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  const title = `${category.label} technology decisions`;
  const description = `Technology decisions in ${category.label} — strengths, weaknesses, and trade-offs, explained.`;

  return {
    title,
    description,
    alternates: { canonical: `/technology/category/${category.slug}` },
    openGraph: {
      title,
      description,
      url: `/technology/category/${category.slug}`,
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
 * CLAUDE.md Part 22's `/technology/category/[category]` required route:
 * reuses `TechnologyExplorer` pre-seeded with this category's filter —
 * one component, every category, the same pattern as
 * `/work/technology/[technology]`. Only categories with at least one real
 * technology are pre-rendered (`POPULATED_CATEGORIES`) — see
 * `data/categories.ts` for why the full 20-category taxonomy doesn't all
 * get routes yet.
 */
export default async function CategoryTechnologyPage({ params }: CategoryTechnologyPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  return (
    <Container size="wide" className="py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Technology", url: `${siteConfig.url}/technology` },
            {
              name: category.label,
              url: `${siteConfig.url}/technology/category/${category.slug}`,
            },
          ]),
        )}
      />
      <TechnologyExplorer
        initialCategoryFilter={category.slug}
        headline={`${category.label} technology decisions.`}
        supportingCopy={`Technologies in ${category.label} — search or filter further to explore the rest of the library.`}
      />
    </Container>
  );
}
