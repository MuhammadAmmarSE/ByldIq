import type { FictionalCompany } from "@/features/homepage/shared";

import type { CaseStudy } from "./data/case-study.schema";

export interface ProjectGridProps {
  caseStudies: CaseStudy[];
  companiesById: Map<string, FictionalCompany>;
  onSelect?: (slug: string) => void;
  className?: string;
}
