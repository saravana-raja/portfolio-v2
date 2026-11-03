import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Portfolio Website - Modern Systems Architecture", () => {
  test("homepage renders with core metrics, proof points, and correct Mudivili dates", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Saravana Raja S/);

    // Verify modern hero title
    const heroTitle = page.locator("#hero-title");
    await expect(heroTitle).toContainText("Architecting resilient backends");
    await expect(heroTitle).toContainText("cloud systems");

    // Verify Mudivili end date is September 2026
    const trajectory = page.locator("#trajectory");
    await expect(trajectory).toContainText("02/2025 — 09/2026");
    await expect(trajectory).toContainText("Mudivili Technologies");

    // Verify balanced proof numbers
    const proof = page.locator(".proof");
    await expect(proof).toContainText("2+");
    await expect(proof).toContainText("Dual");
    await expect(proof).toContainText("1,000+");
  });

  test("interactive systems architecture console operates across 4 layers", async ({
    page,
  }) => {
    await page.goto("/");

    const sysConsole = page.locator(".sys-console");
    await expect(sysConsole).toBeVisible();

    // Default tab: API & Realtime
    await expect(sysConsole).toContainText("API & Concurrency Layer");
    await expect(sysConsole).toContainText("FastAPI / Node API");

    // Click Cloud & DevOps tab
    await page.getByRole("tab", { name: /Cloud & DevOps/i }).click();
    await expect(sysConsole).toContainText("AWS & Azure Cloud Infrastructure");
    await expect(sysConsole).toContainText("Ubuntu Linux · systemd");

    // Click Agentic AI tab
    await page.getByRole("tab", { name: /Agentic AI/i }).click();
    await expect(sysConsole).toContainText("Amazon Bedrock AgentCore & Nova Pro");
    await expect(sysConsole).toContainText("AWS Lambda · Python");
  });

  test("privacy gate: no phone numbers or tel: links on any page", async ({
    page,
  }) => {
    const routes = [
      "/",
      "/work/iot-telemetry-gateway",
      "/work/lis-hl7-interface",
      "/work/bedrock-support-agent",
      "/colophon",
    ];

    for (const route of routes) {
      await page.goto(route);
      const content = await page.content();

      // Ensure no tel links
      expect(content).not.toMatch(/href=["']tel:/i);

      // Ensure no 10-digit indian mobile numbers (+91-9787... or raw 9787518289)
      expect(content).not.toMatch(/9787518289/);
      expect(content).not.toMatch(/\+91[\s-]?\d{5}[\s-]?\d{5}/);
    }
  });

  test("theme toggle switches between modern dark and light themes", async ({
    page,
  }) => {
    await page.goto("/");
    const html = page.locator("html");

    await expect(html).toHaveAttribute("data-theme", "dark");

    // Click theme toggle button to switch to light
    const themeBtn = page.getByRole("button", {
      name: /switch to light theme/i,
    });
    await themeBtn.click();
    await expect(html).toHaveAttribute("data-theme", "light");

    // Click again to switch back to dark
    const darkBtn = page.getByRole("button", {
      name: /switch to dark theme/i,
    });
    await darkBtn.click();
    await expect(html).toHaveAttribute("data-theme", "dark");
  });

  test("command palette opens via trigger button and keyboard navigates", async ({
    page,
  }) => {
    await page.goto("/");

    // Open via palette button
    const trigger = page.getByRole("button", { name: "Open command palette" });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Command palette" });
    await expect(dialog).toBeVisible();

    const input = page.getByRole("textbox", { name: "Search commands" });
    await expect(input).toBeFocused();

    // Type query
    await input.fill("streaming");
    const option = page.locator(".palette-item").filter({ hasText: /streaming/i });
    await expect(option.first()).toBeVisible();

    // Close on Escape
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("interactive HL7 inspector in Case 02 operates cleanly", async ({
    page,
  }) => {
    await page.goto("/work/lis-hl7-interface");

    const hl7 = page.locator(".hl7");
    await expect(hl7).toBeVisible();
    await expect(hl7).toContainText("MSH");
    await expect(hl7).toContainText("MSG00042");

    // Click PID tab
    const pidTab = page.locator(".hl7-seg-btn").filter({ hasText: "PID" });
    await pidTab.click();
    await expect(page.locator(".hl7-detail-title")).toContainText("Patient Identification (PID)");

    // Toggle view to Cloud JSON
    await page.getByRole("button", { name: /show parsed cloud json/i }).click();
    await expect(page.locator(".packet-body")).toContainText("MSG00042");
  });

  test("interactive Bedrock Agent evaluation viewer in Case 03 operates cleanly", async ({
    page,
  }) => {
    await page.goto("/work/bedrock-support-agent");

    const evalViewer = page.locator(".eval-viewer");
    await expect(evalViewer).toBeVisible();
    await expect(evalViewer).toContainText("BEDROCK AGENT EVALUATION RUNNER");

    // Click Boundary test scenario tab
    const boundaryTab = page.locator(".eval-tab-btn").filter({ hasText: /Missing Repro Boundary/i });
    await boundaryTab.click();
    await expect(evalViewer).toContainText("TOOL SUPPRESSED · REPROMPTED");
    await expect(evalViewer).toContainText("Tool execution blocked");

    // Click Policy grounding scenario tab
    const faqTab = page.locator(".eval-tab-btn").filter({ hasText: /Policy Grounding/i });
    await faqTab.click();
    await expect(evalViewer).toContainText("POLICY GROUNDED · NO TOOL NEEDED");
  });

  test("accessibility audit passes with zero critical violations", async ({
    page,
  }) => {
    await page.goto("/");
    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(["color-contrast"])
      .analyze();

    expect(axeResults.violations).toEqual([]);
  });
});
