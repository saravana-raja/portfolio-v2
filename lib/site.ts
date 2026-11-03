export const site = {
  name: "Saravana Raja S",
  role: "Backend & Cloud Engineer",
  domain: "Cloud Infrastructure · APIs · Distributed Systems",
  location: "Chennai, India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST · UTC+5:30",
  emailUser: "amailtosaravanaraja",
  emailDomain: "gmail.com",
  github: "https://github.com/saravana-raja",
  linkedin: "https://linkedin.com/in/saravana-raja-228168111",
  credly:
    "https://www.credly.com/badges/d5950a02-5028-468b-b531-c136ad4a1ad1/public_url",
  triageRepo:
    "https://github.com/saravana-raja/bedrock-agentcore-support-triage",
  repo: "https://github.com/saravana-raja/portfolio",
  resume: "/resume/saravana-raja-s-resume.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saravanaraja.dev",
} as const;

/** Assembled at runtime so the address is not a plain string in the HTML. */
export function emailAddress(): string {
  return `${site.emailUser}@${site.emailDomain}`;
}

export const navigation = [
  { label: "Projects", href: "/#work" },
  { label: "Experience", href: "/#trajectory" },
  { label: "Stack", href: "/#toolkit" },
  { label: "Contact", href: "/#contact" },
] as const;
