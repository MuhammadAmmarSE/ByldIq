export interface FinalCtaOption {
  id: "idea" | "guidance" | "work" | "learn";
  prompt: string;
  action: string;
  href: string;
}

/** CLAUDE.md Milestone 13 §22's exact four options — a flat menu, not a personalized recommendation like the homepage's `DecisionCards`. */
export const FINAL_CTA_OPTIONS: FinalCtaOption[] = [
  {
    id: "idea",
    prompt: "I have an idea",
    action: "Start BuildPath",
    href: "/buildpath",
  },
  {
    id: "guidance",
    prompt: "I need technical guidance",
    action: "Ask Byld",
    href: "",
  },
  {
    id: "work",
    prompt: "I want to see your work",
    action: "Explore Work",
    href: "/work",
  },
  {
    id: "learn",
    prompt: "I want to learn",
    action: "Knowledge Center",
    href: "/knowledge",
  },
];
