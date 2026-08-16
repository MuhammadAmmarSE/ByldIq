import type { AiGroundedReply } from "@/store/ai-companion-store";
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

/** How many `groundedReplies` questions show as quick-reply chips in the greeting — a chat UI with every technology's "Why X?" as its own chip stops being scannable. `getGroundedAnswer` still matches the full array regardless of this cap. */
const MAX_GROUNDED_QUICK_REPLIES = 4;

/**
 * A greeting for a specific page (solution, case study, technology
 * pages) — more specific than the five journey greetings above without
 * fabricating bespoke copy for every page CLAUDE.md's content model could
 * ever add. CLAUDE.md Part 20: "AI automatically changes context...
 * Visitors never repeat themselves."
 *
 * When the page supplied real grounded Q&A (`groundedReplies` — CLAUDE.md
 * Part 21's "Ask Byld about this project"), its first few questions
 * become the quick replies instead of the generic three, so a visitor on
 * a case study page is offered real, answerable questions about that
 * specific project rather than a roadmap prompt that ignores it.
 *
 * `currentSectionLabel` (CLAUDE.md Part 16/18: Byld should know
 * "current section" in addition to "current article") only changes the
 * opening clause — a visitor scrolled deep into an article gets "you're
 * reading {label}, currently on {section}" instead of a greeting that
 * reads as if they'd just arrived.
 */
export function getPageContextGreeting(
  label: string,
  groundedReplies?: AiGroundedReply[],
  currentSectionLabel?: string,
): AiResponse {
  const opening = currentSectionLabel
    ? `Looks like you're reading ${label}, currently on "${currentSectionLabel}."`
    : `Looks like you're exploring ${label}.`;

  return {
    content: `${opening} Want help thinking through the approach, or would a personalized roadmap from BuildPath be more useful?`,
    quickReplies: groundedReplies?.length
      ? groundedReplies.slice(0, MAX_GROUNDED_QUICK_REPLIES).map((reply) => reply.question)
      : ["What's a typical roadmap?", "Compare technologies", "Start BuildPath"],
  };
}

/**
 * Answers a message directly from a page's real, structured content
 * (CLAUDE.md Part 21: "Ask Byld about this project... Byld: Explains
 * based on the structured project knowledge") — checked before generic
 * keyword `matchIntent`/`RESPONSES`, since no keyword rule could derive a
 * page-specific answer on its own. Matches on exact question text
 * (case/whitespace-insensitive) since grounded questions only ever reach
 * `sendMessage` as quick-reply clicks, never freely typed — see
 * `useAiCompanion.sendMessage`. Returns `null` when there's no match, so
 * the caller falls through to the generic engine instead of a silent
 * non-answer.
 */
export function getGroundedAnswer(
  groundedReplies: AiGroundedReply[] | undefined,
  message: string,
): AiResponse | null {
  if (!groundedReplies) return null;

  const normalized = message.trim().toLowerCase();
  const match = groundedReplies.find((reply) => reply.question.trim().toLowerCase() === normalized);
  if (!match) return null;

  return {
    content: match.answer,
    quickReplies: ["Start BuildPath"],
  };
}

/**
 * Human-readable labels for the homepage sections specific enough to
 * reference in a greeting via `getPageContextGreeting` — deliberately not
 * every section (`AiCompanionState.currentSection`'s full id list),
 * since something like "Looks like you're exploring journey selection"
 * wouldn't read naturally the way "Looks like you're exploring what we
 * build" does. Used only when no more specific `pageContext` is set.
 */
export const SECTION_LABELS: Record<string, string> = {
  "what-we-build": "what we build",
  "technology-ecosystem": "our technology choices",
  "product-thinking": "how we approach product engineering",
  "proof-engine": "our past work",
  "social-proof": "client outcomes",
  "engineering-excellence": "our engineering process",
  "knowledge-center": "the Knowledge Center",
};

/**
 * A fallback reply that references the most recently viewed page instead
 * of the generic `RESPONSES.fallback`, when one is available — CLAUDE.md
 * Part 16: "recently-viewed content" as part of what Byld should
 * understand. Falls back to the static response when there's nothing to
 * reference yet (e.g. the very first message of a session).
 */
export function getContextualFallback(recentlyViewed: { label: string }[]): AiResponse {
  const [mostRecent] = recentlyViewed;
  if (!mostRecent) return RESPONSES.fallback;

  return {
    content: `I might not have a canned answer for that yet, but since you were just looking at ${mostRecent.label}, I can help you compare technologies, start a roadmap in BuildPath, or dig deeper into that.`,
    quickReplies: ["Compare technologies", "Start BuildPath"],
  };
}
