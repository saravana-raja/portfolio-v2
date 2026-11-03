export function AgentFlow() {
  return (
    <svg
      className="diagram"
      viewBox="0 0 760 300"
      role="img"
      aria-labelledby="agent-diagram-title agent-diagram-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="agent-diagram-title">
        Support triage agent architecture on Amazon Bedrock AgentCore
      </title>
      <desc id="agent-diagram-desc">
        A terminal client opens a stateful session with an AgentCore harness
        running Amazon Nova Pro. Policy and FAQ text are injected into the
        prompt. The model calls a create bug report tool through AgentCore
        Gateway, which invokes a Lambda function that writes to DynamoDB. Test
        traces are exported to a Bedrock model evaluation job for correctness and
        completeness scoring.
      </desc>

      <defs>
        <marker
          id="agent-arrow"
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
          id="agent-arrow-accent"
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

      {/* client */}
      <rect className="box" x="8" y="62" width="112" height="68" />
      <text className="t" x="64" y="84" textAnchor="middle">CLIENT</text>
      <text className="t--mute" x="64" y="99" textAnchor="middle">terminal</text>
      <text className="t--mute" x="64" y="112" textAnchor="middle">runtime session</text>

      {/* harness */}
      <rect className="box box--accent" x="176" y="40" width="190" height="112" />
      <text className="t" x="188" y="60">AGENTCORE HARNESS</text>
      <line className="wire" x1="176" y1="68" x2="366" y2="68" opacity="0.5" />
      <text className="t--mute" x="188" y="86">Amazon Nova Pro</text>
      <text className="t--mute" x="188" y="101">system prompt + policy</text>
      <text className="t--mute" x="188" y="116">session boundary rules</text>
      <text className="t--accent" x="188" y="140">T=0 · topK=1</text>

      <line className="wire" x1="120" y1="96" x2="176" y2="96" markerEnd="url(#agent-arrow)" />

      {/* gateway */}
      <rect className="box" x="420" y="62" width="120" height="68" />
      <text className="t" x="480" y="82" textAnchor="middle">GATEWAY</text>
      <text className="t--mute" x="480" y="97" textAnchor="middle">registered tool</text>
      <text className="t--mute" x="480" y="110" textAnchor="middle">schema</text>
      <line className="wire" x1="366" y1="96" x2="420" y2="96" markerEnd="url(#agent-arrow)" />

      {/* lambda */}
      <rect className="box" x="592" y="62" width="120" height="68" />
      <text className="t" x="652" y="82" textAnchor="middle">LAMBDA</text>
      <text className="t--mute" x="652" y="97" textAnchor="middle">create_bug_report</text>
      <text className="t--mute" x="652" y="110" textAnchor="middle">Python 3.12</text>
      <line className="wire" x1="540" y1="96" x2="592" y2="96" markerEnd="url(#agent-arrow)" />

      {/* dynamodb */}
      <rect className="box box--fill" x="592" y="184" width="120" height="58" />
      <text className="t" x="652" y="204" textAnchor="middle">DYNAMODB</text>
      <text className="t--mute" x="652" y="219" textAnchor="middle">bug reports</text>
      <text className="t--mute" x="652" y="231" textAnchor="middle">ticket id</text>
      <line className="wire" x1="652" y1="130" x2="652" y2="184" markerEnd="url(#agent-arrow)" />

      {/* policy */}
      <rect className="box" x="176" y="198" width="190" height="48" />
      <text className="t" x="188" y="216">POLICY / FAQ</text>
      <text className="t--mute" x="188" y="231">injected, not retrieved</text>
      <path
        className="wire"
        d="M262 198 V152"
        markerEnd="url(#agent-arrow)"
        strokeDasharray="3 3"
        fill="none"
      />

      {/* eval */}
      <rect className="box" x="420" y="184" width="140" height="58" />
      <text className="t" x="432" y="202">EVAL PIPELINE</text>
      <text className="t--mute" x="432" y="217">curated traces</text>
      <text className="t--mute" x="432" y="230">correctness + completeness</text>
      <path
        className="wire"
        d="M330 152 V213 H420"
        strokeDasharray="3 3"
        fill="none"
        markerEnd="url(#agent-arrow)"
      />

      <text className="t--accent" x="8" y="278">
        no tool call until description, steps, and environment exist
      </text>
      <line className="wire" x1="8" y1="262" x2="150" y2="262" opacity="0.45" />
    </svg>
  );
}
