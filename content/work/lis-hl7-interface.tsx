import { Callout } from "@/components/case/Callout";
import { Figure } from "@/components/case/Figure";
import { Hl7Flow } from "@/components/diagrams/Hl7Flow";
import { Hl7Inspector } from "@/components/interactive/Hl7Inspector";

export function LisHl7Case() {
  return (
    <div className="prose">
      <section id="context">
        <h2>
          <span className="n">01</span> Context
        </h2>
        <p>
          Laboratory analyzers produce results on their own schedule. Before this
          interface existed, those results were read off the analyzer and typed
          into the cloud system by hand — a slow step with a predictable failure
          mode: the value that gets mistyped at 2 a.m.
        </p>
        <p>
          I built the Python service that sits between the analyzer and the cloud
          LIS. It opens a long-lived TCP connection, reads HL7 v2 messages, parses
          and validates them, maps them into the platform&apos;s result model,
          posts them to the cloud API, and returns the acknowledgement the
          analyzer expects. When a frame is bad, it keeps the frame instead of
          pretending nothing arrived.
        </p>
      </section>

      <section id="constraints">
        <h2>
          <span className="n">02</span> Constraints
        </h2>
        <ul>
          <li>
            HL7 v2 over raw TCP with MLLP framing. No REST, no retry-friendly
            client library, no shared schema registry.
          </li>
          <li>
            Analyzers expect a timely ACK. Miss it and they resend, which turns a
            small network blip into duplicate results.
          </li>
          <li>
            TCP gives you bytes, not messages. Frames can arrive split or
            coalesced, and the connection can drop mid-frame.
          </li>
          <li>
            Each analyzer model has its own idea about optional fields,
            separators, and encoding.
          </li>
          <li>
            Results are clinical data. Silent loss and silent duplication are both
            unacceptable.
          </li>
          <li>
            The process runs for weeks on a Linux host under Docker. Restart
            behaviour is part of the design.
          </li>
        </ul>
        <Callout tag="Constraint">
          <p>
            The analyzer is the source of truth and cannot be modified. The
            interface has to be tolerant at the edge and strict at the boundary:
            accept mess, emit a clean structured result.
          </p>
        </Callout>
      </section>

      <section id="architecture">
        <h2>
          <span className="n">03</span> Architecture
        </h2>
        <p>
          The service is a supervised long-running process per analyzer
          connection. It reads MLLP frames, parses segments, validates required
          fields, deduplicates by control ID, posts the result, then ACKs. A
          failure to persist means no ACK — the analyzer resends, and the
          idempotency key makes that safe.
        </p>
        <Figure
          number="02.1"
          caption="Analyzer → interface → cloud, with the ACK path that keeps the analyzer from resending."
          note="Two writes matter: the result in the cloud, and the acknowledgement back to the analyzer."
        >
          <Hl7Flow />
        </Figure>

        <h3>What arrives on the wire</h3>
        <p>
          HL7 is pipe-delimited and positional: a field is identified by where it
          sits, not by a name. Reading it correctly means respecting the encoding
          characters declared in <code>MSH</code>, not hard-coding <code>|</code>{" "}
          and <code>^</code>.
        </p>
        <Figure
          number="02.2"
          caption="An ORU^R01 result message, annotated. Patient values are illustrative."
          note="Click any segment in the frame or nav to inspect field definitions and parser rules."
        >
          <Hl7Inspector />
        </Figure>
      </section>

      <section id="decisions">
        <h2>
          <span className="n">04</span> Decisions
        </h2>
        <Callout tag="Decision">
          <p>
            <strong>Quarantine malformed messages, do not discard them.</strong>{" "}
            A message that fails validation is stored with its raw frame and
            reason, then replayed after a fix. Dropping it would keep the
            interface green while quietly losing a patient result.
          </p>
          <p>
            Cost: an operational queue and someone who has to look at it. Benefit:
            failures are visible and recoverable instead of invisible.
          </p>
        </Callout>
        <Callout tag="Decision">
          <p>
            <strong>Idempotency from the message control ID, not from time.</strong>{" "}
            If an ACK is lost, the analyzer resends the same logical result. The
            control ID plus result identity makes the second write a no-op.
          </p>
          <p>
            Cost: a dedupe lookup on every message. Benefit: retries stop being a
            clinical data problem.
          </p>
        </Callout>
        <Callout tag="Decision">
          <p>
            <strong>One internal result model, one adapter per analyzer.</strong>{" "}
            Vendor quirks stay in the adapter; everything downstream sees the
            same shape. Adding an analyzer means writing an adapter, not branching
            inside the parser.
          </p>
          <p>
            Cost: some duplication between adapters. Benefit: a new device model
            cannot break an existing one.
          </p>
        </Callout>
      </section>

      <section id="failures">
        <h2>
          <span className="n">05</span> Failure modes
        </h2>
        <ul>
          <li>
            <strong>Partial frame or dropped connection.</strong> The MLLP buffer
            is kept per connection and only cleared on a complete frame; the
            reader reconnects and starts clean.
          </li>
          <li>
            <strong>Duplicate sends after a lost ACK.</strong> Control-ID
            deduplication turns a resend into a no-op, and the ACK is reissued.
          </li>
          <li>
            <strong>Analyzer-specific fields.</strong> Optional segments and
            locally defined codes are handled in the adapter, with validation
            errors that name the field — not a generic parse failure.
          </li>
          <li>
            <strong>Encoding surprises.</strong> The declared character set is
            respected, and the raw frame is retained for anything that still fails
            to map.
          </li>
          <li>
            <strong>Process death.</strong> Supervised restart with the last
            processed position derived from persisted results, so a restart does
            not silently skip a window.
          </li>
        </ul>
      </section>

      <section id="outcome">
        <h2>
          <span className="n">06</span> Outcome
        </h2>
        <ul>
          <li>
            The manual transcription step disappeared from the lab workflow.
          </li>
          <li>
            Results move from analyzer to cloud through one validated path, with
            an ACK that reflects persistence rather than receipt.
          </li>
          <li>
            Malformed traffic is retained and replayable instead of being lost in
            a log line.
          </li>
          <li>
            New analyzer models are added as adapters, not as parser branches.
          </li>
        </ul>
        <p>
          The interface has one job and no UI. Success looks like nobody in the
          lab thinking about it.
        </p>
      </section>

      <section id="again">
        <h2>
          <span className="n">07</span> If I did it again
        </h2>
        <ul>
          <li>
            Record real analyzer traffic for a replay harness before the first
            integration. Vendor documentation and vendor behaviour are related but
            not identical.
          </li>
          <li>
            Expose per-analyzer health — last frame, last ACK, quarantine depth —
            from day one. “Is it working?” should be answerable without reading
            logs.
          </li>
          <li>
            Put quarantine review in front of the lab team, not only engineering.
            They can identify a bad result faster than anyone else.
          </li>
        </ul>
      </section>
    </div>
  );
}
