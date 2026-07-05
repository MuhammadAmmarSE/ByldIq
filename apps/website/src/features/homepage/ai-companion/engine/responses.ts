import type { Journey } from "@/types/journey";

export interface AiResponse {
  content: string;
  quickReplies: string[];
}

export type AiIntent =
  | "startup"
  | "enterprise"
  | "commerce"
  | "ai"
  | "platform"
  | "compare"
  | "buildpath"
  | "pricing"
  | "fallback";

/**
 * A rule-based response engine, not a live LLM (see docs — this repo has
 * no backend to call one). Canned, journey-aware copy keyed by intent,
 * matched from the visitor's message via keyword rules in `intents.ts`.
 * CLAUDE.md Part 16: "Explain reasoning... Never simply answer. Teach."
 */
export const GREETINGS: Record<Journey | "default", AiResponse> = {
  default: {
    content:
      "Hi, I'm Byld. I'm here if you'd like help exploring ideas, understanding technologies, or planning your product. No pressure.",
    quickReplies: ["I'm building a startup", "I need to modernize a system", "I want to use AI"],
  },
  startup: {
    content:
      "Looks like you're exploring startup product development. Would you like help thinking through your MVP scope?",
    quickReplies: [
      "What should my MVP include?",
      "How long does an MVP take?",
      "Compare technologies",
    ],
  },
  enterprise: {
    content:
      "Looks like you're exploring enterprise modernization. Want to talk through architecture, or security and compliance first?",
    quickReplies: [
      "How do you modernize without downtime?",
      "What about security?",
      "Compare technologies",
    ],
  },
  commerce: {
    content:
      "Looks like you're exploring commerce. Want to talk about checkout performance, or Shopify Plus specifically?",
    quickReplies: ["Why Shopify Plus?", "How do you improve conversion?", "Compare technologies"],
  },
  ai: {
    content:
      "Looks like you're exploring AI product ideas. Want to compare a few approaches — agents, RAG, or simple automation?",
    quickReplies: ["RAG vs fine-tuning?", "What's an AI agent?", "Compare technologies"],
  },
  platform: {
    content:
      "Looks like you're exploring platform engineering. Want to talk through infrastructure, or developer experience?",
    quickReplies: [
      "How do you design for scale?",
      "What about developer experience?",
      "Compare technologies",
    ],
  },
};

export const RESPONSES: Record<AiIntent, AiResponse> = {
  startup: {
    content:
      "A strong MVP scopes to the two or three workflows that prove your core hypothesis — not every feature on your wishlist. We'd start by identifying what investors or early users actually need to see.",
    quickReplies: ["How long does that take?", "What would BuildPath tell me?"],
  },
  enterprise: {
    content:
      "Modernizing without downtime usually means an incremental approach — a strangler-fig pattern that migrates one workflow at a time behind the existing system, rather than a risky big-bang rewrite.",
    quickReplies: ["What about security?", "Compare technologies"],
  },
  commerce: {
    content:
      "Shopify Plus gives you a proven checkout and payments foundation, while a custom storefront (like Hydrogen) gives you control over performance and design. The right mix depends on how custom your experience needs to be.",
    quickReplies: ["What would BuildPath tell me?"],
  },
  ai: {
    content:
      "RAG (retrieval-augmented generation) grounds an AI's answers in your own content — good when your knowledge changes often. Fine-tuning bakes behavior into the model itself — better for a fixed style or task. Most products start with RAG because it's faster to iterate on.",
    quickReplies: ["What's an AI agent?", "What would BuildPath tell me?"],
  },
  platform: {
    content:
      "Designing for scale early usually costs more than it saves — we design for the traffic and team size you'll actually reach in the next phase, not a hypothetical future.",
    quickReplies: ["What about developer experience?", "Compare technologies"],
  },
  compare: {
    content:
      "Technology choices are trade-offs, not a single 'best' answer. For example: Next.js gives you server rendering and strong SEO out of the box, at the cost of a few more concepts to learn than a plain single-page app. What are you comparing?",
    quickReplies: ["What would BuildPath tell me?"],
  },
  buildpath: {
    content:
      "BuildPath can turn this conversation into a full roadmap — technology recommendations, a phased plan, and the risks worth planning for — in about three minutes.",
    quickReplies: ["Start BuildPath"],
  },
  pricing: {
    content:
      "We don't quote a price without understanding the product first — budget shapes scope, not the other way around. BuildPath will give you a realistic investment range based on what you're building.",
    quickReplies: ["Start BuildPath"],
  },
  fallback: {
    content:
      "I might not have a canned answer for that yet, but I can help you think through your product, compare technologies, or start a roadmap in BuildPath.",
    quickReplies: ["Compare technologies", "Start BuildPath"],
  },
};

/**
 * A greeting for a specific page (currently: solution pages) — more
 * specific than the five journey greetings above without fabricating
 * bespoke copy for every page CLAUDE.md's content model could ever add.
 * CLAUDE.md Part 20: "AI automatically changes context... Visitors never
 * repeat themselves."
 */
export function getPageContextGreeting(label: string): AiResponse {
  return {
    content: `Looks like you're exploring ${label}. Want help thinking through the approach, or would a personalized roadmap from BuildPath be more useful?`,
    quickReplies: ["What's a typical roadmap?", "Compare technologies", "Start BuildPath"],
  };
}
