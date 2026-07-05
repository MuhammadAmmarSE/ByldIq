export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/** CLAUDE.md Part 19's FAQ examples, answered directly. */
export const FAQS: Faq[] = [
  {
    id: "after-booking",
    question: "What happens after booking?",
    answer:
      "We review what you've shared beforehand, then spend the call understanding your goals and constraints — you'll leave with concrete next steps, whether or not you work with us.",
  },
  {
    id: "technical-knowledge",
    question: "Do I need technical knowledge?",
    answer:
      "No. We explain trade-offs in plain language and translate technical decisions into what they mean for your business.",
  },
  {
    id: "nda",
    question: "Can you sign an NDA?",
    answer: "Yes — happy to sign one before any detailed discussion of your product.",
  },
  {
    id: "existing-teams",
    question: "Can you work with existing teams?",
    answer:
      "Yes, we regularly work alongside in-house teams — augmenting capacity, reviewing architecture, or leading a specific initiative.",
  },
  {
    id: "audit-existing-systems",
    question: "Can you audit existing systems?",
    answer:
      "Yes. Architecture, performance, accessibility, and security audits are common starting points, especially for enterprise modernization.",
  },
  {
    id: "discovery-duration",
    question: "How long does discovery take?",
    answer:
      "A first discovery call is typically 30 minutes; a full discovery phase usually runs one to two weeks.",
  },
];
