import type { CaseStudy, FictionalCompany } from "@/features/case-studies";

export interface FeaturedProjectStoryProps {
  caseStudy: CaseStudy;
  company: FictionalCompany;
  className?: string;
}
