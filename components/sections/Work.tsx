import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";
import { ArrowUpRight } from "@/components/ui/Icons";

const work = [
  {
    index: "01",
    slug: "iot-telemetry-gateway",
    title: "High-concurrency streaming gateway & state engine",
    summary:
      "Asynchronous stream ingestion, schema validation, in-memory live state caching, and WebSocket fan-out to 1,000+ client dashboards with zero per-message database overhead.",
    org: "Mudivili Technologies",
    period: "02/2025 — 09/2026",
    stack: ["FastAPI", "WebSockets", "MQTT", "TimescaleDB", "Docker", "AWS EC2"],
    tags: ["production", "code private"],
  },
  {
    index: "02",
    slug: "lis-hl7-interface",
    title: "Mission-critical protocol gateway & ETL pipeline",
    summary:
      "Supervised daemon service handling raw TCP socket communication, HL7 parsing, control-ID idempotency guarantees, and automated ingestion into PostgreSQL.",
    org: "Mudivili Technologies",
    period: "02/2025 — 09/2026",
    stack: ["Python", "HL7 v2", "TCP/IP", "PostgreSQL", "Linux", "Docker"],
    tags: ["production", "code private"],
  },
  {
    index: "03",
    slug: "bedrock-support-agent",
    title: "Serverless agentic support & triage system",
    summary:
      "Guardrailed AI agent with deterministic tool-calling schemas on Amazon Nova Pro, DynamoDB ticket persistence via Lambda, and automated model evaluation loops.",
    org: "AWS AI/ML Scholars",
    period: "2026",
    stack: ["Amazon Bedrock", "Nova Pro", "AWS Lambda", "DynamoDB", "CloudFormation"],
    tags: ["public repo", "scholarship"],
  },
] as const;

export function Work() {
  return (
    <Section
      id="work"
      index="01"
      rail="Selected work"
      title={
        <>
          Featured systems &amp; <em>distributed architectures.</em>
        </>
      }
    >
      <div className="work-list">
        {work.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="work-card"
          >
            <span className="work-index" aria-hidden="true">
              {item.index}
            </span>
            <div className="work-main">
              <h3 className="work-title">{item.title}</h3>
              <p className="work-summary">{item.summary}</p>
              <div className="work-meta">
                {item.tags.map((tag) => (
                  <Chip key={tag} solid={tag === "production"}>
                    {tag}
                  </Chip>
                ))}
                <span className="label" style={{ letterSpacing: "0.04em" }}>
                  {item.stack.join(" · ")}
                </span>
              </div>
            </div>
            <div className="work-side">
              <b>{item.org}</b>
              {item.period}
            </div>
            <span className="work-arrow" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
