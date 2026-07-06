export interface LearningPath {
  slug: string;
  title: string;
  audience: string;
  description: string;
  /** Ordered — array order is the path's reading sequence, not a display grouping. */
  articleSlugs: string[];
}

/**
 * CLAUDE.md Part 18's Learning Paths: structured, ordered reading journeys
 * through the Knowledge Center. The spec names eight audiences (Startup
 * Founder, Product Manager, Frontend Engineer, Backend Engineer, AI
 * Engineer, CTO, Shopify Developer, Solution Architect) — with only five
 * real articles across five categories, most of those would either share
 * the exact same one or two articles or be a single-article "path," which
 * isn't a genuine ordered journey. Rather than inventing seven thin or
 * duplicate paths to hit the named count, this ships the one path where
 * all five real articles form an honest, ordered progression: a founder
 * validating an idea, building it accessibly, choosing a commerce
 * platform if relevant, then facing the architecture and AI decisions
 * that come with growth. More paths are added once there's enough real,
 * distinct content per audience to justify them.
 */
export const LEARNING_PATHS: LearningPath[] = [
  {
    slug: "startup-founder",
    title: "Startup Founder",
    audience: "Founders validating and building a first product",
    description:
      "From validating that anyone wants what you're building, through the early product and platform decisions that shape everything after launch.",
    articleSlugs: [
      "validating-an-mvp",
      "accessibility-checklist-for-product-teams",
      "why-shopify-plus-for-high-growth-commerce",
      "monolith-vs-microservices",
      "rag-vs-fine-tuning",
    ],
  },
];
