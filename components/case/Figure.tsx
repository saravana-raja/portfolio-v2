import type { ReactNode } from "react";

export function Figure({
  number,
  caption,
  note,
  children,
}: {
  number: string;
  caption: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <figure className="figure">
      <div className="figure-canvas">{children}</div>
      <figcaption>
        <b>FIG. {number}</b>
        <span>{caption}</span>
        {note && <span>{note}</span>}
      </figcaption>
    </figure>
  );
}
