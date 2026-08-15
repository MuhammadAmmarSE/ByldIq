import type { CaseStudy } from "./data/case-study.schema";

export interface CaseStudyBusinessContextProps {
  caseStudy: CaseStudy;
  className?: string;
}
