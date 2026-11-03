import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseHeader } from "@/components/case/CaseHeader";
import { CaseNav } from "@/components/case/CaseNav";
import { caseStudies, getCase, getCaseNeighbours } from "@/lib/cases";
import { IotTelemetryCase } from "@/content/work/iot-telemetry-gateway";
import { LisHl7Case } from "@/content/work/lis-hl7-interface";
import { BedrockAgentCase } from "@/content/work/bedrock-support-agent";

const bodies: Record<string, () => React.JSX.Element> = {
  "iot-telemetry-gateway": IotTelemetryCase,
  "lis-hl7-interface": LisHl7Case,
  "bedrock-support-agent": BedrockAgentCase,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      title: `${study.title} — ${study.role}`,
      description: study.summary,
      url: `/work/${study.slug}`,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${study.title} — Saravana Raja S`,
        },
      ],
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCase(slug);
  const Body = bodies[slug];

  if (!study || !Body) notFound();

  const { previous, next } = getCaseNeighbours(slug);

  return (
    <div className="case-wrap">
      <CaseHeader study={study} />
      <div className="case-body">
        <aside className="case-toc" aria-label="On this page">
          <p>Contents</p>
          <ol>
            {study.sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span className="n">0{index + 1}</span>
                  <span>{section.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>
        <article className="case-article">
          <Body />
        </article>
      </div>
      <CaseNav previous={previous} next={next} />
    </div>
  );
}
