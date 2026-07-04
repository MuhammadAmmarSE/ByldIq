import {
  BrainCircuit,
  Building2,
  Layers,
  Rocket,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import type { Journey } from "@/types/journey";

export interface JourneyDefinition {
  id: Journey;
  icon: LucideIcon;
  title: string;
  /** One sentence, per CLAUDE.md Part 10's card layout ("minimal text"). */
  description: string;
  /** Short example goals/products shown as chips — not exhaustive, just orienting. */
  examples: string[];
}

export const JOURNEY_DEFINITIONS: JourneyDefinition[] = [
  {
    id: "startup",
    icon: Rocket,
    title: "Startup",
    description: "Validate ideas, build MVPs, and prepare for scale.",
    examples: ["MVPs", "Fundraising", "Growth"],
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise",
    description: "Modernize existing systems and scale securely.",
    examples: ["Modernization", "Security", "Compliance"],
  },
  {
    id: "commerce",
    icon: ShoppingBag,
    title: "Commerce",
    description: "Grow digital commerce and optimize conversions.",
    examples: ["Shopify", "Checkout", "Automation"],
  },
  {
    id: "ai",
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    description: "Build AI-powered products and intelligent workflows.",
    examples: ["Agents", "RAG", "Automation"],
  },
  {
    id: "platform",
    icon: Layers,
    title: "Platform",
    description: "Engineer developer platforms and cloud infrastructure.",
    examples: ["APIs", "Dashboards", "Cloud"],
  },
];
