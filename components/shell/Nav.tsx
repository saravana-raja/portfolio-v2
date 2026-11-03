import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { PaletteTrigger } from "@/components/shell/PaletteTrigger";
import { ThemeToggle } from "@/components/interactive/ThemeToggle";

export function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label={`${site.name} — home`}>
          <span className="brand-mark">
            SR<b>/</b>S
          </span>
          <span className="brand-sub">Backend &amp; Cloud Systems</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <span className="availability nav-avail">
            <span className="dot" aria-hidden="true" />
            Open
          </span>
          <PaletteTrigger />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
