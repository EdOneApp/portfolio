import type { Metadata } from "next";
import { PageHero, Btn } from "@/components/honey/ui";
import {
  ExperienceSection,
  EducationSection,
  CertificationSection,
  SkillsSection,
} from "@/components/honey/Parcours";
export const metadata: Metadata = {
  title: "Parcours",
  description:
    "Parcours de Daniel Guedegbe : expérience professionnelle, formation, distinctions et compétences, d’Abidjan à Paris et en remote.",
  alternates: { canonical: "/parcours/" },
};
export default function ParcoursPage() {
  return (
    <>
      <PageHero eyebrow="Parcours" title="Le chemin nourrit" em="la manière de faire." index="06">
        <p>
          De développeur mobile à Tech Lead : six années entre Abidjan, Paris et le remote, au
          service de la fintech, de l’éducation, de la mobilité et des télécoms.
        </p>
        <div className="h-hero-actions">
          <a className="h-chip-link" href="#experience">Expérience</a>
          <a className="h-chip-link" href="#formation">Formation</a>
          <a className="h-chip-link" href="#certifications">Distinctions</a>
          <a className="h-chip-link" href="#competences">Compétences</a>
        </div>
      </PageHero>
      <ExperienceSection />
      <EducationSection />
      <CertificationSection />
      <SkillsSection />
      <section className="h-section h-project-cta">
        <h2>
          Envie de travailler <em>ensemble&nbsp;?</em>
        </h2>
        <Btn href="/devis" variant="gold">
          Demander un devis
        </Btn>
      </section>
    </>
  );
}
