"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { emailAddress, site } from "@/lib/site";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Case studies" | "Actions" | "Elsewhere";
  keywords?: string;
  run: () => void;
};

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const go = useCallback((hash: string) => {
    setOpen(false);
    if (window.location.pathname === "/") {
      document.querySelector(hash)?.scrollIntoView({
        behavior: shouldReduceMotion() ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", hash);
    } else {
      window.location.assign(`/${hash}`);
    }
  }, []);

  const copyEmail = useCallback(async () => {
    const address = emailAddress();
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      const field = document.createElement("textarea");
      field.value = address;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setNotice("Email copied to clipboard");
    window.setTimeout(() => setNotice(""), 2400);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.dataset.theme;
    const next = current === "light" || current === "paper" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("sr-theme", next);
    } catch {
      /* private mode */
    }
    window.dispatchEvent(new CustomEvent("sr:theme", { detail: next }));
    setNotice(`Theme: ${next}`);
    window.setTimeout(() => setNotice(""), 2000);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const openExternal = (url: string) =>
      window.open(url, "_blank", "noopener,noreferrer");
    return [
      { id: "work", group: "Navigate", label: "Selected work", hint: "01", run: () => go("#work") },
      { id: "trajectory", group: "Navigate", label: "Career trajectory", hint: "02", run: () => go("#trajectory") },
      { id: "toolkit", group: "Navigate", label: "Engineering toolkit", hint: "03", run: () => go("#toolkit") },
      { id: "credentials", group: "Navigate", label: "Credentials & certs", hint: "04", run: () => go("#credentials") },
      { id: "contact", group: "Navigate", label: "Get in touch", hint: "05", run: () => go("#contact") },
      {
        id: "case-iot",
        group: "Case studies",
        label: "01 · High-concurrency streaming gateway",
        hint: "case",
        keywords: "streaming mqtt websocket timescaledb cache api real-time",
        run: () => router.push("/work/iot-telemetry-gateway"),
      },
      {
        id: "case-hl7",
        group: "Case studies",
        label: "02 · Mission-critical protocol gateway & ETL",
        hint: "case",
        keywords: "hl7 etl protocol tcp pipeline postgresql analyzer",
        run: () => router.push("/work/lis-hl7-interface"),
      },
      {
        id: "case-agent",
        group: "Case studies",
        label: "03 · Serverless agentic support system",
        hint: "case",
        keywords: "ai bedrock agent nova lambda dynamodb serverless triage",
        run: () => router.push("/work/bedrock-support-agent"),
      },
      { id: "email", group: "Actions", label: "Copy email address", hint: "copy", run: copyEmail },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé (PDF)",
        hint: "pdf",
        run: () => {
          setOpen(false);
          window.open(site.resume, "_blank", "noopener,noreferrer");
        },
      },
      { id: "theme", group: "Actions", label: "Toggle dark / light theme", hint: "◐", run: toggleTheme },
      {
        id: "colophon",
        group: "Actions",
        label: "Colophon — how this site is built",
        run: () => {
          setOpen(false);
          router.push("/colophon");
        },
      },
      { id: "github", group: "Elsewhere", label: "GitHub", hint: "↗", run: () => openExternal(site.github) },
      { id: "linkedin", group: "Elsewhere", label: "LinkedIn", hint: "↗", run: () => openExternal(site.linkedin) },
    ];
  }, [copyEmail, go, router, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.keywords ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [commands, query]);

  const groups = useMemo(() => {
    const order: Command["group"][] = ["Navigate", "Case studies", "Actions", "Elsewhere"];
    return order
      .map((group) => ({ group, items: filtered.filter((c) => c.group === group) }))
      .filter((entry) => entry.items.length > 0);
  }, [filtered]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(id);
      restoreRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuery("");
        setOpen((value) => !value);
        return;
      }
      if (event.key === "?" && !typing) {
        event.preventDefault();
        setQuery("");
        setOpen(true);
      }
    };

    const onRequest = () => {
      setQuery("");
      setOpen(true);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("sr:palette", onRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("sr:palette", onRequest);
    };
  }, []);

  function onDialogKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (filtered.length ? (index + 1) % filtered.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) =>
        filtered.length ? (index - 1 + filtered.length) % filtered.length : 0,
      );
      return;
    }
    if (event.key === "Enter") {
      const command = filtered[active];
      if (command) {
        event.preventDefault();
        command.run();
      }
      return;
    }
    if (event.key === "Tab" && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'input, button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className="palette-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-labelledby="palette-title"
        ref={dialogRef}
        onKeyDown={onDialogKeyDown}
      >
        <div className="palette-head">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" />
            <path d="m10.5 10.5 3 3" stroke="currentColor" />
          </svg>
          <h2 id="palette-title" className="visually-hidden">
            Command palette
          </h2>
          <input
            ref={inputRef}
            className="palette-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to a section, case, or action…"
            aria-label="Search commands"
            aria-controls="palette-list"
            aria-activedescendant={
              filtered[active] ? `cmd-${filtered[active].id}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="kbd">esc</kbd>
        </div>

        <div className="palette-list" id="palette-list" role="listbox" aria-label="Results">
          {groups.length === 0 && (
            <p className="palette-empty">No match. Try “work”, “HL7”, or “email”.</p>
          )}
          {groups.map(({ group, items }) => (
            <div key={group}>
              <p className="palette-group">{group}</p>
              <ul role="group" aria-label={group}>
                {items.map((command) => {
                  flatIndex += 1;
                  const index = flatIndex;
                  return (
                    <li key={command.id} role="presentation">
                      <button
                        type="button"
                        id={`cmd-${command.id}`}
                        role="option"
                        aria-selected={index === active}
                        data-active={index === active}
                        className="palette-item"
                        onMouseEnter={() => setActive(index)}
                        onClick={command.run}
                      >
                        <span>{command.label}</span>
                        {command.hint && <span className="hint">{command.hint}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="palette-foot" aria-hidden="true">
          <span>
            <kbd className="kbd">up</kbd>
            <kbd className="kbd">dn</kbd> navigate
          </span>
          <span>
            <kbd className="kbd">enter</kbd> run
          </span>
          <span>
            <kbd className="kbd">?</kbd> this menu
          </span>
        </div>
        <p className="visually-hidden" role="status">
          {notice}
        </p>
      </div>
    </div>
  );
}
