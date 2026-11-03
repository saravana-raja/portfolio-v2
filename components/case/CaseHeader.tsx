import Link from "next/link";
import type { CaseStudy } from "@/lib/cases";
import { ArrowUpRight } from "@/components/ui/Icons";

export function CaseHeader({ study }: { study: CaseStudy }) {
  return (
    <header className="case-header">
      <div className="case-header-inner">
        <nav className="case-crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep" aria-hidden="true">
            /
          </span>
          <Link href="/#work">Selected work</Link>
          <span className="sep" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{study.index}</span>
        </nav>

        <p className="case-index">
          CASE {study.index} · {study.org}
        </p>
        <h1 className="case-title">{study.title}</h1>
        <p className="case-summary">{study.summary}</p>

        <dl className="case-meta">
          <div>
            <dt>Role</dt>
            <dd>{study.role}</dd>
          </div>
          <div>
            <dt>Timeframe</dt>
            <dd>{study.timeframe}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{study.stack.join(" · ")}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{study.status}</dd>
          </div>
        </dl>

        {study.links && study.links.length > 0 && (
          <div className="hero-actions" style={{ marginTop: 24 }}>
            {study.links.map((link) => (
              <a
                key={link.href}
                className="btn btn--sm"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} <ArrowUpRight />
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
