import { Section } from "@/components/ui/Section";

const principles = [
  {
    n: "01",
    title: "Contracts & Schema First",
    body: "Define strict schema boundaries and error behaviors across clients and microservices before implementation. Clear API contracts eliminate breaking changes and integration drift.",
    artifact: (
      <>
        <b>contract</b> POST /v1/ingest → 202 {"{ accepted, dropped, batch_id }"}
      </>
    ),
  },
  {
    n: "02",
    title: "Resilience & Safe Failure",
    body: "Validate strictly at the protocol boundary and isolate corrupt payloads with diagnostic context. Retries must be idempotent so network blips never cause duplicated clinical or financial records.",
    artifact: (
      <>
        <b>idempotent</b> lookup(control_id) → cache hit: ACK 200 without duplicate insert
      </>
    ),
  },
  {
    n: "03",
    title: "Cache the Hot Path",
    body: "Serve high-concurrency live state directly from memory while offloading analytical rollups to continuous aggregates. The relational database never sits in the critical loop of rapid heartbeats.",
    artifact: (
      <>
        <b>hot path</b> ingress → state cache → WebSocket broadcast (0 SELECT queries)
      </>
    ),
  },
  {
    n: "04",
    title: "Pragmatic Architecture",
    body: "Right-size systems to real operational requirements. Containerized Linux services, supervised daemons, and clear logging outperform unnecessarily complex distributed topologies.",
    artifact: (
      <>
        <b>topology</b> Docker Compose · Nginx · PostgreSQL 16 · AWS EC2
      </>
    ),
  },
];

export function Approach() {
  return (
    <Section
      id="approach"
      index="02"
      rail="Approach"
      title={
        <>
          Engineering principles &amp; <em>architecture standards.</em>
        </>
      }
      note="Derived from production operations: prioritizing reliability, predictable latency, and maintainable systems."
    >
      <div className="principles">
        {principles.map((principle) => (
          <article className="principle" key={principle.n}>
            <span className="principle-num">{principle.n}</span>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
            <p className="artifact">{principle.artifact}</p>
          </article>
        ))}
      </div>
      <p className="approach-close">
        Designing systems that remain dependable under real-world network turbulence and production scale.
      </p>
    </Section>
  );
}
