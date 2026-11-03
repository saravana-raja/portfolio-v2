import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "How this site is built: stack, type, design rules, performance budget, and the privacy choices behind it.",
  alternates: { canonical: "/colophon" },
};

export default function ColophonPage() {
  return (
    <div className="page-simple">
      <div className="page-simple-inner">
        <p className="label label--accent">Colophon</p>
        <h1 className="page-title" style={{ marginTop: 12 }}>
          Built like a <em>tool</em>, not a template.
        </h1>
        <p className="page-lead">
          This site is part of the work sample. It is deliberately small: a few
          static routes, self-hosted type, hand-drawn SVG, and no tracking. If
          something here is decorative, it still has to earn its bytes.
        </p>

        <dl className="spec-table">
          <div className="spec-row">
            <dt>Framework</dt>
            <dd>Next.js (App Router), React Server Components, TypeScript strict</dd>
          </div>
          <div className="spec-row">
            <dt>Type</dt>
            <dd>
              IBM Plex Sans · Departure Mono — self-hosted woff2
            </dd>
          </div>
          <div className="spec-row">
            <dt>Palette</dt>
            <dd>
              Obsidian #070A12 · Deep Slate #192338 · Electric Cyan #38BDF8 · Emerald #10B981
            </dd>
          </div>
          <div className="spec-row">
            <dt>Diagrams</dt>
            <dd>Hand-authored SVG, 1px architectural strokes, zero heavy libraries</dd>
          </div>
          <div className="spec-row">
            <dt>Interaction</dt>
            <dd>
              Command palette (Ctrl+K), interactive system console, HL7 frame inspector, AI eval runner
            </dd>
          </div>
          <div className="spec-row">
            <dt>Analytics</dt>
            <dd>None. Zero cookies, zero tracking scripts, zero third-party telemetry.</dd>
          </div>
          <div className="spec-row">
            <dt>Privacy</dt>
            <dd>
              No phone number anywhere in markup, metadata, or JSON-LD. Direct contact via email, GitHub, or LinkedIn.
            </dd>
          </div>
          <div className="spec-row">
            <dt>Source</dt>
            <dd>
              <a
                className="text-link"
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/saravana-raja/portfolio-v2
              </a>
            </dd>
          </div>
        </dl>

        <div className="prose">
          <h2>
            <span className="n">01</span> Design principles
          </h2>
          <p>
            The visual system is modeled on high-precision cloud architecture consoles:
            deep obsidian backgrounds, hairline architectural grids, clean sans typography,
            and high-contrast status accents. No generic AI purple gradients, no fake metrics,
            and no unread essay filler.
          </p>
          <p>
            Content is concise and direct: every section highlights verified technical constraints,
            distributed architecture decisions, and production outcomes.
          </p>

          <h2>
            <span className="n">02</span> What it leaves out
          </h2>
          <p>
            No phone number, by choice. No contact form with a hidden backend. No
            testimonials, no skill percentage bars, no &ldquo;trusted by&rdquo;
            logos, no invented metrics. The telemetry panel in the hero is
            labelled synthetic because it is — the real numbers are in the case
            studies, scoped to what was actually measured.
          </p>

          <h2>
            <span className="n">03</span> Performance budget
          </h2>
          <p>
            Under 120KB of JavaScript on the homepage, LCP under 1.8s on a mid-tier
            phone, no layout shift from fonts, and every animation optional. The
            only client components are the ones that need to be: the clock, the
            palette, the theme switch, the telemetry panel, the packet inspector,
            and the copy-email button.
          </p>

          <h2>
            <span className="n">04</span> Accessibility
          </h2>
          <p>
            Semantic landmarks, keyboard paths through every interaction, visible
            focus, reduced-motion support, and text alternatives for diagrams and
            charts. Colour is never the only carrier of meaning — the production
            markers carry text labels too.
          </p>
        </div>

        <p style={{ marginTop: 36 }}>
          <Link className="btn btn--sm" href="/">
            ← Back to the work
          </Link>
        </p>
      </div>
    </div>
  );
}
