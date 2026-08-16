import {
  BookOpen,
  Bot,
  Hammer,
  MessageSquare,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface CultureValue {
  id: string;
  icon: LucideIcon;
  title: string;
  example: string;
}

/**
 * CLAUDE.md Milestone 13 §9's Culture: "Use real examples rather than
 * generic statements." The website itself is the only body of real,
 * verifiable work this company has to point to (CLAUDE.md Part 2: "The
 * website itself becomes a case study") — so every example here describes
 * a genuine, demonstrated pattern in this actual codebase's engineering
 * practice and documentation, not aspirational culture-deck language.
 * Consolidated from the spec's eight themes to six: "Documentation" folds
 * into Clear Communication, and "Constructive disagreement" folds into
 * Ownership — both were becoming a second sentence restating the theme
 * next to it, not a distinct example.
 */
export const CULTURE_VALUES: CultureValue[] = [
  {
    id: "ownership",
    icon: ShieldCheck,
    title: "Ownership",
    example:
      "When a regression reaches a page, the fix isn't the end of it — we write down what happened, why it happened, and change the pattern so the same mistake doesn't repeat somewhere else.",
  },
  {
    id: "curiosity",
    icon: Search,
    title: "Curiosity",
    example:
      "Before extending something that already exists, we ask why it was built that way in the first place — usually the answer is a constraint worth understanding, not a mistake worth ignoring.",
  },
  {
    id: "craftsmanship",
    icon: Hammer,
    title: "Craftsmanship",
    example:
      "Consistent spacing, semantic HTML, keyboard support, honest empty states — the details most visitors never consciously notice are exactly the ones we spend the most care on.",
  },
  {
    id: "continuous-learning",
    icon: BookOpen,
    title: "Continuous Learning",
    example:
      "Every non-obvious decision — including the ones we later changed our minds about — gets written down with its reasoning, so the next person (often us) doesn't have to rediscover it the hard way.",
  },
  {
    id: "clear-communication",
    icon: MessageSquare,
    title: "Clear Communication",
    example:
      "Documentation lives next to the thing it describes, not in a separate wiki that drifts out of date — and what isn't built yet is stated as plainly as what is.",
  },
  {
    id: "responsible-ai",
    icon: Bot,
    title: "Responsible AI",
    example:
      "AI accelerates implementation and research, but architecture decisions, code review, and what actually ships stay human judgment calls, every time.",
  },
];
