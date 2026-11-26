import type { Metadata } from "next";
import { projects } from "@/data/content";
import ProjectArchive from "@/components/agency/ProjectArchive";
import { Label, Asterisk } from "@/components/agency/ui";
export const metadata: Metadata = {
  title: "Les réalisations",
  description: `${projects.length} projets de Daniel Guedegbe : sites immersifs, produits numériques, applications et architectures backend.`,
  alternates: { canonical: "/work/" },
};
export default function WorkPage() {
  return (
    <>
      <header className="agency-page-head agency-work-head">
        <Label>L’EXIGENCE RESTE. LES TERRAINS CHANGENT.</Label>
        <h1>
          Des idées,
          <br />
          <em>devenues réelles.</em>
          <sup>({projects.length})</sup>
        </h1>
        <div>
          <p>
            Web, mobile, commerce, fintech, outils métier.
            <br />
            Chaque projet a son histoire. Voici les leurs.
          </p>
          <Asterisk />
        </div>
      </header>
      <ProjectArchive />
    </>
  );
}
