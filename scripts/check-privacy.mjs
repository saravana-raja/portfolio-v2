/**
 * Privacy gate.
 *
 * Scans build output, public assets, and source for contact patterns that must
 * never ship. Runs in CI and can be run locally with `npm run verify:privacy`.
 *
 * The check is intentionally generic: it does not contain the real number.
 */

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const TEXT_EXT = new Set([
  ".html",
  ".htm",
  ".js",
  ".mjs",
  ".cjs",
  ".json",
  ".txt",
  ".md",
  ".tsx",
  ".ts",
  ".css",
  ".svg",
  ".xml",
  ".rsc",
  ".map",
]);
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next/cache",
  ".next/trace",
  "public/fonts",
]);

const PATTERNS = [
  {
    name: "tel link",
    re: /href\s*=\s*["']tel:/gi,
  },
  {
    name: "international mobile number",
    re: /\+91[\s-]?\d{5}[\s-]?\d{5}/g,
  },
  {
    name: "10-digit mobile number",
    re: /(?<!\d)[6-9]\d{9}(?!\d)/g,
  },
  {
    name: "whatsapp link",
    re: /wa\.me|api\.whatsapp\.com/gi,
  },
];

const findings = [];
let scanned = 0;

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).split(path.sep).join("/");

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(rel) || entry.name === "node_modules" || entry.name === ".git") {
        continue;
      }
      await walk(full);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!TEXT_EXT.has(ext)) continue;
    if (entry.name.endsWith(".nft.json") || ext === ".map") continue;

    let info;
    try {
      info = await stat(full);
    } catch {
      continue;
    }
    if (info.size > 8 * 1024 * 1024) continue;

    const content = await readFile(full, "utf8");
    scanned += 1;

    for (const { name, re } of PATTERNS) {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(content)) !== null) {
        const line = content.slice(0, match.index).split("\n").length;
        findings.push({ rel, line, name, value: match[0] });
        if (match[0].length === 0) break;
      }
    }
  }
}

const targets = ["app", "components", "content", "lib", "design", "public", ".next"];

for (const target of targets) {
  const full = path.join(root, target);
  if (target === ".next") {
    // Only rendered/emitted artifacts, not caches.
    for (const sub of ["server", "static"]) {
      const dir = path.join(full, sub);
      try {
        await stat(dir);
        await walk(dir);
      } catch {
        /* not built yet */
      }
    }
    continue;
  }
  await walk(full);
}

const pdfPath = path.join(root, "public", "resume", "saravana-raja-s-resume.pdf");
try {
  const pdf = await readFile(pdfPath, "utf8");
  scanned += 1;
  for (const { name, re } of PATTERNS) {
    re.lastIndex = 0;
    const match = re.exec(pdf);
    if (match) findings.push({ rel: "public/resume/saravana-raja-s-resume.pdf", line: 0, name, value: match[0] });
  }
} catch {
  console.warn("warn: sanitized resume PDF missing (run `npm run resume`)");
}

if (findings.length > 0) {
  console.error(`privacy check failed — ${findings.length} finding(s):`);
  for (const finding of findings) {
    console.error(
      `  ${finding.rel}:${finding.line || "-"}  ${finding.name}  ${JSON.stringify(finding.value)}`,
    );
  }
  process.exit(1);
}

console.log(`privacy check passed — ${scanned} files scanned, no phone or tel: patterns.`);
