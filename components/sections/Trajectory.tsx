import { Section } from "@/components/ui/Section";

const rows = [
  {
    when: "2013 — 2017",
    role: "B.E. Mechanical Engineering",
    org: "Infant Jesus College of Engineering and Technology · Thoothukudi",
    note: "Systems-level analytical foundations and thermodynamics before transitioning into software.",
    current: false,
  },
  {
    when: "2018 — 2020",
    role: "Customer Support Associate",
    org: "Sutherland Global Services · Chennai",
    note: "Direct experience with end-user pain points, instilling deep empathy for system reliability and error clarity.",
    current: false,
  },
  {
    when: "2021 — 2022",
    role: "Java Full-Stack Developer Bootcamp",
    org: "Generation India",
    note: "Intensive immersion in object-oriented programming, data structures, SQL, and web technologies.",
    current: false,
  },
  {
    when: "2022 — 2023",
    role: "Cloud Engineer 1",
    org: "Hanu Software Solutions · Greater Noida",
    note: "Developed cloud resource monitoring and cost optimization services using C#, .NET, and Azure SDK.",
    current: false,
  },
  {
    when: "02/2025 — 09/2026",
    role: "Lead Engineer",
    org: "Mudivili Technologies · Chennai",
    note: "Architected core backend services: high-concurrency streaming APIs, in-memory state caching, HL7 ETL, and AWS deployments.",
    current: false,
  },
  {
    when: "2026 — Present",
    role: "Cloud & Backend Architecture",
    org: "AWS Solutions Architect · AWS AI/ML Scholars",
    note: "Achieved AWS Solutions Architect certification and built agentic AI workflows with Amazon Bedrock.",
    current: true,
  },
];

export function Trajectory() {
  return (
    <Section
      id="trajectory"
      index="02"
      rail="Trajectory"
      title={
        <>
          Career trajectory &amp; <em>engineering journey.</em>
        </>
      }
    >
      <div className="timeline">
        {rows.map((row) => (
          <div
            className="timeline-row"
            key={row.when + row.role}
            data-current={row.current}
          >
            <div className="timeline-when">{row.when}</div>
            <div className="timeline-what">
              <p className="timeline-role">
                <b>{row.role}</b>
              </p>
              <p className="timeline-org">{row.org}</p>
              <p className="timeline-note">{row.note}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
