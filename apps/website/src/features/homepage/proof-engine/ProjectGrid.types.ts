import type { CaseStudy, FictionalCompany } from "@/features/case-studies";

export interface ProjectGridProps {
  caseStudies: CaseStudy[];
  companiesById: Map<string, FictionalCompany>;
  onSelect?: (slug: string) => void;
  className?: string;
}
