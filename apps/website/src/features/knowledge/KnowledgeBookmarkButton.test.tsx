import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { StoreProvider } from "@/providers/StoreProvider";

import { KnowledgeBookmarkButton } from "./KnowledgeBookmarkButton";

function renderButton(slug = "validating-an-mvp") {
  return render(
    <StoreProvider>
      <KnowledgeBookmarkButton slug={slug} />
    </StoreProvider>,
  );
}

describe("KnowledgeBookmarkButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders unbookmarked by default", () => {
    renderButton();
    expect(screen.getByRole("button", { name: "Bookmark" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("toggles to bookmarked on click and tracks it", async () => {
    const user = userEvent.setup();
    renderButton();

    await user.click(screen.getByRole("button", { name: "Bookmark" }));

    expect(screen.getByRole("button", { name: "Bookmarked" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(mockTrack).toHaveBeenCalledWith("knowledge_bookmark_toggled", {
      slug: "validating-an-mvp",
      bookmarked: true,
    });
  });

  it("toggles back to unbookmarked on a second click", async () => {
    const user = userEvent.setup();
    renderButton();

    await user.click(screen.getByRole("button", { name: "Bookmark" }));
    await user.click(screen.getByRole("button", { name: "Bookmarked" }));

    expect(screen.getByRole("button", { name: "Bookmark" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(mockTrack).toHaveBeenCalledWith("knowledge_bookmark_toggled", {
      slug: "validating-an-mvp",
      bookmarked: false,
    });
  });
});
