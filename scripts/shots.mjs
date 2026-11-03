import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = process.env.SHOT_DIR ?? "../shots";

const browser = await chromium.launch({ channel: "chrome" });

async function shot(name, path, options = {}) {
  const page = await browser.newPage({
    viewport: options.viewport ?? { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  if (options.action) await options.action(page);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: options.fullPage ?? true });
  await page.close();
}

await shot("pw-home", "/");
await shot("pw-home-mobile", "/", { viewport: { width: 390, height: 844 } });
await shot("pw-case", "/work/iot-telemetry-gateway");
await shot("pw-case-hl7", "/work/lis-hl7-interface", {
  fullPage: false,
  action: async (page) => {
    await page.locator("#architecture").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  },
});
await shot("pw-theme", "/", {
  fullPage: false,
  action: async (page) => {
    await page.getByRole("button", { name: /switch to light theme/i }).click();
    await page.waitForTimeout(400);
  },
});
await shot("pw-palette", "/", {
  fullPage: false,
  action: async (page) => {
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(400);
  },
});

await browser.close();
console.log("screenshots written to", out);
