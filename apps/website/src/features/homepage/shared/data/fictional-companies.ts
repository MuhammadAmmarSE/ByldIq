import type { Journey } from "@/types/journey";

export interface FictionalCompany {
  id: string;
  name: string;
  journey: Journey;
  industry: string;
}

/**
 * A single roster of fictional companies reused across the Proof Engine
 * (Phase 5 case studies) and the Interactive Product Showcase (Phase 6
 * pods) — CLAUDE.md Part 14 explicitly calls for "realistic fictional
 * companies" instead of Lorem Ipsum; sharing one roster means the same
 * company can appear consistently in both a case study and a live demo
 * pod rather than each section inventing its own.
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
