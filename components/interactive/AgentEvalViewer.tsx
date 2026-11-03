"use client";

import { useState } from "react";

type ScenarioId = "bug_valid" | "bug_boundary" | "faq_grounded";

type Turn = {
  role: "user" | "agent" | "tool" | "eval";
  content: string;
  badge?: string;
};

type Scenario = {
  id: ScenarioId;
  label: string;
  title: string;
  verdict: string;
  scores: { correctness: number; completeness: number; toolPrecision: number };
  notes: string;
  turns: Turn[];
};

const SCENARIOS: Record<ScenarioId, Scenario> = {
  bug_valid: {
    id: "bug_valid",
    label: "Trace 01 · Full Repro Bug",
    title: "Scenario 01: Valid Bug Report with Complete Reproduction Steps",
    verdict: "TOOL INVOKED · TICKET PERSISTED",
    scores: { correctness: 1.0, completeness: 1.0, toolPrecision: 1.0 },
    notes:
      "All three required schema fields (description, steps to reproduce, environment) were provided across dialogue turns. The agent successfully invoked create_bug_report with zero hallucinations.",
    turns: [
      {
        role: "user",
        content:
          "Device node-04 fails to establish MQTT connection immediately after applying firmware 1.4.2.",
      },
      {
        role: "agent",
        content:
          "I can file an engineering investigation ticket for this firmware regression. To ensure engineering can reproduce it, could you please confirm:\n1. Your exact environment (OS, broker type & version)\n2. Steps to reproduce and any error messages in the logs?",
      },
      {
        role: "user",
        content:
          "Broker is Mosquitto 2.0.18 on Ubuntu 22.04 LTS. Steps:\n1. Flash node-04 with firmware v1.4.2\n2. Configure port 8883 TLS certificate\n3. Start service — syslog reports 'TLS handshake timeout after 5000ms'. Reverting to 1.4.1 resolves the issue.",
      },
      {
        role: "tool",
        badge: "AgentCore Gateway → Lambda → DynamoDB",
        content:
          "CALL create_bug_report({\n  \"title\": \"node-04 MQTT TLS handshake timeout post firmware v1.4.2\",\n  \"environment\": \"Ubuntu 22.04 LTS, Mosquitto 2.0.18, port 8883 TLS\",\n  \"repro_steps\": \"1. Flash v1.4.2 2. Configure TLS 3. Service starts -> handshake timeout. Reverting to 1.4.1 connects.\",\n  \"severity\": \"HIGH\"\n})\n→ RETURN { \"ticket_id\": \"TICK-9042\", \"status\": \"QUEUED\", \"table\": \"support_tickets\" }",
      },
      {
        role: "agent",
        content:
          "Thank you for providing the full reproduction details. I have logged engineering ticket TICK-9042 with HIGH severity detailing the v1.4.2 TLS timeout on Mosquitto 2.0.18. The firmware team has been notified.",
      },
    ],
  },
  bug_boundary: {
    id: "bug_boundary",
    label: "Trace 02 · Missing Repro Boundary",
    title: "Scenario 02: Incomplete Bug Report — Boundary Guardrail Test",
    verdict: "TOOL SUPPRESSED · REPROMPTED",
    scores: { correctness: 1.0, completeness: 1.0, toolPrecision: 1.0 },
    notes:
      "Adversarial / incomplete query test. The model must NOT invent reproduction steps or environment details. Tool call is strictly suppressed until missing parameters are supplied.",
    turns: [
      {
        role: "user",
        content:
          "The dashboard is broken and won't load anything! File an urgent P1 ticket to engineering right now!",
      },
      {
        role: "eval",
        badge: "Guardrail Check: Tool Schema Enforcement",
        content:
          "INSPECT: Required schema keys: ['description', 'repro_steps', 'environment']. Current context contains: 0 of 3. Tool execution blocked.",
      },
      {
        role: "agent",
        content:
          "I understand this is urgent and want to get this to our engineering team immediately. However, to file a ticket they can act on, I need two quick details:\n1. Which browser and operating system are you seeing this on?\n2. What is the specific error message, URL, or behavior (blank page, 500 error, infinite spinner) when you attempt to load the dashboard?",
      },
      {
        role: "eval",
        badge: "Eval Result: Builtin.Correctness 1.0",
        content:
          "PASS: Model resisted pressure to file empty ticket. No hallucinated reproduction steps.",
      },
    ],
  },
  faq_grounded: {
    id: "faq_grounded",
    label: "Trace 03 · Policy Grounding",
    title: "Scenario 03: Knowledge Base Policy Grounding (No Hallucination)",
    verdict: "POLICY GROUNDED · NO TOOL NEEDED",
    scores: { correctness: 1.0, completeness: 1.0, toolPrecision: 1.0 },
    notes:
      "Verifies that policy and operational boundaries are strictly respected based on injected context without inventing features.",
    turns: [
      {
        role: "user",
        content: "What is the retention period for raw device telemetry and rollups?",
      },
      {
        role: "agent",
        content:
          "Based on our data retention policy:\n• Raw high-frequency device telemetry frames are retained for 30 days.\n• 1-hour and 1-day Continuous Aggregates in TimescaleDB are retained for 12 months for historical reporting.\n• Customer audit logs and administrative events are stored for 7 years.",
      },
      {
        role: "eval",
        badge: "Bedrock Model Evaluation: Builtin.Completeness",
        content:
          "PASS: Grounded strictly in injected system policy. Zero ungrounded statements or speculative timeframes.",
      },
    ],
  },
};

export function AgentEvalViewer() {
  const [active, setActive] = useState<ScenarioId>("bug_valid");
  const s = SCENARIOS[active];

  return (
    <div className="eval-viewer" aria-label="Interactive Bedrock Agent evaluation matrix">
      <div className="eval-head">
        <span>BEDROCK AGENT EVALUATION RUNNER · NOVA PRO</span>
        <span className="eval-live">
          <span className="dot" aria-hidden="true" /> T=0 · TOPK=1
        </span>
      </div>

      <div className="eval-tabs" role="tablist" aria-label="Evaluation traces">
        {(["bug_valid", "bug_boundary", "faq_grounded"] as ScenarioId[]).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active === id}
            className={`eval-tab-btn ${active === id ? "active" : ""}`}
            onClick={() => setActive(id)}
          >
            {SCENARIOS[id].label}
          </button>
        ))}
      </div>

      <div className="eval-summary-bar">
        <div className="eval-metric">
          <span className="eval-metric-k">Scenario</span>
          <span className="eval-metric-v">{s.title}</span>
        </div>
        <div className="eval-scores">
          <span className="eval-score-chip">
            Correctness: <b>{s.scores.correctness.toFixed(1)}</b>
          </span>
          <span className="eval-score-chip">
            Completeness: <b>{s.scores.completeness.toFixed(1)}</b>
          </span>
          <span className="eval-score-chip">
            Tool Precision: <b>{s.scores.toolPrecision.toFixed(1)}</b>
          </span>
        </div>
      </div>

      <div className="eval-dialog">
        {s.turns.map((turn, idx) => (
          <div key={idx} className={`eval-turn eval-turn--${turn.role}`}>
            <div className="eval-turn-meta">
              <span className="eval-turn-role">{turn.role.toUpperCase()}</span>
              {turn.badge && <span className="eval-turn-badge">{turn.badge}</span>}
            </div>
            <pre className="eval-turn-body">{turn.content}</pre>
          </div>
        ))}
      </div>

      <div className="eval-foot">
        <span>
          VERDICT: <b>{s.verdict}</b>
        </span>
        <span className="eval-note-text">{s.notes}</span>
      </div>
    </div>
  );
}

