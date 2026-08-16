import type { IntegrationCategory } from "../types";

export const INTEGRATION_LABELS: Record<IntegrationCategory, string> = {
  payments: "Payments",
  crm: "CRM",
  email: "Email",
  analytics: "Analytics",
  authentication: "Authentication",
  commerce: "Commerce platform",
  storage: "File storage",
  search: "Search",
  communication: "Communication (chat/SMS)",
  "external-apis": "External APIs",
};
