"use client";

import { useEffect, useState } from "react";
import { emailAddress } from "@/lib/site";

export function CopyEmail() {
  const [address, setAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setAddress(emailAddress());
  }, []);

  async function copy() {
    const value = address ?? emailAddress();
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <span className="copy-email">
      <button
        type="button"
        className="reveal"
        onClick={copy}
        aria-label="Copy email address to clipboard"
      >
        {address ?? "amailtosaravanaraja [at] gmail [dot] com"}
      </button>
      <span className="hint" aria-live="polite">
        {copied ? "copied ✓" : "click to copy"}
      </span>
    </span>
  );
}
