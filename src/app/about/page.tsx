import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, journey, awards } from "@/data/content";
import { Label, Pill, Asterisk, Arrow } from "@/components/agency/ui";
export const metadata: Metadata = {
  title: "L’approche & le parcours",
  description:
    "Daniel Guedegbe : ingénieur full stack, esprit créatif et sens du produit. Une approche du design au déploiement, depuis Abidjan.",
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <>
      <header className="agency-page-head agency-about-head">
        <Label>LA CRÉATIVITÉ AIME LES BASES SOLIDES.</Label>
        <h1>
          Un esprit libre.
          <br />
          <em>Un travail carré.</em>
        </h1>
        <p>
          Daniel Guedegbe. Ingénieur logiciel full stack.
          <br />
          Abidjan, avec une vue ouverte sur le monde.
        </p>
      </header>
      <section className="agency-about-intro agency-section">
        <div className="agency-about-photo">
          <Image
            src="/images/agency/portrait-one.webp"
            alt="Daniel Guedegbe"
            width={720}
            height={720}
            priority
            sizes="(max-width:767px) 90vw,43vw"
          />
          <Asterisk />
        </div>
        <div data-reveal>
          <Label>DU SENS AVANT LES EFFETS</Label>
          <h2>
            Ce qui se voit.
            <br />
            <em>Ce qui fait tenir.</em>
          </h2>
          <p>
            J’aime les interfaces qui ont une personnalité. Mais une belle
            façade ne suffit pas. Derrière, je construis des architectures
            backend, des APIs, des applications mobiles et des systèmes pensés
            pour être repris et faire leur chemin.
          </p>
          <p>
            Depuis plus de six ans, je travaille sur des produits fintech, des
            ERP, des plateformes de mobilité et des expériences web. Le fil
            rouge : comprendre le besoin et lui donner une forme juste.
          </p>
          <Pill href="/contact">Parlons de votre projet</Pill>
        </div>
      </section>
      <section className="agency-photo-journal">
        <div>
          <Image
            src="/images/agency/portrait-two.webp"
            alt="Daniel, portrait en studio"
            width={864}
            height={1052}
            sizes="(max-width:767px) 85vw,40vw"
          />
          <span>LE SÉRIEUX, SANS SE PRENDRE AU SÉRIEUX.</span>
        </div>
        <div>
          <Image
            src="/images/agency/portrait-three.webp"
            alt="Daniel dans un univers tech et créatif"
            width={1000}
            height={1300}
            sizes="(max-width:767px) 85vw,40vw"
          />
          <span>LA CURIOSITÉ RESTE LE MEILLEUR MOTEUR.</span>
        </div>
      </section>
      <section className="agency-about-stats">
        <div>
          <span>6+</span>
          <p>Années d’expérience</p>
        </div>
        <div>
          <span>{projects.length}</span>
          <p>Projets à explorer</p>
        </div>
        <div>
          <span>3</span>
          <p>Distinctions & hackathons</p>
        </div>
      </section>
      <section className="agency-process agency-section">
        <Label>L’APPROCHE, SANS DÉTOUR</Label>
        <h2>
          Écouter. Clarifier.
          <br />
          <em>Créer. Faire vivre.</em>
        </h2>
        {[
          [
            "01",
            "Comprendre avant de dessiner.",
            "Vos utilisateurs, votre contexte et ce qui rend le projet utile. On pose les bonnes questions avant de choisir les réponses.",
          ],
          [
            "02",
            "Donner une personnalité.",
            "Une direction visuelle, des parcours et un langage de mouvement. L’interface traduit votre intention, jusque dans les détails.",
          ],
          [
            "03",
            "Construire avec exigence.",
            "Une base technique claire, un fonctionnement fiable et une expérience adaptée à chaque écran. Les effets ne prennent jamais le pas sur l’usage.",
          ],
          [
            "04",
            "Mettre en ligne, puis faire évoluer.",
            "Déploiement, documentation et accompagnement. Le projet doit pouvoir vivre après sa première mise en ligne.",
          ],
        ].map(([n, t, d]) => (
          <div key={n} data-reveal>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </section>
      <section className="agency-journey agency-section">
        <Label>QUELQUES ÉTAPES DU PARCOURS</Label>
        <h2>
          Le chemin nourrit
          <br />
          <em>la manière de faire.</em>
        </h2>
        {journey.slice(0, 3).map((j, i) => (
          <article key={i} data-reveal>
            <span>{j.period}</span>
            <div>
              <h3>{j.role}</h3>
              <p>{j.place}</p>
            </div>
            <Arrow />
          </article>
        ))}
        <div className="agency-about-links">
          <Link href="/experience">
            Toute l’expérience
            <Arrow />
          </Link>
          <Link href="/education">
            La formation
            <Arrow />
          </Link>
          <Link href="/certifications">
            Les distinctions
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="agency-recognition agency-section">
        <Label>DES RENCONTRES QUI MARQUENT</Label>
        {awards.map((a, i) => (
          <div key={a.title} data-reveal>
            <span>0{i + 1}</span>
            <h3>{a.title}</h3>
            <small>{a.date}</small>
            <Asterisk />
          </div>
        ))}
      </section>
    </>
  );
}
