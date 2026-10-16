import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkGrid from "@/components/WorkGrid";
import { projects, profile } from "@/data/content";

export const metadata: Metadata = {
  title: `Projets — ${profile.fullName}`,
  description:
    "17 projets livrés en production par Daniel Guedegbe : fintech, ERP, mobilité électrique, e-commerce, SIG et outillage open-source.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projets"
        title={["Des systèmes", "en production."]}
        intro="16+ projets livrés pour des plateformes fintech, des ERP et des produits SaaS, aujourd'hui utilisés en production."
      />
      <WorkGrid projects={projects} />
    </>
  );
}
