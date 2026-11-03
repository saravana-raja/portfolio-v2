import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/shell/Nav";
import { StatusBar } from "@/components/shell/StatusBar";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { Footer } from "@/components/shell/Footer";
import { site } from "@/lib/site";

const sans = localFont({
  src: [
    {
      path: "../public/fonts/ibm-plex-sans-400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sans",
});

const description =
  "Saravana Raja S — Backend & Cloud Engineer in Chennai. Designing resilient distributed backends, scalable REST & WebSocket APIs, containerized cloud infrastructure on AWS & Azure, and agentic AI systems.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Saravana Raja S — Backend & Cloud Engineer",
    template: "%s — Saravana Raja S",
  },
  description,
  applicationName: "Saravana Raja S",
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "Backend Engineer",
    "Cloud Engineer",
    "Solutions Architect",
    "AWS",
    "Microsoft Azure",
    "Distributed Systems",
    "FastAPI",
    "Node.js",
    "Python",
    "PostgreSQL",
    "TimescaleDB",
    "Docker",
    "Agentic AI",
    "WebSockets",
    "Chennai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: "Saravana Raja S — Backend & Cloud Engineer",
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Saravana Raja S — Backend & Cloud Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saravana Raja S — Backend & Cloud Engineer",
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  themeColor: "#070a12",
  colorScheme: "dark light",
};

const themeScript = `(function(){try{var t=localStorage.getItem("sr-theme");if(t==="light"||t==="paper"){document.documentElement.dataset.theme=t;}else{document.documentElement.dataset.theme="dark";}}catch(e){}})();`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Backend & Cloud Engineer",
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "Backend Engineering",
    "Cloud Infrastructure (AWS & Azure)",
    "Distributed Systems",
    "FastAPI",
    "Node.js",
    "Python",
    "PostgreSQL",
    "TimescaleDB",
    "Docker & Linux",
    "Agentic AI",
    "WebSockets",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Infant Jesus College of Engineering and Technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-theme="dark"
      className={`${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette />
        <StatusBar />
      </body>
    </html>
  );
}
