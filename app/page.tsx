import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Trajectory } from "@/components/sections/Trajectory";
import { Toolkit } from "@/components/sections/Toolkit";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Trajectory />
      <Toolkit />
      <Credentials />
      <Contact />
    </>
  );
}
