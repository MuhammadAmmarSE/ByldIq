import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("BuildPath", () => {
  test("critical path: an idea becomes a confirmed, shareable plan", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/buildpath");

    // Idea
    await expect(
      page.getByRole("heading", { level: 1, name: "Let's start with your idea" }),
    ).toBeVisible();
    await page
      .getByLabel(/what are you building/i)
      .fill("A booking tool for independent physiotherapists");
    await page.getByRole("button", { name: "MVP", exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    // Discovery — the AI conversation, seeded by the Idea stage's answer already skipping "accomplish"
    await expect(page.getByRole("heading", { name: "Tell Byld more" })).toBeVisible();
    await expect(page.getByText(/what problem does this mvp actually solve/i)).toBeVisible();
    await page.getByLabel("Reply to Byld").fill("Clinics lose bookings to phone tag and no-shows");
    await page.getByRole("button", { name: "Send reply" }).click();
    await expect(page.getByText(/who runs into this problem today/i)).toBeVisible();
    await page.getByLabel("Reply to Byld").fill("Small physiotherapy clinics");
    await page.getByRole("button", { name: "Send reply" }).click();
    await expect(page.getByText(/why is now the right time/i)).toBeVisible();
    await page
      .getByLabel("Reply to Byld")
      .fill("Caseload is growing past what a paper diary can handle");
    await page.getByRole("button", { name: "Send reply" }).click();
    await expect(page.getByText(/what does success look like/i)).toBeVisible();
    await page.getByLabel("Reply to Byld").fill("Fewer missed appointments");
    await page.getByRole("button", { name: "Send reply" }).click();
    await expect(
      page.getByText(/ready to turn this into a structured problem definition/i),
    ).toBeVisible();

    // Problem Definition — drafted, then explicitly confirmed
    await page.getByRole("button", { name: "Draft with Byld" }).click();
    await expect(page.getByText("Needs your review")).toBeVisible();
    await page.getByRole("button", { name: "This looks right" }).click();
    await expect(page.getByText("Confirmed", { exact: true })).toBeVisible();

    // Target Users
    await page.getByLabel("Role or description").fill("Front-desk staff");
    await page.getByRole("button", { name: "Add user group" }).click();
    await expect(page.getByText("Front-desk staff")).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();

    // Product Definition — reflects Discovery without re-asking
    await expect(page.getByRole("heading", { name: "Product definition" })).toBeVisible();
    await expect(page.getByText("A booking tool for independent physiotherapists")).toBeVisible();
    await expect(page.getByText("Front-desk staff")).toBeVisible();
    await page.getByRole("button", { name: "Web", exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    // Prioritization — a manual must-have feature, plus an accepted AI suggestion
    await expect(page.getByRole("heading", { name: "Feature prioritization" })).toBeVisible();
    await page.getByLabel("Name").fill("Online booking calendar");
    await page.getByLabel("Priority").click();
    await page.getByRole("option", { name: "MVP — Must have" }).click();
    await page.getByRole("button", { name: "Add feature" }).click();
    await expect(page.getByText("Online booking calendar")).toBeVisible();
    await expect(page.getByText("MVP — Must have (1)")).toBeVisible();
    await page.getByRole("button", { name: "Ask Byld for suggestions" }).click();
    await page.getByRole("button", { name: "Add" }).first().click();
    await expect(page.getByText("AI suggested")).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();

    // Architecture — toggling an integration changes the diagram
    await expect(page.getByRole("heading", { name: "Architecture" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Authentication" })).toHaveCount(1);
    await page.getByRole("button", { name: "Authentication" }).click();
    await expect(page.getByRole("button", { name: "Authentication" })).toHaveCount(2);

    await page.getByRole("button", { name: "Continue" }).click();

    // Technology — recommendations link to the real Technology Explorer
    await expect(page.getByRole("heading", { name: "Technology recommendations" })).toBeVisible();
    await expect(page.getByRole("link", { name: /more on next\.js/i })).toHaveAttribute(
      "href",
      "/technology/next-js",
    );

    await page.getByRole("button", { name: "Continue" }).click();

    // AI Opportunities — honest, since this project has no AI signal
    await expect(page.getByRole("heading", { name: "AI opportunities" })).toBeVisible();
    await expect(page.getByText("No AI recommended")).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();

    // Roadmap — six phases, ranged timelines
    await expect(page.getByRole("heading", { name: "Roadmap" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Phase 1: Discovery & Planning/ }),
    ).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("button", { name: /Phase 3: Core Build/ }).click();
    await expect(page.getByText("Online booking calendar")).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();

    // Effort — a ranged estimate, a team, and risks
    await expect(page.getByRole("heading", { name: "Estimated effort" })).toBeVisible();
    await expect(page.getByText(/team size: \d/i)).toBeVisible();
    await expect(page.getByText("Product Manager / Strategist")).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();

    // Summary — the Final Plan, with working exports
    await expect(page.getByRole("heading", { name: "Your plan" })).toBeVisible();
    await expect(page.getByText("A booking tool for independent physiotherapists")).toBeVisible();
    await expect(page.getByText("Online booking calendar")).toBeVisible();
    await expect(page.getByRole("link", { name: /export as pdf/i })).toHaveAttribute(
      "href",
      "/buildpath/print",
    );

    await page.getByRole("button", { name: /copy summary/i }).click();
    await expect(page.getByText("Summary copied")).toBeVisible();

    // Reloading picks the plan back up from where it left off — Save & Resume.
    await page.reload();
    await expect(page.getByRole("heading", { name: "Your plan" })).toBeVisible();
    await expect(page.getByText("A booking tool for independent physiotherapists")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("prefills project types from a Solution referrer, without a form to fill first", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/buildpath?solution=startup");

    await expect(page.getByText(/Continuing from/)).toBeVisible();
    await expect(page.getByRole("button", { name: "MVP", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("Start over resets back to the Idea stage", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/buildpath");

    await page.getByRole("button", { name: "MVP", exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("heading", { name: "Tell Byld more" })).toBeVisible();

    await page.getByRole("button", { name: "Start over" }).click();
    await expect(page.getByRole("heading", { name: "Let's start with your idea" })).toBeVisible();
    await expect(page.getByRole("button", { name: "MVP", exact: true })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("a shareable link renders the encoded plan, and a broken one recovers honestly", async ({
    page,
  }) => {
    const payload = {
      projectTypes: ["MVP"],
      vision: "A booking tool for clinics",
      problem: "Clinics lose bookings to phone tag",
      mvpFeatureNames: ["Online booking calendar"],
      nextSteps: ["Review this plan with your team."],
    };
    const id = Buffer.from(JSON.stringify(payload), "utf-8")
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await page.goto(`/buildpath/share/${id}`);
    await expect(page.getByRole("heading", { level: 1, name: "A BuildPath plan" })).toBeVisible();
    await expect(page.getByText("A booking tool for clinics")).toBeVisible();
    await expect(page.getByText("Online booking calendar")).toBeVisible();
    await expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "best-practice"]).analyze())
        .violations,
    ).toEqual([]);

    await page.goto("/buildpath/share/not-a-real-plan");
    await expect(
      page.getByRole("heading", { level: 1, name: "This link looks broken." }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Start BuildPath" })).toHaveAttribute(
      "href",
      "/buildpath",
    );
  });

  test("the print view renders the plan for export", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/buildpath");
    await page.getByLabel(/what are you building/i).fill("A booking tool for clinics");

    await page.goto("/buildpath/print");
    await expect(
      page.getByRole("heading", { level: 1, name: "Your BuildPath Plan" }),
    ).toBeVisible();
    await expect(page.getByText("A booking tool for clinics")).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to BuildPath" })).toHaveAttribute(
      "href",
      "/buildpath",
    );
    await expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "best-practice"]).analyze())
        .violations,
    ).toEqual([]);
  });
});
