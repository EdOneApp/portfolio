import type { Metadata } from "next";
import { projects } from "@/data/content";
import ProjectsExplorer from "@/components/honey/ProjectsExplorer";
import { PageHero } from "@/components/honey/ui";
export const metadata: Metadata = {
  title: "Les réalisations",
  description: `${projects.length} projets de Daniel Guedegbe : sites immersifs, e-commerce, applications, plateformes et data, à explorer en direct.`,
  alternates: { canonical: "/work/" },
};
export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Réalisations" title="Des idées," em="devenues réelles." index={String(projects.length)}>
        <p>
          Sites immersifs, boutiques, applications, plateformes métier et data. Ouvrez une fiche pour
          explorer le site en direct, sur ordinateur, tablette et mobile.
        </p>
      </PageHero>
      <ProjectsExplorer />
    </>
  );
}
