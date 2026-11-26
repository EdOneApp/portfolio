import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Label, Pill } from "@/components/agency/ui";
export const metadata: Metadata = {
  title: "Applications, data & présence digitale",
  description:
    "Applications web et mobiles, data, administration de bases de données, systèmes sur mesure et présence digitale à Abidjan.",
  alternates: { canonical: "/services/" },
};
const services = [
  [
    "01",
    "Applications web & mobiles",
    "Du premier prototype au produit utilisé chaque jour. SaaS, plateformes métier et applications mobiles, avec des parcours clairs et une architecture adaptée.",
    "Interfaces · APIs · Paiement · Déploiement",
  ],
  [
    "02",
    "Data & visualisation",
    "Collecter, nettoyer et structurer vos données pour en tirer des informations utiles. Des tableaux de bord qui éclairent vos décisions.",
    "Traitement · BI · Reporting · Tableaux de bord",
  ],
  [
    "03",
    "Administration de bases de données",
    "Concevoir vos schémas, optimiser vos requêtes et organiser les sauvegardes. Un accompagnement pour des bases fiables et bien suivies.",
    "PostgreSQL · Performance · Sauvegardes · Suivi",
  ],
  [
    "04",
    "Systèmes sur mesure",
    "Votre organisation a ses propres règles. Nous construisons les outils qui les respectent : ERP, automatisations, intégrations et logiciels internes.",
    "Métier · ERP · APIs · Automatisation",
  ],
  [
    "05",
    "Sites & expériences de marque",
    "Sites vitrines, e-commerce et refontes : un design affirmé, une navigation fluide et des expériences qui fonctionnent aussi sur mobile.",
    "Direction artistique · Design · Motion · Responsive",
  ],
  [
    "06",
    "Présence digitale",
    "Votre activité mérite d’être trouvée. Google, référencement local, réseaux sociaux et contenus : deux offres complémentaires pour vous rendre visible.",
    "Google · Réseaux sociaux · Vidéos · Visuels IA",
  ],
];
export default function Services() {
  return (
    <>
      <header className="agency-page-head">
        <Label>DE L’IDÉE À L’USAGE.</Label>
        <h1>
          Du beau.
          <br />
          <em>Et tout ce qui le fait vivre.</em>
        </h1>
        <p className="presence-intro">
          Une application, vos données, un système métier ou votre présence en
          ligne. Un même soin, du premier écran aux fondations techniques.
        </p>
      </header>
      <section className="agency-section offer-services">
        {services.map(([n, t, d, tags]) => (
          <article key={n} data-reveal>
            <span className="offer-index">{n} /</span>
            <div>
              <h2>{t}</h2>
              <p>{d}</p>
              <small>{tags}</small>
            </div>
            <Link
              href={n === "06" ? "/presence-digitale" : "/contact"}
              aria-label={`Découvrir : ${t}`}
            >
              <Arrow />
            </Link>
          </article>
        ))}
        <div className="presence-links">
          <Pill href="/contact">Parlons de votre projet</Pill>
          <Link href="/work" className="agency-text-link">
            Voir les réalisations <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
