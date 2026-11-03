import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          © 2026 {site.name} · Chennai, IN
        </p>
        <p>
          Built with Next.js · self-hosted type · no trackers, no cookies
        </p>
        <p className="footer-keys">
          <Link href="/colophon">Colophon</Link>
          <span aria-hidden="true">/</span>
          <a href={site.repo} target="_blank" rel="noopener noreferrer">
            Source
          </a>
          <span aria-hidden="true">/</span>
          <span>
            <kbd className="kbd">?</kbd> menu
          </span>
        </p>
      </div>
    </footer>
  );
}
