import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow as Label, Btn as Pill, PageHero } from "@/components/honey/ui";
export const metadata: Metadata = {
  title: "Votre présence digitale, enfin visible",
  description:
    "Google, site professionnel, référencement local, réseaux sociaux, vidéos et visuels IA. Découvrez les offres de Daniel Guedegbe et testez votre visibilité gratuitement.",
  alternates: { canonical: "/presence-digitale/" },
};
export default function Presence() {
  return (
    <>
      <PageHero eyebrow="Présence digitale" title="Faites-vous trouver." em="Donnez-leur envie.">
        <p>
          Vos clients vous cherchent sur Google et sur TikTok. Votre entreprise y est-elle visible ?
          Je vous aide à construire une présence qui présente votre activité, rassure et donne envie
          de vous contacter.
        </p>
        <div className="h-hero-actions">
          <Pill href="/diagnostic" variant="gold">Tester ma présence gratuitement</Pill>
        </div>
      </PageHero>
      <section className="h-section presence-packs">
        <article className="presence-pack" data-reveal>
          <div>
            <Label>OFFRE 01 / GOOGLE & WEB</Label>
            <h2>
              Au bon endroit.
              <br />
              <em>Au bon moment.</em>
            </h2>
            <p>
              Quand un client cherche ce que vous vendez dans votre quartier,
              donnons-lui les informations pour vous trouver.
            </p>
            <ul>
              <li>
                Création et optimisation de votre fiche Google : adresse,
                horaires, photos et accompagnement pour les avis.
              </li>
              <li>
                Site professionnel pour présenter vos produits, vos services et
                vos contacts.
              </li>
              <li>
                Référencement local : informations cohérentes et pages adaptées
                à vos recherches cibles.
              </li>
            </ul>
            <Pill href="/devis?type=presence">Construire ma présence Google</Pill>
          </div>
          <Image
            src="/images/agency/presence-google.webp"
            alt="Exemple illustratif de site professionnel sur ordinateur et mobile, avec fiche locale Maison Akwaba"
            width={1400}
            height={1100}
            sizes="(max-width:900px) 90vw,48vw"
          />
        </article>
        <article className="presence-pack presence-social" data-reveal>
          <div>
            <Label>OFFRE 02 / RÉSEAUX & CONTENUS</Label>
            <h2>
              On vous voit.
              <br />
              <em>On se souvient de vous.</em>
            </h2>
            <p>
              Vos clients veulent voir avant d’acheter. Faisons vivre votre
              activité sur TikTok, Instagram et Facebook.
            </p>
            <ul>
              <li>Community management : gestion et animation de vos pages.</li>
              <li>
                Création de contenus adaptés à votre activité et à vos clients.
              </li>
              <li>
                Vidéos courtes : présentation, démonstration et coulisses.
              </li>
              <li>
                Shooting photo avec l’IA pour créer des visuels professionnels,
                sans studio.
              </li>
            </ul>
            <Pill href="/devis?type=pages">Faire vivre mes réseaux</Pill>
          </div>
          <Image
            src="/images/agency/presence-social.webp"
            alt="Maquettes illustratives de page sociale, publication et vidéo mobile pour Maison Akwaba"
            width={1400}
            height={1100}
            sizes="(max-width:900px) 90vw,48vw"
          />
        </article>
      </section>
      <section className="h-section presence-combo" data-reveal>
        <Label>UNE OFFRE OU LES DEUX. SELON VOTRE BESOIN.</Label>
        <h2>
          Google rassure.
          <br />
          <em>Les réseaux donnent envie.</em>
        </h2>
        <p>
          Les informations et les avis facilitent la décision. Les vidéos et les
          visuels créent le premier contact. Ensemble, ces deux offres
          construisent une présence cohérente. Le périmètre et le tarif sont
          définis avec vous ; le premier diagnostic est gratuit.
        </p>
        <div className="presence-links">
          <Pill href="/diagnostic">Faire le test gratuit</Pill>
          <Pill href="/devis?type=presence" variant="ghost">Demander un devis</Pill>
        </div>
        <p className="presence-note">
          Maquettes illustratives d’une entreprise fictive. Aucun classement
          Google ni volume de clients garanti.
        </p>
      </section>
    </>
  );
}
