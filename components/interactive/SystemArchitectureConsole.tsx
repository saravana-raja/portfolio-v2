"use client";

import { useState } from "react";

type ArchitectureLayer = "api" | "cloud" | "data" | "ai";

type LayerInfo = {
  id: ArchitectureLayer;
  tabLabel: string;
  name: string;
  status: string;
  throughput: string;
  latency: string;
  highlight: string;
  nodes: { label: string; desc: string; tech: string }[];
  codeSnippet: string;
};

const LAYERS: Record<ArchitectureLayer, LayerInfo> = {
  api: {
    id: "api",
    tabLabel: "API & Realtime",
    name: "API & Concurrency Layer",
    status: "HEALTHY · ACTIVE",
    throughput: "1,000+ Sockets",
    latency: "< 5ms (In-Memory)",
    highlight:
      "Handles long-lived WebSocket sessions, JWT/RBAC security, and in-memory live state caching without hitting the database per message.",
    nodes: [
      {
        label: "Client Ingress",
        desc: "Mobile, Web & Devices",
        tech: "HTTP/2 · WebSockets",
      },
      {
        label: "FastAPI / Node API",
        desc: "JWT Auth & RBAC Guard",
        tech: "Node.js · Python",
      },
      {
        label: "State Cache",
        desc: "Map Lookup (0 DB Reads)",
        tech: "In-Memory / Redis",
      },
      {
        label: "Fan-Out Engine",
        desc: "Real-time Push to Clients",
        tech: "WebSocket Broadcast",
      },
    ],
    codeSnippet: `// In-Memory Device State Cache - 0 DB reads on heartbeat
export function updateDeviceState(deviceId: string, payload: TelemetryPayload) {
  const previous = stateRegistry.get(deviceId);
  stateRegistry.set(deviceId, { ...previous, ...payload, updatedAt: Date.now() });
  // Broadcast live state snapshot to subscribed WebSocket clients
  socketGateway.broadcastToSubscribers(deviceId, payload);
}`,
  },
  cloud: {
    id: "cloud",
    tabLabel: "Cloud & DevOps",
    name: "AWS & Azure Cloud Infrastructure",
    status: "MULTI-CLOUD · PROVISIONED",
    throughput: "Automated Deployments",
    latency: "99.9% Uptime",
    highlight:
      "Containerized microservices running on AWS EC2 & Docker Compose with Nginx reverse proxy, Linux systemd supervisors, and Azure SDK resource management.",
    nodes: [
      {
        label: "Edge Proxy",
        desc: "Nginx Reverse Proxy",
        tech: "SSL/TLS · Rate Limiting",
      },
      {
        label: "Compute Hosts",
        desc: "AWS EC2 / Azure VMs",
        tech: "Ubuntu Linux · systemd",
      },
      {
        label: "Container Runtime",
        desc: "Isolated Services",
        tech: "Docker · Docker Compose",
      },
      {
        label: "Cloud Telemetry",
        desc: "Cost & Usage Tracking",
        tech: "Azure SDK · CloudWatch",
      },
    ],
    codeSnippet: `# Docker Compose Production Service Topology
services:
  gateway-api:
    image: saravanaraja/gateway-api:latest
    restart: always
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://app:\${DB_PASS}@timescaledb:5432/telemetry
      - CACHE_TTL_SECONDS=300
    depends_on:
      - timescaledb`,
  },
  data: {
    id: "data",
    tabLabel: "Data & Storage",
    name: "Relational & Time-Series Data Layer",
    status: "CONTINUOUS AGGREGATION",
    throughput: "20+ Writes/sec",
    latency: "< 12ms Analytics",
    highlight:
      "PostgreSQL and TimescaleDB with Continuous Aggregates precomputing historical windows, so analytical queries never compete with ingest writes.",
    nodes: [
      {
        label: "Ingest Buffer",
        desc: "Validated Payload Queue",
        tech: "Batched Transactions",
      },
      {
        label: "TimescaleDB",
        desc: "Hypertable Partitioning",
        tech: "PostgreSQL 16",
      },
      {
        label: "Continuous Aggs",
        desc: "Precomputed 1h/1d Rollups",
        tech: "Materialized Views",
      },
      {
        label: "Query Engine",
        desc: "Sub-15ms Dashboard Reads",
        tech: "Optimized SQL",
      },
    ],
    codeSnippet: `-- TimescaleDB Continuous Aggregate for Sub-15ms Dashboards
CREATE MATERIALIZED VIEW device_hourly_summary
WITH (timescaledb.continuous) AS
SELECT time_bucket('1 hour', recorded_at) AS bucket,
       device_id,
       AVG(reading_value) AS avg_value,
       MAX(reading_value) AS peak_value
FROM raw_telemetry_readings
GROUP BY bucket, device_id;`,
  },
  ai: {
    id: "ai",
    tabLabel: "Agentic AI",
    name: "Amazon Bedrock AgentCore & Nova Pro",
    status: "EVALUATED · GUARDRAILED",
    throughput: "Deterministic Tool Calls",
    latency: "Zero Repro Hallucination",
    highlight:
      "Enterprise support and bug triage agent built on Amazon Bedrock AgentCore with automated evaluation pipelines scoring correctness and completeness.",
    nodes: [
      {
        label: "Agent Client",
        desc: "Multi-Turn Session",
        tech: "Bedrock AgentCore",
      },
      {
        label: "Foundation Model",
        desc: "T=0 Deterministic Prompt",
        tech: "Amazon Nova Pro",
      },
      {
        label: "Tool Execution",
        desc: "Schema-Validated Handler",
        tech: "AWS Lambda · Python",
      },
      {
        label: "Persistence",
        desc: "Ticket Store & State",
        tech: "Amazon DynamoDB",
      },
    ],
    codeSnippet: `// Bedrock Agent Tool Definition with Strict Schema Guardrails
export const createBugReportTool = {
  name: "create_bug_report",
  description: "Files engineering bug ticket ONLY when repro steps exist",
  parameters: {
    type: "object",
    properties: {
      title: { type: "string" },
      environment: { type: "string" },
      repro_steps: { type: "string" }
    },
    required: ["title", "environment", "repro_steps"]
  }
};`,
  },
};

export function SystemArchitectureConsole() {
  const [activeTab, setActiveTab] = useState<ArchitectureLayer>("api");
  const layer = LAYERS[activeTab];

  return (
    <div className="sys-console" aria-label="Interactive Systems Architecture Console">
      <div className="sys-console-header">
        <div className="sys-console-title-group">
          <span className="sys-console-tag">SYSTEM TOPOLOGY</span>
          <span className="sys-console-status">
            <span className="sys-dot" /> {layer.status}
          </span>
        </div>
        <div className="sys-metrics-badge">
          <span>{layer.throughput}</span>
          <span className="sys-sep">·</span>
          <span className="sys-latency">{layer.latency}</span>
        </div>
      </div>

      <div className="sys-tabs" role="tablist" aria-label="System Architecture Layers">
        {(["api", "cloud", "data", "ai"] as ArchitectureLayer[]).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={`sys-tab-btn ${activeTab === tab ? "sys-tab-btn--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {LAYERS[tab].tabLabel}
          </button>
        ))}
      </div>

      <div className="sys-console-body">
        <div className="sys-layer-meta">
          <h3 className="sys-layer-name">{layer.name}</h3>
          <p className="sys-layer-desc">{layer.highlight}</p>
        </div>

        <div className="sys-nodes-flow" aria-label="Architecture Data Flow">
          {layer.nodes.map((node, index) => (
            <div key={node.label} className="sys-node-card">
              <div className="sys-node-step">0{index + 1}</div>
              <div className="sys-node-content">
                <strong className="sys-node-label">{node.label}</strong>
                <span className="sys-node-desc">{node.desc}</span>
                <span className="sys-node-tech">{node.tech}</span>
              </div>
              {index < layer.nodes.length - 1 && (
                <div className="sys-node-arrow" aria-hidden="true">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="sys-code-preview">
          <div className="sys-code-bar">
            <span>IMPLEMENTATION CONTRACT</span>
            <span className="sys-code-lang">PRODUCTION PATTERN</span>
          </div>
          <pre className="sys-code-block" tabIndex={0} aria-label="Code contract preview">
            {layer.codeSnippet}
          </pre>
        </div>
      </div>

      <div className="sys-console-footer">
        <span className="sys-foot-label">
          EXPLORING: <b>{layer.name}</b>
        </span>
        <span className="sys-foot-hint">Select tabs to inspect architectural layers</span>
      </div>
    </div>
  );
}
