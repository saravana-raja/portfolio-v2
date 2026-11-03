export type CaseSection = {
  id: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  role: string;
  org: string;
  timeframe: string;
  status: string;
  stack: readonly string[];
  sections: readonly CaseSection[];
  links?: readonly { label: string; href: string }[];
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "iot-telemetry-gateway",
    index: "01",
    title: "High-concurrency streaming gateway & state engine",
    summary:
      "Asynchronous stream ingestion, schema validation, in-memory live state caching, and WebSocket fan-out to 1,000+ client dashboards with zero per-message database overhead.",
    role: "Lead Engineer",
    org: "Mudivili Technologies",
    timeframe: "02/2025 — 09/2026",
    status: "production · code private",
    stack: ["FastAPI", "MQTT", "WebSockets", "PostgreSQL", "TimescaleDB", "Docker", "AWS EC2"],
    sections: [
      { id: "context", label: "Context" },
      { id: "constraints", label: "Constraints" },
      { id: "architecture", label: "Architecture" },
      { id: "decisions", label: "Decisions" },
      { id: "failures", label: "Failure modes" },
      { id: "outcome", label: "Outcome" },
      { id: "again", label: "If I did it again" },
    ],
  },
  {
    slug: "lis-hl7-interface",
    index: "02",
    title: "Mission-critical protocol gateway & ETL pipeline",
    summary:
      "Supervised daemon service handling raw TCP socket communication, HL7 parsing, control-ID idempotency guarantees, and automated ingestion into PostgreSQL.",
    role: "Lead Engineer",
    org: "Mudivili Technologies",
    timeframe: "02/2025 — 09/2026",
    status: "production · code private",
    stack: ["Python", "HL7 v2", "TCP/IP", "PostgreSQL", "Linux", "Docker"],
    sections: [
      { id: "context", label: "Context" },
      { id: "constraints", label: "Constraints" },
      { id: "architecture", label: "Architecture" },
      { id: "decisions", label: "Decisions" },
      { id: "failures", label: "Failure modes" },
      { id: "outcome", label: "Outcome" },
      { id: "again", label: "If I did it again" },
    ],
  },
  {
    slug: "bedrock-support-agent",
    index: "03",
    title: "Serverless agentic support & triage system",
    summary:
      "Guardrailed AI agent with deterministic tool-calling schemas on Amazon Nova Pro, DynamoDB ticket persistence via Lambda, and automated model evaluation loops.",
    role: "Builder",
    org: "AWS AI/ML Scholars — Udacity",
    timeframe: "2026",
    status: "open source · scholarship project",
    stack: ["Amazon Bedrock", "AgentCore", "Nova Pro", "Lambda", "DynamoDB", "CloudFormation", "Python"],
    links: [
      {
        label: "Source on GitHub",
        href: "https://github.com/saravana-raja/bedrock-agentcore-support-triage",
      },
    ],
    sections: [
      { id: "context", label: "Context" },
      { id: "constraints", label: "Constraints" },
      { id: "architecture", label: "Architecture" },
      { id: "decisions", label: "Decisions" },
      { id: "evaluation", label: "Evaluation" },
      { id: "outcome", label: "Outcome" },
      { id: "again", label: "If I did it again" },
    ],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseNeighbours(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? caseStudies[index - 1] : caseStudies[caseStudies.length - 1],
    next: index < caseStudies.length - 1 ? caseStudies[index + 1] : caseStudies[0],
  };
}
