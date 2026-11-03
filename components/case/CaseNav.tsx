import Link from "next/link";
import type { CaseStudy } from "@/lib/cases";

export function CaseNav({
  previous,
  next,
}: {
  previous?: CaseStudy;
  next?: CaseStudy;
}) {
  return (
    <nav className="case-nav" aria-label="Case study navigation">
      <div className="case-nav-inner">
        {previous ? (
          <Link href={`/work/${previous.slug}`}>
            <span className="label">← Previous</span>
            <span className="t">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="next">
            <span className="label">Next →</span>
            <span className="t">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
