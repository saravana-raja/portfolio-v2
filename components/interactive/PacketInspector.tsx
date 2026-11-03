"use client";

import { useState } from "react";

const HEX =
  "7b 22 64 22 3a 22 6e 6f 64 65 2d 30 31 22 2c 22 74 73 22 3a 31 37 36 31 37 33 39 32 30 30 2c 22 73 65 71 22 3a 31 38 34 31 2c 22 70 68 22 3a 37 2e 31 32 2c 22 74 22 3a 32 34 2e 38 2c 22 66 77 22 3a 22 31 2e 34 2e 32 22 2c 22 62 61 74 22 3a 39 31 7d";

const DECODED = `{
  "d": "node-01",
  "ts": 1761739200,
  "seq": 1841,
  "ph": 7.12,
  "t": 24.8,
  "fw": "1.4.2",
  "bat": 91
}`;

export function PacketInspector() {
  const [open, setOpen] = useState(false);
  const bytes = HEX.split(" ");

  return (
    <div className="packet">
      <div className="packet-head">
        <span>MQTT PAYLOAD · {bytes.length} BYTES</span>
        <span className="name">fleet/node-01/telemetry</span>
      </div>

      <div className="packet-hex" aria-hidden="true">
        {bytes.map((byte, index) => (
          <span
            className="packet-byte"
            data-key={index < 2 || index === bytes.length - 1}
            key={`${byte}-${index}`}
          >
            {byte}
          </span>
        ))}
      </div>

      <p className="visually-hidden">
        A sample MQTT payload containing device id node-01, timestamp, sequence
        number, pH, temperature, firmware version, and battery level.
      </p>

      <button
        type="button"
        className="packet-toggle"
        aria-expanded={open}
        aria-controls="packet-decoded"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "hide decoded payload" : "inspect decoded payload"}</span>
        <span className="plus" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="packet-body" id="packet-decoded">
          <pre style={{ margin: 0 }}>{DECODED}</pre>
          <p style={{ margin: "10px 0 0" }}>
            <span className="k">schema</span>{" "}
            <span className="v">accept d · ts · seq · ph · t · fw</span>
            <br />
            <span className="k">filter</span>{" "}
            <span className="v">drop bat — not in the device schema</span>
            <br />
            <span className="k">state</span>{" "}
            <span className="v">cache node-01, no SELECT</span>
            <br />
            <span className="k">write</span>{" "}
            <span className="v">1 row → TimescaleDB</span>
          </p>
        </div>
      )}

      <div className="packet-verdict">
        <span>
          verdict <b>accept</b>
        </span>
        <span>
          persisted <b>1 row</b>
        </span>
        <span>
          dropped <b>1 field</b>
        </span>
        <span>illustrative payload</span>
      </div>
    </div>
  );
}
