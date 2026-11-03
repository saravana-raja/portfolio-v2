import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  rail: string;
  title: ReactNode;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  index,
  rail,
  title,
  note,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section${className ? ` ${className}` : ""}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="section-inner">
        <div className="rail" aria-hidden="true">
          <div className="rail-sticky">
            <span className="rail-index">[{index}]</span>
            <span className="rail-text">{rail}</span>
            <span className="rail-ticks" />
          </div>
        </div>
        <div className="section-body">
          <header className="section-head">
            <p className="label label--accent">
              [{index}] {rail}
            </p>
            <h2 className="section-title" id={`${id}-title`}>
              {title}
            </h2>
            {note && <p className="section-note">{note}</p>}
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}
