import { Callout } from "@/components/case/Callout";
import { Figure } from "@/components/case/Figure";
import { PacketInspector } from "@/components/interactive/PacketInspector";
import { TelemetryPath } from "@/components/diagrams/TelemetryPath";

export function IotTelemetryCase() {
  return (
    <div className="prose">
      <section id="context">
        <h2>
          <span className="n">01</span> Context
        </h2>
        <p>
          The platform connects a fleet of cloud-connected devices to a
          multi-tenant dashboard. Each device publishes a payload every five
          seconds: readings, firmware version, sequence number, and whatever else
          that model was configured to send. A Node/Express API already handled
          authentication, roles, and CRUD. The telemetry path needed a different
          shape — long-lived connections, a constant write cadence, and live
          push to browsers.
        </p>
        <p>
          I designed and built that path: MQTT ingest, parsing and validation,
          selective persistence, an in-memory device-state layer, and a WebSocket
          fan-out. Historical charts were served from TimescaleDB continuous
          aggregates. The mobile, frontend, and embedded teams consumed the same
          API surface.
        </p>
      </section>

      <section id="constraints">
        <h2>
          <span className="n">02</span> Constraints
        </h2>
        <ul>
          <li>
            100+ devices publishing every five seconds — roughly{" "}
            <strong>20 messages per second</strong> aggregate, with reconnect
            bursts after network drops.
          </li>
          <li>
            Payload shapes varied by device model. Filtering belonged in the
            gateway, not in firmware that was already in the field.
          </li>
          <li>
            1,000+ concurrent dashboard sockets, many watching the same devices.
          </li>
          <li>
            One Linux host, Docker, Nginx in front. No Kafka, no managed queue,
            no second database to operate.
          </li>
          <li>
            Live updates could not wait on a write, and history queries could not
            compete with ingest.
          </li>
        </ul>
        <Callout tag="Constraint">
          <p>
            The fleet was already deployed. Any solution had to work with the
            payloads the devices were sending — not a protocol we wished they
            sent.
          </p>
        </Callout>
      </section>

      <section id="architecture">
        <h2>
          <span className="n">03</span> Architecture
        </h2>
        <p>
          Telemetry moves left to right: devices publish to the broker, the
          gateway parses and validates each message, updates in-memory state, and
          pushes a snapshot over WebSockets. Only rows that pass the schema reach
          PostgreSQL. Continuous aggregates turn those rows into chart-friendly
          buckets.
        </p>
        <Figure
          number="01.1"
          caption="Ingest, live state, and history. Only the highlighted path touches the database."
          note="Drawn from the deployed topology; hostnames and topics removed."
        >
          <TelemetryPath />
        </Figure>
        <p>
          The important separation is between <strong>what is true now</strong>{" "}
          and <strong>what happened</strong>. Live state is a small map in
          memory; history is append-only rows plus precomputed rollups. Dashboards
          ask for one or the other, never both through the same query.
        </p>
        <h3>One message, end to end</h3>
        <p>
          A sample payload below is decoded from the same bytes the gateway
          receives. The schema decides what survives; the cache update happens
          regardless of whether the row is persisted.
        </p>
        <PacketInspector />
      </section>

      <section id="decisions">
        <h2>
          <span className="n">04</span> Decisions
        </h2>
        <Callout tag="Decision">
          <p>
            <strong>In-memory device state instead of a read per message.</strong>{" "}
            Building each live snapshot from the last persisted row would have
            meant a database read for every incoming message — twenty useless
            queries per second, growing with the fleet.
          </p>
          <p>
            Cost: state is lost on restart and has to be rebuilt from the latest
            persisted reading. Benefit: the hot path is a map lookup, and the
            database disappears from live updates entirely.
          </p>
        </Callout>
        <Callout tag="Decision">
          <p>
            <strong>
              TimescaleDB continuous aggregates instead of aggregating at request
              time.
            </strong>{" "}
            Dashboards ask for the same windows repeatedly. Precomputing buckets
            keeps chart loads cheap and predictable.
          </p>
          <p>
            Cost: a refresh lag between raw rows and rollups, which had to be
            shown honestly in the UI. Benefit: history queries stop scaling with
            the number of raw rows.
          </p>
        </Callout>
        <Callout tag="Trade-off">
          <p>
            <strong>One gateway process, not a streaming platform.</strong> At
            20 msg/s, a queue and a second service would have added operational
            surface and a new failure mode without buying throughput we needed.
            The ceiling is real: this design scales up, not out. I would split
            ingest from fan-out at roughly ten times the client count.
          </p>
        </Callout>
      </section>

      <section id="failures">
        <h2>
          <span className="n">05</span> Failure modes
        </h2>
        <ul>
          <li>
            <strong>Malformed payloads.</strong> Log the device, reason, and frame
            reference, then drop the message. One bad firmware build must not
            take down the ingest loop.
          </li>
          <li>
            <strong>Reconnect storms.</strong> Device state is keyed by id and
            replaced on the newest timestamp and sequence number. A dashboard
            connecting mid-storm gets current state instead of replaying history.
          </li>
          <li>
            <strong>Slow WebSocket consumers.</strong> Each client gets a bounded
            queue and drop-oldest behaviour for live frames. Fresh state matters
            more than every intermediate frame.
          </li>
          <li>
            <strong>Restart.</strong> The cache is rebuilt from the latest
            persisted reading before the gateway starts accepting connections, so
            dashboards do not briefly see stale devices as online.
          </li>
        </ul>
      </section>

      <section id="outcome">
        <h2>
          <span className="n">06</span> Outcome
        </h2>
        <ul>
          <li>100+ devices ingested continuously at a five-second cadence.</li>
          <li>~20 messages per second sustained, with dashboard state always current.</li>
          <li>1,000+ concurrent clients served over WebSockets.</li>
          <li>Zero per-message database reads for live device state.</li>
          <li>History served from continuous aggregates rather than raw scans.</li>
        </ul>
        <p>
          The system stayed on one host. That was the point: the constraint was
          operational simplicity at this scale, not a benchmark.
        </p>
      </section>

      <section id="again">
        <h2>
          <span className="n">07</span> If I did it again
        </h2>
        <ul>
          <li>
            Add per-device rate limiting and ingest metrics on day one. A single
            misbehaving firmware build can dominate a shared loop, and you want
            that visible before a customer notices.
          </li>
          <li>
            Build a payload replay harness before the first firmware rollout.
            Real captured traffic beats invented test cases, especially for
            protocol edge cases.
          </li>
          <li>
            Split ingest from fan-out once concurrent clients grow by an order of
            magnitude, keeping the same state contract so the change is internal.
          </li>
        </ul>
      </section>
    </div>
  );
}
