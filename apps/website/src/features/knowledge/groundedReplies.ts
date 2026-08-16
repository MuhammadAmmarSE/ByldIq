import type { AiGroundedReply } from "@/store/ai-companion-store";

import type { KnowledgeArticle } from "./data/knowledge-article.schema";
import type { Tutorial } from "./data/tutorial.schema";
import { generateArticleSummary } from "./summarize";

/**
 * Builds the AI Companion's "Ask Byld about this article" quick replies
 * (CLAUDE.md Part 16/18), the same pattern
 * `case-studies/groundedReplies.ts` established: every answer is a real
 * field (or a small, honest recomposition of one), never new copy
 * invented for the AI specifically. `getPageContextGreeting` only shows
 * the first few as quick-reply chips, but `getGroundedAnswer` matches the
 * full array — a visitor can still ask about any core concept by name.
 */
export function buildKnowledgeArticleGroundedReplies(article: KnowledgeArticle): AiGroundedReply[] {
  const replies: AiGroundedReply[] = [
    {
      question: "What problem does this solve?",
      answer: article.problem,
    },
    {
      question: "Why does this matter?",
      answer: article.importance,
    },
    {
      question: "Explain this simply",
      answer: generateArticleSummary(article, "beginner"),
    },
  ];

  const [firstExample] = article.realExamples;
  if (firstExample) {
    replies.push({
      question: "Give me an example",
      answer: `${firstExample.title}: ${firstExample.description}`,
    });
  }

  for (const concept of article.coreConcepts) {
    replies.push({
      question: `What is ${concept.term}?`,
      answer: concept.explanation,
    });
  }

  const [firstMistake] = article.commonMistakes;
  if (firstMistake) {
    replies.push({
      question: "What's a common mistake to avoid?",
      answer: `${firstMistake.mistake} ${firstMistake.consequence}`,
    });
  }

  replies.push({
    question: "How would this apply to my product?",
    answer:
      "That genuinely depends on your product and constraints — this article's guidance is a starting framework, not a universal answer. BuildPath can map it onto your specific situation in a few minutes.",
  });

  return replies;
}

/**
 * The same real-content-only grounded Q&A pattern, applied to a
 * `Tutorial`'s prerequisites/setup/steps/validation instead of an
 * article's problem/concepts.
 */
export function buildTutorialGroundedReplies(tutorial: Tutorial): AiGroundedReply[] {
  const replies: AiGroundedReply[] = [
    {
      question: "What do I need before starting?",
      answer: tutorial.prerequisites.join(" "),
    },
    {
      question: "What's the setup step?",
      answer: tutorial.setup.instructions,
    },
  ];

  for (const step of tutorial.steps) {
    replies.push({ question: `What does "${step.title}" involve?`, answer: step.instructions });
  }

  replies.push(
    { question: "How do I know it worked?", answer: tutorial.validation },
    { question: "What should I do next?", answer: tutorial.nextSteps.join(" ") },
  );

  return replies;
}
