/** Social Proof section analytics events (Milestone 9). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    social_proof_company_clicked: { companyId: string };
  }
}

export {};
