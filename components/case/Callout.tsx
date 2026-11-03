import type { ReactNode } from "react";

export function Callout({
  tag = "Decision",
  children,
}: {
  tag?: "Decision" | "Constraint" | "Note" | "Trade-off";
  children: ReactNode;
}) {
  return (
    <aside className="callout">
      <span className="tag">{tag}</span>
      {children}
    </aside>
  );
}
