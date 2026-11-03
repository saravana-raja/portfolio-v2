import { Section } from "@/components/ui/Section";
import { CopyEmail } from "@/components/interactive/CopyEmail";
import { Github, Linkedin, Mail } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <Section
      id="contact"
      index="05"
      rail="Contact"
      title={
        <>
          Let’s discuss <em>backend &amp; cloud systems.</em>
        </>
      }
    >
      <div className="contact">
        <div>
          <p className="contact-sub">
            Open to Backend, Cloud, and Distributed Systems engineering roles —
            Chennai or Remote. If you are building high-throughput systems, cloud
            infrastructure on AWS or Azure, or agentic pipelines, let’s talk.
          </p>

          <div className="contact-actions">
            <a className="btn btn--primary" href={site.github} target="_blank" rel="noopener noreferrer">
              <Github /> GitHub
            </a>
            <a className="btn" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin /> LinkedIn
            </a>
            <a className="btn" href={site.resume} download>
              <Mail /> Résumé PDF
            </a>
          </div>
        </div>

        <dl className="contact-card">
          <div className="contact-row">
            <dt>Email</dt>
            <dd>
              <CopyEmail />
            </dd>
          </div>
          <div className="contact-row">
            <dt>GitHub</dt>
            <dd>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                saravana-raja ↗
              </a>
            </dd>
          </div>
          <div className="contact-row">
            <dt>LinkedIn</dt>
            <dd>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                in/saravana-raja ↗
              </a>
            </dd>
          </div>
          <div className="contact-row">
            <dt>Location</dt>
            <dd>Chennai, IN · IST (UTC+5:30)</dd>
          </div>
          <div className="contact-row">
            <dt>Availability</dt>
            <dd>
              <span className="availability">
                <span className="dot" aria-hidden="true" /> Open to opportunities
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
