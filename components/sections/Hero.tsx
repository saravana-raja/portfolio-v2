import Image from "next/image";
import { site } from "@/lib/site";
import { SystemArchitectureConsole } from "@/components/interactive/SystemArchitectureConsole";
import { ArrowDown, Download, Github } from "@/components/ui/Icons";

const proof = [
  { value: "2+", unit: "yrs", label: "production systems shipped" },
  { value: "Dual", unit: "Cloud", label: "AWS Architect + Azure Developer" },
  { value: "1,000+", unit: "clients", label: "concurrent WebSocket connections" },
  { value: "0", unit: "reads/msg", label: "live state served from memory" },
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker">
            <div className="hero-avatar-wrap">
              <Image
                src="/saravana-new-photo.png"
                alt="Saravana Raja S"
                width={46}
                height={46}
                className="hero-avatar"
                priority
              />
              <span className="hero-avatar-status" title="Active & Open to roles" />
            </div>
            <div className="hero-kicker-text">
              <span className="label label--accent">{site.name}</span>
              <span className="sep" aria-hidden="true">
                /
              </span>
              <span className="label">Backend &amp; Cloud Engineer</span>
            </div>
          </div>

          <h1 className="hero-title" id="hero-title">
            <span className="line">Architecting resilient backends,</span>
            <span className="line">
              <em>cloud systems, and scalable APIs.</em>
            </span>
          </h1>

          <p className="hero-sub">
            Specializing in high-concurrency APIs, distributed messaging, and containerized cloud systems on AWS &amp; Azure. Dual certified: AWS Solutions Architect &amp; Azure Developer.
          </p>

          <div className="hero-actions">
            <a className="btn btn--primary" href="#work">
              Featured Projects <ArrowDown />
            </a>
            <a className="btn" href={site.github} target="_blank" rel="noopener noreferrer">
              <Github /> GitHub
            </a>
            <a className="btn btn--quiet" href={site.resume} download>
              Résumé <Download />
            </a>
          </div>
        </div>

        <div className="hero-console">
          <SystemArchitectureConsole />
        </div>
      </div>

      <dl className="proof" aria-label="Selected production metrics">
        {proof.map((item) => (
          <div className="proof-item" key={item.label}>
            <dt className="proof-label">{item.label}</dt>
            <dd className="proof-value">
              {item.value}
              <span className="unit">{item.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
