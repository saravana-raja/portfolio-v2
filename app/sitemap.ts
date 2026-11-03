import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-29T00:00:00.000Z");
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/colophon`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...caseStudies.map((study) => ({
      url: `${site.url}/work/${study.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
