import type { FictionalCompany } from "@/features/homepage/shared";

import type { CaseStudy } from "./data/case-study.schema";

export interface FeaturedProjectStoryProps {
  caseStudy: CaseStudy;
  company: FictionalCompany;
  className?: string;
}
