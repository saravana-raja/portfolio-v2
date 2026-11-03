export function TelemetryPath() {
  return (
    <svg
      className="diagram"
      viewBox="0 0 760 300"
      role="img"
      aria-labelledby="iot-diagram-title iot-diagram-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="iot-diagram-title">
        Telemetry path from devices through MQTT and the FastAPI gateway to
        dashboards and TimescaleDB
      </title>
      <desc id="iot-diagram-desc">
        Devices publish every five seconds to an MQTT broker. A FastAPI gateway
        parses, validates, filters and caches the payload. Live state is pushed
        to dashboard clients over WebSockets without a database read, while only
        relevant rows are written to PostgreSQL with TimescaleDB continuous
        aggregates for history.
      </desc>

      <defs>
        <marker
          id="iot-arrow"
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
          id="iot-arrow-accent"
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

      {/* devices */}
      <rect className="box" x="8" y="70" width="110" height="72" />
      <text className="t" x="63" y="94" textAnchor="middle">DEVICES</text>
      <text className="t--mute" x="63" y="109" textAnchor="middle">100+ nodes</text>
      <text className="t--mute" x="63" y="121" textAnchor="middle">5s cadence</text>

      {/* broker */}
      <rect className="box" x="150" y="70" width="110" height="72" />
      <text className="t" x="205" y="94" textAnchor="middle">MQTT</text>
      <text className="t--mute" x="205" y="109" textAnchor="middle">broker</text>
      <text className="t--mute" x="205" y="121" textAnchor="middle">per-fleet topics</text>

      <line className="wire" x1="118" y1="106" x2="150" y2="106" markerEnd="url(#iot-arrow)" />
      <line className="wire" x1="260" y1="106" x2="292" y2="106" markerEnd="url(#iot-arrow)" />

      {/* gateway */}
      <rect className="box box--accent" x="292" y="40" width="180" height="130" />
      <text className="t" x="304" y="58">GATEWAY · FastAPI</text>
      <line className="wire" x1="292" y1="66" x2="472" y2="66" opacity="0.5" />
      <text className="t--mute" x="304" y="82">01  parse payload</text>
      <text className="t--mute" x="304" y="98">02  validate schema</text>
      <text className="t--mute" x="304" y="114">03  filter fields</text>
      <text className="t--mute" x="304" y="130">04  update live state</text>
      <text className="t--accent" x="304" y="152">single long-running process</text>

      {/* fan-out */}
      <rect className="box" x="512" y="64" width="120" height="60" />
      <text className="t" x="572" y="88" textAnchor="middle">WS FAN-OUT</text>
      <text className="t--mute" x="572" y="103" textAnchor="middle">state push</text>

      {/* clients */}
      <rect className="box box--fill" x="664" y="64" width="88" height="60" />
      <text className="t" x="708" y="84" textAnchor="middle">CLIENTS</text>
      <text className="t--mute" x="708" y="98" textAnchor="middle">1,000+</text>
      <text className="t--mute" x="708" y="110" textAnchor="middle">sockets</text>

      <line className="wire" x1="472" y1="94" x2="512" y2="94" markerEnd="url(#iot-arrow)" />
      <line className="wire" x1="632" y1="94" x2="664" y2="94" markerEnd="url(#iot-arrow)" />

      {/* in-memory state */}
      <rect className="box" x="292" y="206" width="180" height="44" />
      <text className="t" x="304" y="224">IN-MEMORY STATE</text>
      <text className="t--mute" x="304" y="239">device → last reading</text>
      <line
        className="wire wire--accent"
        x1="382"
        y1="170"
        x2="382"
        y2="206"
        markerStart="url(#iot-arrow-accent)"
        markerEnd="url(#iot-arrow-accent)"
      />
      <text className="t--accent" x="390" y="192">no SELECT</text>

      {/* timescale */}
      <path
        className="wire"
        d="M472 132 H496 V190"
        markerEnd="url(#iot-arrow)"
        fill="none"
      />
      <text className="t--mute" x="478" y="156">rows</text>
      <rect className="box" x="512" y="190" width="120" height="56" />
      <text className="t" x="572" y="209" textAnchor="middle">POSTGRES</text>
      <text className="t--mute" x="572" y="222" textAnchor="middle">TimescaleDB</text>
      <text className="t--mute" x="572" y="235" textAnchor="middle">relevant rows only</text>

      {/* aggregates */}
      <rect className="box box--fill" x="664" y="190" width="88" height="56" />
      <text className="t" x="708" y="209" textAnchor="middle">AGGREGATES</text>
      <text className="t--mute" x="708" y="222" textAnchor="middle">precomputed</text>
      <text className="t--mute" x="708" y="235" textAnchor="middle">history</text>
      <line className="wire" x1="632" y1="218" x2="664" y2="218" markerEnd="url(#iot-arrow)" />

      {/* annotation */}
      <text className="t--accent" x="292" y="278">
        live dashboards never wait on a database read
      </text>
      <line className="wire" x1="8" y1="270" x2="270" y2="270" opacity="0.45" />
    </svg>
  );
}
