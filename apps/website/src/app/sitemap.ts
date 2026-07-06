import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { BUSINESS_PROBLEMS, CASE_STUDIES, INDUSTRIES, TECHNOLOGIES } from "@/features/case-studies";
import { KNOWLEDGE_ARTICLES } from "@/features/homepage/knowledge-center-preview";
import { SOLUTIONS } from "@/features/solutions";
import { POPULATED_CATEGORIES, TECHNOLOGIES as TECHNOLOGY_PROFILES } from "@/features/technology";

/**
 * Grows as real routes land. Only routes with real, crawlable content are
 * listed — inventing entries for pages that don't exist yet would just
 * produce 404s in search results. `/buildpath` and `/knowledge` are
 * included as real teaser/index pages; the full BuildPath and Knowledge
 * Center platforms are future milestones, not new routes. `/work/search`
 * and `/technology/search` are deliberately excluded — a query-driven
 * results page has no single canonical piece of content worth indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/buildpath`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/knowledge`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...CASE_STUDIES.map((caseStudy): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/work/${caseStudy.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...INDUSTRIES.map((industry): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/work/industry/${industry.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    ...TECHNOLOGIES.map((technology): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/work/technology/${technology.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    ...BUSINESS_PROBLEMS.map((problem): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/work/business-problem/${problem.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    {
      url: `${siteConfig.url}/solutions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...SOLUTIONS.map((solution): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/solutions/${solution.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...KNOWLEDGE_ARTICLES.map((article): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/knowledge/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    {
      url: `${siteConfig.url}/technology`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...TECHNOLOGY_PROFILES.map((technology): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/technology/${technology.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...POPULATED_CATEGORIES.map((category): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/technology/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    {
      url: `${siteConfig.url}/technology/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/technology/decision-framework`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
