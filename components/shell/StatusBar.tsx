"use client";

import { useEffect, useState } from "react";

function IstTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    setNow(format());
    const id = window.setInterval(() => setNow(format()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="status-clock" suppressHydrationWarning>
      {now ?? "--:--:--"}
    </span>
  );
}

export function StatusBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, next)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <div className="status-bar">
        <div className="status-group">
          <span className="status-item status-item--ok">
            <span className="dot" /> Open to roles
          </span>
          <span className="status-item status-clock-wrap">
            Chennai <span aria-hidden="true">/</span> <IstTime /> IST
          </span>
        </div>
        <div className="status-group">
          <span className="status-item status-hint">
            <kbd className="kbd">ctrl</kbd>
            <kbd className="kbd">k</kbd> commands
          </span>
          <span className="status-item">v1.0</span>
        </div>
      </div>
    </>
  );
}
