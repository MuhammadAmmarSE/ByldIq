import type { Journey } from "@/types/journey";

export interface FictionalCompany {
  id: string;
  name: string;
  journey: Journey;
  industry: string;
}

/**
 * A single roster of fictional companies (CLAUDE.md Part 14: "realistic
 * fictional companies" instead of Lorem Ipsum) — Byld IQ has no real
 * client history yet. Owned here (not by a homepage module) since case
 * studies are now a first-class platform (Milestone 5) consumed by the
 * homepage's Proof Engine, the Solutions Platform, and `/work`, not the
 * other way around.
 */
export const FICTIONAL_COMPANIES: FictionalCompany[] = [
  { id: "fieldnote", name: "Fieldnote", journey: "startup", industry: "Field Services" },
  { id: "atlas-logistics", name: "Atlas Logistics", journey: "enterprise", industry: "Logistics" },
  { id: "nova-commerce", name: "Nova Commerce", journey: "commerce", industry: "Retail" },
  { id: "northwind-ai", name: "Northwind AI", journey: "ai", industry: "Artificial Intelligence" },
  {
    id: "harborline-cloud",
    name: "Harborline Cloud",
    journey: "platform",
    industry: "Developer Tools",
  },
  { id: "acme-health", name: "Acme Health", journey: "enterprise", industry: "Healthcare" },
];
