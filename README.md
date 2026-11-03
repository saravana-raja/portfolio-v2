# Saravana Raja S — Backend & Cloud Systems Engineer

> **Backend & Cloud Engineer** · Distributed Systems · Cloud Infrastructure · APIs  
> Chennai, India · IST (UTC+5:30)

Production portfolio website built with Next.js (App Router), TypeScript, and a **Modern Systems Architecture** design system (inspired by Linear, Stripe, Tailscale, and Cloudflare).

---

## 📐 Design Philosophy: Modern Systems Architecture

Pivoted completely away from both generic gradient AI templates and the ubiquitous retro parchment paper/serif "Claude archetype":

* **Design Palette**:
  * **Slate & Obsidian Dark (`#070a12`)**: Deep carbon chassis, subtle 36px architectural grid lines, ambient cyan lighting glow, electric blue/cyan accents (`#38bdf8`, `#2563eb`), and emerald status indicators (`#10b981`).
  * **Precision Light Mode (`#f8fafc`)**: Crisp, high-contrast white and slate counterpart with clean engineering borders for daytime reading.
* **Modern Typography**:
  * Clean, geometric sans-serif with tight tracking (`-0.035em`) and confident weights for headlines.
  * Clean developer monospace for architecture contracts, schemas, and code snippets.
* **Interactive Systems Architecture Console**:
  * Embedded in the hero, allowing recruiters to inspect 4 architectural layers:
    1. **API & Realtime Services** (FastAPI / Express, WebSockets, in-memory caching, JWT/RBAC)
    2. **Cloud Infrastructure** (AWS EC2, Docker Compose, Nginx reverse proxy, Linux systemd, Azure SDK)
    3. **Data & Storage** (PostgreSQL, TimescaleDB continuous aggregates, Redis, SQL querying)
    4. **Agentic AI & Serverless** (Amazon Bedrock, Nova Pro, AWS Lambda, DynamoDB, CloudFormation)

---

## 🛠️ Case Studies & Engineering Depth

1. **[High-Concurrency Streaming Gateway & State Engine](/work/iot-telemetry-gateway)**
   * Stream ingestion, schema validation, in-memory state caching, and WebSocket fan-out to 1,000+ dashboard clients with zero per-message database reads.
2. **[Mission-Critical Protocol Gateway & ETL Pipeline](/work/lis-hl7-interface)**
   * Supervised Linux daemon service handling raw TCP sockets, MLLP framing, HL7 parsing, control-ID idempotency guarantees, and quarantine error handling. Includes interactive HL7 wire frame inspector.
3. **[Serverless Agentic Support & Triage System](/work/bedrock-support-agent)**
   * Guardrailed AI agent on Amazon Bedrock AgentCore & Nova Pro with deterministic tool-calling schemas, DynamoDB persistence via Lambda, and automated model evaluation loops. Includes interactive multi-turn trace inspector.

---

## 🔒 Privacy Architecture

* **Phone Protection**: Strictly adheres to the rule that mobile numbers must never be exposed publicly. No phone number or `tel:` link exists anywhere in the source code, metadata, JSON-LD, or the generated PDF resume.
* **Automated Privacy Gate**: `scripts/check-privacy.mjs` scans all static output, markdown, source files, and PDFs on build to block any phone pattern regressions.
* **Obfuscated Email**: The contact address is dynamically assembled at runtime to mitigate scraper crawlers.

---

## 🚀 Development & Scripts

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript type check
npm run typecheck

# Run production build
npm run build

# Run automated Playwright E2E and Axe accessibility tests
npm test

# Run the automated privacy verification gate
npm run verify:privacy

# Generate the sanitized A4 PDF resume from design/resume.html
npm run resume
```

---

## 📦 Stack Specifications

* **Framework**: Next.js 16 (App Router, Turbopack)
* **Language**: TypeScript 5 (Strict Mode)
* **UI**: React 19, Modern CSS Custom Properties
* **Testing**: Playwright, `@axe-core/playwright`
* **Resume Engine**: Chromium headless PDF generation with `pdf-lib` metadata cleanup
