import { TECHNOLOGIES } from "@/features/technology";

import { CATEGORIES_BY_SLUG, POPULATED_CATEGORIES } from "./data/facets";
import type { KnowledgeArticle } from "./data/knowledge-article.schema";

/**
 * CLAUDE.md Part 18's search ("understand keywords, categories,
 * technologies, problems, user intent") — a weighted, multi-field
 * relevance scorer, not the plain `.includes()` substring filter
 * `KnowledgeExplorer` used before. Still fully deterministic and
 * client-side (no real NLP, no external service) — the same "Mock AI"
 * honesty BuildPath's `MockAIProvider` documents: this reasons about
 * text a visitor can inspect, it doesn't pretend to understand language.
 */

export interface KnowledgeSearchResult {
  article: KnowledgeArticle;
  score: number;
}

export interface KnowledgeSearchSuggestion {
  label: string;
  href: string;
}

const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "how",
  "do",
  "does",
  "did",
  "should",
  "shall",
  "i",
  "is",
  "are",
  "was",
  "were",
  "to",
  "of",
  "in",
  "on",
  "for",
  "my",
  "this",
  "that",
  "it",
  "and",
  "or",
  "what",
  "when",
  "why",
  "which",
  "who",
  "can",
  "could",
  "would",
  "will",
  "build",
  "me",
  "about",
  "with",
  "vs",
  "versus",
  "you",
  "your",
]);

/**
 * Common alternate spellings mapped to the exact word the article/technology
 * corpus actually uses. Deliberately small — every entry corresponds to a
 * real technology or concept already present in `TECHNOLOGIES` or
 * `KNOWLEDGE_ARTICLES`, not a guess at what visitors might type.
 */
const QUERY_ALIASES: Record<string, string> = {
  postgres: "postgresql",
  psql: "postgresql",
  mongo: "mongodb",
  k8s: "kubernetes",
  nextjs: "next.js",
  "next.js": "next.js",
  iac: "terraform",
  llm: "ai",
  llms: "ai",
  chatbot: "assistant",
  microservice: "microservices",
  saas: "platform",
};

function normalizeQueryWord(word: string): string {
  return QUERY_ALIASES[word] ?? word;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9.]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

interface WeightedField {
  weight: number;
  text: string;
}

function buildFields(article: KnowledgeArticle): WeightedField[] {
  const categoryLabel = CATEGORIES_BY_SLUG.get(article.category)?.label ?? article.category;
  const technologyNames = article.relatedTechnologySlugs
    .map((slug) => TECHNOLOGIES.find((technology) => technology.slug === slug)?.name)
    .filter((name): name is string => Boolean(name));

  return [
    { weight: 6, text: article.title },
    { weight: 4, text: categoryLabel },
    { weight: 4, text: technologyNames.join(" ") },
    { weight: 3, text: article.coreConcepts.map((concept) => concept.term).join(" ") },
    { weight: 3, text: article.realExamples.map((example) => example.title).join(" ") },
    { weight: 2, text: article.audience.join(" ") },
    { weight: 2, text: article.summary },
    { weight: 2, text: article.problem },
    { weight: 1, text: article.coreConcepts.map((concept) => concept.explanation).join(" ") },
    { weight: 1, text: article.realExamples.map((example) => example.description).join(" ") },
    { weight: 1, text: article.commonMistakes.map((mistake) => mistake.mistake).join(" ") },
    { weight: 1, text: article.businessContext },
    { weight: 1, text: article.engineeringContext },
    { weight: 1, text: article.realWorldRelevance },
    { weight: 1, text: article.learningOutcomes.join(" ") },
  ];
}

/**
 * Weighted, multi-token relevance search over the given articles. An empty
 * query returns every article, unscored, in its original order — the same
 * "show everything" behavior the previous filter had.
 */
export function searchKnowledgeArticles(
  articles: KnowledgeArticle[],
  query: string,
): KnowledgeSearchResult[] {
  const tokens = tokenize(query).map(normalizeQueryWord);

  if (tokens.length === 0) {
    return articles.map((article) => ({ article, score: 0 }));
  }

  const scored = articles.map((article) => {
    const fields = buildFields(article);
    let score = 0;

    for (const token of tokens) {
      for (const field of fields) {
        if (field.text.toLowerCase().includes(token)) {
          score += field.weight;
        }
      }
    }

    return { article, score };
  });

  return scored
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || articles.indexOf(a.article) - articles.indexOf(b.article));
}

/**
 * When a query matches zero articles, offer real, honest next steps
 * instead of a dead end (CLAUDE.md Part 8) — a populated category or a
 * Technology Explorer page the query's words genuinely match. Never
 * fabricates a link: both checks run against real data and only surface
 * a suggestion when something actually matched.
 */
export function suggestForZeroResults(query: string): KnowledgeSearchSuggestion[] {
  const tokens = tokenize(query).map(normalizeQueryWord);
  if (tokens.length === 0) return [];

  const suggestions: KnowledgeSearchSuggestion[] = [];

  let bestCategory: { slug: string; label: string; score: number } | null = null;
  for (const category of POPULATED_CATEGORIES) {
    const haystack = category.label.toLowerCase();
    const score = tokens.filter((token) => haystack.includes(token)).length;
    if (score > 0 && (!bestCategory || score > bestCategory.score)) {
      bestCategory = { ...category, score };
    }
  }
  if (bestCategory) {
    suggestions.push({
      label: `Browse ${bestCategory.label} guides`,
      href: `/knowledge/category/${bestCategory.slug}`,
    });
  }

  let bestTechnology: { slug: string; name: string; score: number } | null = null;
  for (const technology of TECHNOLOGIES) {
    const haystack = technology.name.toLowerCase();
    const score = tokens.filter((token) => haystack.includes(token)).length;
    if (score > 0 && (!bestTechnology || score > bestTechnology.score)) {
      bestTechnology = { slug: technology.slug, name: technology.name, score };
    }
  }
  if (bestTechnology) {
    suggestions.push({
      label: `Explore ${bestTechnology.name} in Technology Explorer`,
      href: `/technology/${bestTechnology.slug}`,
    });
  }

  return suggestions;
}
