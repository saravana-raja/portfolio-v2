"use client";

import { useEffect, useMemo, useState } from "react";

const POINTS = 30;

function waveform(seed: number, phase: number): number[] {
  return Array.from({ length: POINTS }, (_, index) => {
    const x = (index / (POINTS - 1)) * Math.PI * 3.2;
    return (
      Math.sin(x + seed) * 0.52 +
      Math.sin(x * 2.4 + seed * 1.7 + phase * 0.6) * 0.26 +
      Math.sin(phase * 0.9 + index * 0.5) * 0.1
    );
  });
}

function toPolyline(values: number[]): string {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 12 - value * 8;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export function TelemetryStrip() {
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>("node-01");

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setTick((value) => value + 1), 1100);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const nodes = useMemo(() => {
    const phase = tick * 0.35;
    return [
      {
        id: "node-01",
        rate: 18.4 + Math.sin(phase) * 0.7,
        state: "live" as const,
        points: toPolyline(waveform(0.4, phase)),
        details: "MQTT TLS 8883 · QoS 1 · Jitter 1.8ms · Cache HIT (0 DB reads)",
      },
      {
        id: "node-02",
        rate: 20.1 + Math.sin(phase + 1.2) * 0.5,
        state: "live" as const,
        points: toPolyline(waveform(2.1, phase + 0.8)),
        details: "MQTT TLS 8883 · QoS 1 · Jitter 2.2ms · Cache HIT (0 DB reads)",
      },
      {
        id: "node-03",
        rate: null,
        state: "offline" as const,
        points: "0,12 100,12",
        details: "Keep-alive expired (>15s) · Retrying exponential backoff",
      },
    ];
  }, [tick]);

  const active = nodes.find((n) => n.id === selectedNode);

  return (
    <div className="console" aria-label="Synthetic telemetry feed">
      <div className="console-head">
        <span>FIG.00 — SYNTHETIC FEED</span>
        <span className="live">
          <span className="dot" aria-hidden="true" /> demo
        </span>
      </div>
      <div className="console-body">
        {nodes.map((node) => (
          <div
            className={`telem-row ${selectedNode === node.id ? "telem-row--selected" : ""}`}
            key={node.id}
            data-state={node.state}
            onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedNode(node.id === selectedNode ? null : node.id);
              }
            }}
            aria-pressed={selectedNode === node.id}
            aria-label={`${node.id} ${node.state} telemetry row, click for diagnostics`}
            style={{ cursor: "pointer" }}
          >
            <span className="telem-id">{node.id}</span>
            <svg
              className="telem-wave"
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline points={node.points} />
            </svg>
            <span className="telem-rate">
              {node.rate === null ? "—" : node.rate.toFixed(1)}
            </span>
            <span className="telem-state" data-state={node.state}>
              {node.state}
            </span>
          </div>
        ))}
        {active && (
          <div className="telem-diagnostics" aria-live="polite">
            <span className="telem-diag-k">DIAGNOSTIC [{active.id}]</span>
            <span className="telem-diag-v">{active.details}</span>
          </div>
        )}
        <p className="visually-hidden">
          Illustrative feed: two nodes streaming at roughly twenty messages per
          second, one node offline. This is synthetic data, not live device data.
        </p>
      </div>
      <div className="console-foot">
        <span>SYNTHETIC · CLICK ROW TO INSPECT</span>
        <button
          type="button"
          className="console-ctrl"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? "resume" : "pause"}
        </button>
      </div>
    </div>
  );
}
