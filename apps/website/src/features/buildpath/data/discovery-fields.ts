import type { DiscoveryAnswers } from "../types";

export interface DiscoveryFieldMeta {
  field: keyof DiscoveryAnswers;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

/** Structured, directly-editable recap of the same fields the conversation fills — shown below the chat so a visitor can review or correct anything without scrolling back through the transcript. */
export const DISCOVERY_FIELDS: DiscoveryFieldMeta[] = [
  {
    field: "accomplish",
    label: "What are you trying to build or accomplish?",
    placeholder: "A booking tool for independent physiotherapists...",
    multiline: true,
  },
  {
    field: "problem",
    label: "What problem does it solve?",
    placeholder: "Clinics lose bookings to phone tag and no-shows.",
    multiline: true,
  },
  {
    field: "whoExperiencesIt",
    label: "Who experiences this problem today?",
    placeholder: "Solo and small-practice physiotherapists.",
  },
  {
    field: "whyNow",
    label: "Why is now the right time?",
    placeholder: "Growing caseload is already outpacing a paper diary.",
  },
  {
    field: "successLooksLike",
    label: "What does success look like in six months?",
    placeholder: "Fewer missed appointments, less time on the phone.",
    multiline: true,
  },
];
