import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AboutIntro from "@/components/AboutIntro";
import Manifesto from "@/components/Manifesto";
import SkillsGrid from "@/components/SkillsGrid";
import Testimonials from "@/components/Testimonials";
import { profile } from "@/data/content";

export const metadata: Metadata = {
  title: `À propos — ${profile.fullName}`,
  description: profile.seoDescription,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title={["Ingénieur logiciel,", "pas magicien."]}
        intro="Juste quelqu'un qui préfère les fondations solides aux promesses rapides."
      />
      <AboutIntro />
      <Manifesto />
      <SkillsGrid />
      <Testimonials />
    </>
  );
}
