export interface WorkFilterOption {
  slug: string;
  label: string;
}

export interface WorkFilterBarProps {
  industries: WorkFilterOption[];
  industryFilter: string | null;
  onIndustryFilterChange: (value: string | null) => void;

  technologies: WorkFilterOption[];
  technologyFilter: string | null;
  onTechnologyFilterChange: (value: string | null) => void;

  businessProblems: WorkFilterOption[];
  businessProblemFilter: string | null;
  onBusinessProblemFilterChange: (value: string | null) => void;

  aiOnly: boolean;
  onAiOnlyChange: (value: boolean) => void;

  className?: string;
}
