import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { KnowledgeNewsletterSignup } from "./KnowledgeNewsletterSignup";

describe("KnowledgeNewsletterSignup", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("submits the form and shows a success state, tracking knowledge_newsletter_signup", async () => {
    const user = userEvent.setup();
    render(<KnowledgeNewsletterSignup />);

    await user.type(screen.getByLabelText("Email address"), "founder@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("knowledge_newsletter_signup", {});
  });

  it("does not submit with an empty email", async () => {
    const user = userEvent.setup();
    render(<KnowledgeNewsletterSignup />);

    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(screen.queryByText(/you're subscribed/i)).not.toBeInTheDocument();
    expect(mockTrack).not.toHaveBeenCalled();
  });
});
