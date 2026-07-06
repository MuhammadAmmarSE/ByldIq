import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgePlaybooks } from "./KnowledgePlaybooks";

describe("KnowledgePlaybooks", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders only playbook-type articles", () => {
    render(<KnowledgePlaybooks />);

    const playbooks = KNOWLEDGE_ARTICLES.filter((article) => article.type === "playbook");
    for (const playbook of playbooks) {
      expect(screen.getByRole("link", { name: playbook.title })).toBeInTheDocument();
    }

    const nonPlaybooks = KNOWLEDGE_ARTICLES.filter((article) => article.type !== "playbook");
    for (const article of nonPlaybooks) {
      expect(screen.queryByText(article.title)).not.toBeInTheDocument();
    }
  });

  it("tracks knowledge_card_clicked when a playbook is selected", async () => {
    const user = userEvent.setup();
    render(<KnowledgePlaybooks />);

    const playbooks = KNOWLEDGE_ARTICLES.filter((article) => article.type === "playbook");
    const [firstPlaybook] = playbooks;
    if (!firstPlaybook) throw new Error("Expected at least one playbook fixture");

    await user.click(screen.getByRole("link", { name: firstPlaybook.title }));
    expect(mockTrack).toHaveBeenCalledWith("knowledge_card_clicked", { slug: firstPlaybook.slug });
  });
});
