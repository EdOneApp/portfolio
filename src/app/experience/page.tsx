import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import { journey, profile } from "@/data/content";

export const metadata: Metadata = {
  title: `Expérience professionnelle — ${profile.fullName}`,
  description:
    "Parcours professionnel de Daniel Guedegbe : 6+ ans d'ingénierie logicielle entre Abidjan, Paris et le remote, du développement mobile au Tech Lead.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader title={["Expérience", "professionnelle"]} />
      <Timeline
        items={journey.map((j) => ({
          period: j.period,
          title: j.role,
          subtitle: j.place,
          description: j.description,
          current: j.current,
        }))}
      />
    </>
  );
}
