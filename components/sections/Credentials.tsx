import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

const credentials = [
  {
    name: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    date: "2026",
    href: null,
  },
  {
    name: "AWS AI/ML Scholars — Agentic AI",
    issuer: "Udacity",
    date: "06–10/2026",
    href: null,
  },
  {
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    date: "2022",
    href: site.credly,
  },
  {
    name: "Junior Full-Stack Java Developer Bootcamp",
    issuer: "Generation India",
    date: "2021–22",
    href: null,
  },
];

export function Credentials() {
  return (
    <Section
      id="credentials"
      index="04"
      rail="Credentials"
      title={
        <>
          Verified credentials &amp; <em>cloud certifications.</em>
        </>
      }
    >
      <div className="creds">
        {credentials.map((credential) => (
          <div className="cred" key={credential.name}>
            <p className="cred-name">{credential.name}</p>
            <p className="cred-issuer">{credential.issuer}</p>
            <p className="cred-date">{credential.date}</p>
            {credential.href ? (
              <a
                className="cred-link"
                href={credential.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                verify ↗
              </a>
            ) : (
              <span className="cred-link" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
