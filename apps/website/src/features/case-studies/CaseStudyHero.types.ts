import type { CaseStudy } from "./data/case-study.schema";
import type { FictionalCompany } from "./data/fictional-companies";

export interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
  company: FictionalCompany;
  className?: string;
}
