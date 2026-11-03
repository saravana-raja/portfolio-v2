"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "paper") {
      setTheme("light");
    } else {
      setTheme("dark");
    }

    const onTheme = (event: Event) => {
      const next = (event as CustomEvent<string>).detail;
      if (next === "light" || next === "paper") setTheme("light");
      else setTheme("dark");
    };
    window.addEventListener("sr:theme", onTheme);
    return () => window.removeEventListener("sr:theme", onTheme);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("sr-theme", next);
    } catch {
      /* private mode */
    }
    setTheme(next);
    window.dispatchEvent(new CustomEvent<string>("sr:theme", { detail: next }));
  }

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      {theme === "dark" ? (
        // Sun icon for switching to light
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16" aria-hidden="true">
          <circle cx="10" cy="10" r="4" strokeWidth="1.5" />
          <path d="M10 2v2m0 12v2M2 10h2m12 0h2m-2.6-5.4-1.4 1.4M6 14l-1.4 1.4m0-9.4L6 7.4m8 6.6 1.4 1.4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        // Moon icon for switching to dark
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16" aria-hidden="true">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
