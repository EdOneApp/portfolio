import type { Metadata } from "next";
import { profile } from "@/data/content";
import { socials } from "@/components/honey/socials";
import ContactPanel from "@/components/honey/ContactPanel";
import { Arrow, PageHero } from "@/components/honey/ui";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Daniel Guedegbe par WhatsApp, email ou réservez un appel de 30 minutes pour votre site, application ou projet digital.",
  alternates: { canonical: "/contact/" },
};
export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Vous avez l’idée." em="Parlons de la suite.">
        <div className="h-contact-links">
          <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer">
            <small>WhatsApp</small>
            {profile.phone} <Arrow />
          </a>
          <a href={`mailto:${profile.email}`}>
            <small>Email</small>
            {profile.email} <Arrow />
          </a>
        </div>
        <div className="h-socials">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </PageHero>
      <section className="h-section h-contact">
        <ContactPanel />
      </section>
    </>
  );
}
