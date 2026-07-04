import type { FictionalCompany } from "@/features/homepage/shared";

import type { CaseStudy } from "./data/case-study.schema";

export interface ProjectCardProps {
  caseStudy: CaseStudy;
  company: FictionalCompany;
  onSelect?: (slug: string) => void;
  className?: string;
}
