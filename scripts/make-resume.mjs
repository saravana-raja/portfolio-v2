import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const source = pathToFileURL(path.join(root, "design", "resume.html")).href;
const target = path.join(root, "public", "resume", "saravana-raja-s-resume.pdf");

await mkdir(path.dirname(target), { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.goto(source, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
await page.pdf({
  path: target,
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: false,
});
await browser.close();

// Clean, predictable document metadata. No contact details beyond what is visible.
const bytes = await readFile(target);
const pdf = await PDFDocument.load(bytes);
pdf.setTitle("Saravana Raja S — Résumé");
pdf.setAuthor("Saravana Raja S");
pdf.setSubject("Backend & Cloud Engineer — IoT, realtime, integrations");
pdf.setKeywords([
  "backend engineer",
  "cloud engineer",
  "IoT",
  "MQTT",
  "FastAPI",
  "Node.js",
  "HL7",
  "AWS",
]);
pdf.setCreator("Saravana Raja S");
pdf.setProducer("Saravana Raja S");
await writeFile(target, await pdf.save());

console.log(`resume written to ${target}`);
