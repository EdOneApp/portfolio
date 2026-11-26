import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkGrid from "@/components/WorkGrid";
import { projects, profile } from "@/data/content";

const description =
  `${projects.length} projets présentés par Daniel Guedegbe : fintech, ERP, mobilité électrique, e-commerce, expériences web immersives, SIG et outillage open-source.`;

export const metadata: Metadata = {
  title: "Projets",
  description,
  alternates: { canonical: "/work/" },
  openGraph: { title: `Projets — ${profile.fullName}`, description, url: "/work/" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader title={["Créer des produits", "numériques solides."]} />
      <WorkGrid projects={projects} />
    </>
  );
}
