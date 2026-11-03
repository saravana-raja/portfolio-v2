"use client";

export function PaletteTrigger() {
  return (
    <button
      type="button"
      className="nav-kbd"
      onClick={() => window.dispatchEvent(new CustomEvent("sr:palette"))}
      aria-label="Open command palette"
    >
      <kbd className="kbd">ctrl</kbd>
      <span>k</span>
    </button>
  );
}
