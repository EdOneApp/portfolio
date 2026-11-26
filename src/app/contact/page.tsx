import { socials } from "@/components/agency/socials";
import type { Metadata } from "next";
import Image from "next/image";
import { profile } from "@/data/content";
import ContactBrief from "@/components/agency/ContactBrief";
import { Label, Arrow, Asterisk } from "@/components/agency/ui";
export const metadata: Metadata = {
  title: "Un projet en tête ?",
  description:
    "Contactez Daniel Guedegbe pour imaginer et construire votre prochain site, produit web, application ou plateforme.",
  alternates: { canonical: "/contact/" },
};
export default function Contact() {
  return (
    <>
      <header className="agency-page-head agency-contact-head">
        <Label>LE DÉBUT DE QUELQUE CHOSE DE BIEN.</Label>
        <h1>
          Vous avez l’idée.
          <br />
          <em>Parlons de la suite.</em>
        </h1>
        <Asterisk />
      </header>
      <section className="agency-contact-body agency-section">
        <aside>
          <div className="agency-contact-person">
            <Image
              src="/images/agency/portrait-one.webp"
              alt="Daniel Guedegbe"
              width={80}
              height={80}
            />
            <div>
              <h2>Daniel Guedegbe</h2>
              <p>Votre interlocuteur, du début à la suite.</p>
            </div>
          </div>
          <p>
            Un projet bien défini ou encore quelques idées en vrac ?
            Racontez-moi. On regardera ensemble ce qui peut prendre forme.
          </p>
          <a className="agency-contact-link" href={`mailto:${profile.email}`}>
            <small>PAR EMAIL</small>
            <span>
              {profile.email}
              <Arrow />
            </span>
          </a>
          <a
            className="agency-contact-link"
            href="https://wa.me/2250748733365"
            target="_blank"
            rel="noopener noreferrer"
          >
            <small>SUR WHATSAPP</small>
            <span>
              +225 07 48 73 33 65
              <Arrow />
            </span>
          </a>
          <div className="agency-contact-social">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
          <p className="agency-contact-location">
            ● À Abidjan. Disponible à distance.
          </p>
        </aside>
        <div>
          <ContactBrief />
        </div>
      </section>
    </>
  );
}
