import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import { degrees, profile } from "@/data/content";

const description =
  "Formation de Daniel Guedegbe : Master en Génie Logiciel, Master en Big Data Analytics, Licence en Bases de Données.";

export const metadata: Metadata = {
  title: "Parcours académique",
  description,
  alternates: { canonical: "/education/" },
  openGraph: { title: `Parcours académique — ${profile.fullName}`, description, url: "/education/" },
};

export default function EducationPage() {
  return (
    <>
      <PageHeader title={["Parcours", "académique"]} />
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
