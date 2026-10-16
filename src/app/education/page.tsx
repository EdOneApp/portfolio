import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import { degrees, profile } from "@/data/content";

export const metadata: Metadata = {
  title: `Parcours académique — ${profile.fullName}`,
  description:
    "Formation de Daniel Guedegbe : Master en Génie Logiciel, Master en Big Data Analytics, Licence en Bases de Données.",
};

export default function EducationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Formation"
        title={["Parcours", "académique"]}
        intro="Des bases de données au génie logiciel, un parcours académique construit en parallèle d'une activité professionnelle continue."
      />
      <Timeline
        items={degrees.map((d) => ({
          period: d.year,
          title: d.title,
          subtitle: d.place,
        }))}
      />
    </>
  );
}
