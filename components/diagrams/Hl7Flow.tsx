export function Hl7Flow() {
  return (
    <svg
      className="diagram"
      viewBox="0 0 760 300"
      role="img"
      aria-labelledby="hl7-diagram-title hl7-diagram-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="hl7-diagram-title">
        HL7 result flow from a laboratory analyzer to the cloud API
      </title>
      <desc id="hl7-diagram-desc">
        A laboratory analyzer sends HL7 v2 messages over raw TCP with MLLP
        framing. The Python interface reads, parses, validates and deduplicates
        each message, posts results to the cloud API, and returns an
        acknowledgement. Malformed frames are quarantined for replay rather than
        discarded.
      </desc>

      <defs>
        <marker
          id="hl7-arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 8 4 0 8z" fill="var(--text-faint)" />
        </marker>
        <marker
          id="hl7-arrow-accent"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 8 4 0 8z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* analyzer */}
      <rect className="box" x="8" y="64" width="126" height="86" />
      <text className="t" x="71" y="88" textAnchor="middle">ANALYZER</text>
      <text className="t--mute" x="71" y="104" textAnchor="middle">HL7 v2 · MLLP</text>
      <text className="t--mute" x="71" y="117" textAnchor="middle">raw TCP</text>
      <text className="t--mute" x="71" y="133" textAnchor="middle">vendor quirks</text>

      {/* interface */}
      <rect className="box box--accent" x="196" y="40" width="200" height="160" />
      <text className="t" x="208" y="58">LIS INTERFACE · Python</text>
      <line className="wire" x1="196" y1="66" x2="396" y2="66" opacity="0.5" />
      <text className="t--mute" x="208" y="84">01  read MLLP frame</text>
      <text className="t--mute" x="208" y="100">02  parse segments</text>
      <text className="t--mute" x="208" y="116">03  validate result</text>
      <text className="t--mute" x="208" y="132">04  dedupe by control ID</text>
      <text className="t--mute" x="208" y="148">05  POST to cloud API</text>
      <text className="t--accent" x="208" y="175">long-running · supervised</text>

      {/* cloud */}
      <rect className="box" x="470" y="52" width="130" height="70" />
      <text className="t" x="535" y="72" textAnchor="middle">CLOUD API</text>
      <text className="t--mute" x="535" y="87" textAnchor="middle">results endpoint</text>
      <text className="t--mute" x="535" y="100" textAnchor="middle">structured result</text>

      <line className="wire" x1="396" y1="87" x2="470" y2="87" markerEnd="url(#hl7-arrow)" />
      <text className="t--mute" x="404" y="79">HTTPS</text>

      {/* dashboard */}
      <rect className="box box--fill" x="470" y="168" width="130" height="58" />
      <text className="t" x="535" y="188" textAnchor="middle">LAB DASHBOARD</text>
      <text className="t--mute" x="535" y="203" textAnchor="middle">result visible</text>
      <text className="t--mute" x="535" y="215" textAnchor="middle">no re-typing</text>
      <line className="wire" x1="535" y1="122" x2="535" y2="168" markerEnd="url(#hl7-arrow)" />

      {/* ack */}
      <path
        className="wire wire--accent"
        d="M196 190 H104 V150"
        markerEnd="url(#hl7-arrow-accent)"
        fill="none"
      />
      <text className="t--accent" x="112" y="184">ACK / MLLP</text>
      <text className="t--mute" x="112" y="197">after persist</text>

      {/* quarantine */}
      <rect className="box" x="196" y="232" width="200" height="44" />
      <text className="t" x="208" y="251">QUARANTINE + REPLAY</text>
      <text className="t--mute" x="208" y="265">malformed frame kept, not dropped</text>
      <path
        className="wire"
        d="M296 200 V232"
        markerEnd="url(#hl7-arrow)"
        strokeDasharray="3 3"
        fill="none"
      />

      <text className="t--accent" x="470" y="262">no silent data loss</text>
      <line className="wire" x1="470" y1="271" x2="600" y2="271" opacity="0.45" />
    </svg>
  );
}
