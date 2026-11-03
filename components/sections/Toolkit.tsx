import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";

type Level = "prod" | "lab" | "learning";
type Item = readonly [string, Level];

const groups: { name: string; items: readonly Item[] }[] = [
  {
    name: "Cloud & DevOps",
    items: [
      ["AWS (Solutions Architect)", "prod"],
      ["Microsoft Azure (Certified)", "prod"],
      ["AWS EC2", "prod"],
      ["AWS Lambda", "lab"],
      ["Docker & Docker Compose", "prod"],
      ["Linux (Ubuntu)", "prod"],
      ["Nginx", "prod"],
      ["CloudFormation", "lab"],
      ["Git / GitHub", "prod"],
    ],
  },
  {
    name: "Backend Frameworks & Languages",
    items: [
      ["Python", "prod"],
      ["FastAPI", "prod"],
      ["JavaScript / TypeScript", "prod"],
      ["Node.js & Express.js", "prod"],
      ["C# / .NET", "prod"],
      ["RESTful APIs", "prod"],
      ["WebSockets", "prod"],
    ],
  },
  {
    name: "Databases & In-Memory Storage",
    items: [
      ["PostgreSQL", "prod"],
      ["TimescaleDB", "prod"],
      ["Redis", "lab"],
      ["MySQL", "lab"],
      ["DynamoDB", "lab"],
      ["Relational Data Modeling", "prod"],
    ],
  },
  {
    name: "Protocols & Messaging",
    items: [
      ["TCP/IP", "prod"],
      ["WebSockets", "prod"],
      ["MQTT", "prod"],
      ["HL7 v2", "prod"],
      ["SSL / TLS", "prod"],
    ],
  },
  {
    name: "Agentic AI & Serverless",
    items: [
      ["Amazon Bedrock", "lab"],
      ["AgentCore Framework", "lab"],
      ["Amazon Nova Pro", "lab"],
      ["Bedrock Model Evaluations", "lab"],
      ["Schema-Guarded Tool Calling", "lab"],
    ],
  },
  {
    name: "Architectural Practices",
    items: [
      ["API Contract Design", "prod"],
      ["JWT & RBAC Security", "prod"],
      ["In-Memory State Caching", "prod"],
      ["Continuous Aggregations", "prod"],
      ["Idempotent Retries", "prod"],
      ["Performance Optimization", "prod"],
    ],
  },
  {
    name: "Expanding Now",
    items: [
      ["Kubernetes", "learning"],
      ["Terraform", "learning"],
      ["Next.js / React", "learning"],
    ],
  },
];

const levelTitle: Record<Level, string> = {
  prod: "Used in production environments",
  lab: "Implemented in certified projects, scholarships, or labs",
  learning: "Currently expanding competency",
};

export function Toolkit() {
  return (
    <Section
      id="toolkit"
      index="03"
      rail="Toolkit"
      title={
        <>
          Production technologies &amp; <em>engineering stack.</em>
        </>
      }
    >
      <div className="toolkit-legend" aria-hidden="true">
        <span className="chip">
          <span className="dot dot--prod" /> production
        </span>
        <span className="chip">
          <span className="dot dot--lab" /> lab / scholarship
        </span>
        <span className="chip">
          <span className="dot dot--learning" /> expanding now
        </span>
      </div>

      <div>
        {groups.map((group) => (
          <div className="toolkit-group" key={group.name}>
            <h3 className="toolkit-name">{group.name}</h3>
            <div className="toolkit-items">
              {group.items.map(([name, level]) => (
                <Chip key={name} level={level} title={levelTitle[level]}>
                  {name}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
