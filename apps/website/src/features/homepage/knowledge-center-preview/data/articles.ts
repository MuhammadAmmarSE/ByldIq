export interface KnowledgeArticle {
  slug: string;
  title: string;
  category: string;
  type: "guide" | "comparison" | "playbook";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readingTime: string;
  summary: string;
  /** A short AI-style summary shown when "Ask Byld" is expanded — pre-written, not live-generated (see docs). */
  aiSummary: string;
  featured?: boolean;
}

/**
 * CLAUDE.md Part 18's Knowledge Center, previewed with local typed
 * articles rather than a real CMS/MDX content model — that's deferred to
 * a future Knowledge Center milestone (see `content-collections.ts`'s own
 * deferred-content note).
 */
export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    slug: "monolith-vs-microservices",
    title: "Monolith vs. Microservices: Choosing the Right Architecture",
    category: "Architecture",
    type: "comparison",
    difficulty: "Intermediate",
    readingTime: "9 min read",
    summary:
      "Microservices solve a scaling problem most early products don't have yet. Here's how to tell which one you actually need.",
    aiSummary:
      "Start with a monolith unless you already have the team size and operational maturity to run distributed services — the article argues most 'microservices' rewrites are solving an organizational problem, not a technical one.",
    featured: true,
  },
  {
    slug: "validating-an-mvp",
    title: "How to Validate an MVP Before Writing Code",
    category: "Product Strategy",
    type: "guide",
    difficulty: "Beginner",
    readingTime: "6 min read",
    summary:
      "The cheapest way to test a product idea rarely involves an engineer. A practical framework for validating demand first.",
    aiSummary:
      "Validate demand with landing pages, concierge tests, or manual processes before committing engineering time — the article's core argument is that most MVPs fail from being un-validated, not under-built.",
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs Fine-Tuning: A Practical Comparison",
    category: "Artificial Intelligence",
    type: "comparison",
    difficulty: "Intermediate",
    readingTime: "8 min read",
    summary:
      "Two very different ways to make an AI product 'know' your data — and why most teams should start with the cheaper one.",
    aiSummary:
      "RAG is faster to iterate on and keeps your knowledge current without retraining; fine-tuning is better suited to a fixed style or task. The article recommends RAG as the default starting point.",
  },
  {
    slug: "accessibility-checklist-for-product-teams",
    title: "A Practical Accessibility Checklist for Product Teams",
    category: "Accessibility",
    type: "playbook",
    difficulty: "Beginner",
    readingTime: "7 min read",
    summary:
      "Accessibility is cheapest when it's built in from the start. A checklist product teams can actually use before shipping.",
    aiSummary:
      "The checklist covers keyboard navigation, color contrast, semantic HTML, and screen-reader testing — framed as a pre-launch gate, not a post-launch audit.",
  },
  {
    slug: "why-shopify-plus-for-high-growth-commerce",
    title: "Why We Choose Shopify Plus for High-Growth Commerce",
    category: "Commerce",
    type: "guide",
    difficulty: "Intermediate",
    readingTime: "7 min read",
    summary:
      "Shopify Plus isn't the right fit for every commerce product — here's the decision framework we actually use.",
    aiSummary:
      "Shopify Plus wins when checkout reliability and time-to-market matter more than pixel-level storefront customization; the article outlines when a fully custom stack is worth the added cost instead.",
  },
];
