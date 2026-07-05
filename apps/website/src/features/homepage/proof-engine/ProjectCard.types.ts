import type { CaseStudy, FictionalCompany } from "@/features/case-studies";

export interface ProjectCardProps {
  caseStudy: CaseStudy;
  company: FictionalCompany;
  onSelect?: (slug: string) => void;
  className?: string;
}
