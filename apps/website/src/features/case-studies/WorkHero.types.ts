import type { CaseStudy } from "./data/case-study.schema";

export interface WorkHeroIndustry {
  slug: string;
  label: string;
}

export interface WorkHeroProps {
  query: string;
  onQueryChange: (query: string) => void;
  industries: WorkHeroIndustry[];
  industryFilter: string | null;
  onIndustryQuickFilter: (industry: string | null) => void;
  featured?: CaseStudy;
  className?: string;
}
