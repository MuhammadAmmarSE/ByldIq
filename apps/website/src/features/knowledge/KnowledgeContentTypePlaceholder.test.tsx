import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KnowledgeContentTypePlaceholder } from "./KnowledgeContentTypePlaceholder";

describe("KnowledgeContentTypePlaceholder", () => {
  it("states plainly that the content type doesn't exist yet, with the given reason", () => {
    render(
      <KnowledgeContentTypePlaceholder
        contentTypeLabel="whitepapers"
        reason="No whitepapers have been authored yet."
      />,
    );

    expect(screen.getByText(/doesn't have any whitepapers yet/i)).toBeInTheDocument();
    expect(screen.getByText("No whitepapers have been authored yet.")).toBeInTheDocument();
  });

  it("links to real Knowledge Center content instead of leaving a dead end", () => {
    render(
      <KnowledgeContentTypePlaceholder contentTypeLabel="videos" reason="No videos exist yet." />,
    );

    expect(screen.getByRole("link", { name: "Browse all articles" })).toHaveAttribute(
      "href",
      "/knowledge",
    );
    expect(screen.getByRole("link", { name: "Explore Playbooks" })).toHaveAttribute(
      "href",
      "/knowledge/playbooks",
    );
    expect(screen.getByRole("link", { name: "Explore Learning Paths" })).toHaveAttribute(
      "href",
      "/knowledge/learning-paths",
    );
  });
});
