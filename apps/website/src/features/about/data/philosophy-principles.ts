import {
  CalendarClock,
  Cpu,
  Eye,
  Minimize2,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface PhilosophyPrinciple {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * CLAUDE.md Milestone 13 §3's six core principles — each description is a
 * paraphrase of CLAUDE.md's own already-established beliefs (Part 1's
 * Core Principles/Beliefs, Part 3's Product Philosophy), not new claims
 * invented for this page.
 */
export const PHILOSOPHY_PRINCIPLES: PhilosophyPrinciple[] = [
  {
    id: "product-before-technology",
    icon: Target,
    title: "Product Before Technology",
    description:
      "The first deliverable is never code — it's understanding. We research, question, and validate the problem before a single technology decision gets made.",
  },
  {
    id: "outcomes-before-features",
    icon: TrendingUp,
    title: "Outcomes Before Features",
    description:
      "We don't measure success by pages shipped or features built. We measure it by the business problem it solved and the value it created.",
  },
  {
    id: "engineering-with-intent",
    icon: Cpu,
    title: "Engineering With Intent",
    description:
      "Every technical decision should have a reason someone can explain. Great engineering is usually invisible — it just quietly works.",
  },
  {
    id: "simplicity-before-complexity",
    icon: Minimize2,
    title: "Simplicity Before Complexity",
    description:
      "Complexity is never celebrated. We don't introduce it without a measurable benefit, and every iteration looks for what can be removed.",
  },
  {
    id: "transparency",
    icon: Eye,
    title: "Transparency",
    description:
      "We explain decisions, constraints, risks, and trade-offs honestly — including the ones that are inconvenient to say out loud.",
  },
  {
    id: "long-term-thinking",
    icon: CalendarClock,
    title: "Long-Term Thinking",
    description:
      "We optimize for the next five years, not the next five weeks — systems that can evolve after launch, not just survive it.",
  },
];
