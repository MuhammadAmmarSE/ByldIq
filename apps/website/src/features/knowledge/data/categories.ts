export interface KnowledgeCategory {
  slug: string;
  label: string;
}

/**
 * The full category taxonomy named in CLAUDE.md Part 18 / Milestone 7
 * ("Product Strategy, MVP, UX, UI, Design Systems, Frontend, Backend, AI,
 * Architecture, Cloud, DevOps, Shopify, Performance, Accessibility,
 * Security, Testing, Analytics, Product Management, Engineering
 * Leadership, Engineering Culture ... Expandable"). Declared in full so
 * every future article already has a home to slot into — but only
 * categories with at least one real `KNOWLEDGE_ARTICLES` entry get a
 * `/knowledge/category/[category]` page or appear in the landing page's
 * category grid, the same pattern as the Technology Explorer's
 * `TECHNOLOGY_CATEGORIES`/`POPULATED_CATEGORIES` split (CLAUDE.md Part 8:
 * no dead ends).
 */
export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  { slug: "product-strategy", label: "Product Strategy" },
  { slug: "mvp", label: "MVP" },
  { slug: "ux", label: "UX" },
  { slug: "ui", label: "UI" },
  { slug: "design-systems", label: "Design Systems" },
  { slug: "frontend", label: "Frontend" },
  { slug: "backend", label: "Backend" },
  { slug: "ai", label: "AI" },
  { slug: "architecture", label: "Architecture" },
  { slug: "cloud", label: "Cloud" },
  { slug: "devops", label: "DevOps" },
  { slug: "shopify", label: "Shopify" },
  { slug: "performance", label: "Performance" },
  { slug: "accessibility", label: "Accessibility" },
  { slug: "security", label: "Security" },
  { slug: "testing", label: "Testing" },
  { slug: "analytics", label: "Analytics" },
  { slug: "product-management", label: "Product Management" },
  { slug: "engineering-leadership", label: "Engineering Leadership" },
  { slug: "engineering-culture", label: "Engineering Culture" },
];
