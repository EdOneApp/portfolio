import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/data/content";
import { Btn, Eyebrow, PageHero } from "@/components/honey/ui";
import { SkillsSection } from "@/components/honey/Parcours";
import Counter from "@/components/honey/Counter";
export const metadata: Metadata = {
  title: "À propos",
  description:
    "Daniel Guedegbe : ingénieur full stack, sens du design et du produit. Une approche complète, du croquis au déploiement, depuis Abidjan.",
  alternates: { canonical: "/about/" },
};
const process = [
  ["01", "Écouter", "Vos utilisateurs, votre contexte, ce qui rendra le projet utile. Les bonnes questions avant les réponses."],
  ["02", "Dessiner", "Une direction visuelle, des parcours clairs et un langage de mouvement qui traduit votre intention."],
  ["03", "Construire", "Une base technique propre, testée et documentée, rapide sur chaque écran."],
  ["04", "Faire vivre", "Mise en ligne, suivi, évolutions et accompagnement : le projet continue après le lancement."],
];
export default function About() {
  return (
    <>
      <PageHero eyebrow="À propos" title="Un esprit libre," em="un travail carré.">
        <p>Daniel Guedegbe, ingénieur logiciel full stack. Abidjan, avec une vue ouverte sur le monde.</p>
      </PageHero>
      <section className="h-section h-about">
        <div className="h-about-photos">
          <div className="h-about-photo is-a" data-parallax="0.06" data-tilt="5">
            <Image src="/images/agency/portrait-one.webp" alt="Daniel Guedegbe" width={720} height={720} priority sizes="(max-width:767px) 70vw, 30vw" />
          </div>
          <div className="h-about-photo is-b" data-parallax="-0.05" data-tilt="5">
            <Image src="/images/agency/portrait-three.webp" alt="Daniel dans un univers tech et créatif" width={1000} height={1300} sizes="(max-width:767px) 60vw, 24vw" />
          </div>
        </div>
        <div data-reveal className="h-about-copy">
          <Eyebrow>Ce qui se voit, ce qui fait tenir</Eyebrow>
          <h2>
            Des interfaces avec une personnalité, <em>des fondations solides.</em>
          </h2>
          <p>
            J’aime les interfaces qui ont du caractère. Mais une belle façade ne suffit pas :
            derrière, je construis des architectures backend, des APIs, des applications mobiles et
            des systèmes pensés pour être repris et durer.
          </p>
          <p>
            Depuis plus de six ans, je travaille sur des produits fintech, des ERP, des plateformes de
            mobilité, des télécoms et des expériences web immersives. Le fil rouge : comprendre le
            besoin, puis lui donner une forme juste.
          </p>
          <div className="h-stats is-light">
            <div>
              <strong><Counter to={6} suffix="+" /></strong>
              <span>années d’expérience</span>
            </div>
            <div>
              <strong><Counter to={projects.length} /></strong>
              <span>projets présentés</span>
            </div>
            <div>
              <strong><Counter to={3} /></strong>
              <span>distinctions</span>
            </div>
          </div>
          <div className="h-hero-actions">
            <Btn href="/parcours">Voir le parcours</Btn>
            <Btn href="/devis" variant="ghost">Demander un devis</Btn>
          </div>
        </div>
      </section>
      <section className="h-section h-process">
        <Eyebrow light>La méthode</Eyebrow>
        <h2 className="h-process-title">
          Écouter. Dessiner. <em>Construire. Faire vivre.</em>
        </h2>
        <div className="h-process-grid">
          {process.map(([n, t, d], i) => (
            <article key={n} data-reveal data-tilt="7" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <SkillsSection />
    </>
  );
}
