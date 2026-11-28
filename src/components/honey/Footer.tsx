import Link from "next/link";
import { profile } from "@/data/content";
import { socials } from "@/components/honey/socials";
import { mainLinks, extraLinks } from "./nav-links";
import { Arrow, Mark } from "./ui";

export default function Footer() {
  return (
    <footer className="h-footer">
      <div className="h-footer-cta">
        <p className="h-eyebrow is-light">
          <Mark />
          Le prochain projet commence ici
        </p>
        <Link href="/devis" className="h-footer-big" data-cursor="DEVIS">
          <span>Construisons</span>
          <em>quelque chose de beau.</em>
          <span className="h-footer-big-icon">
            <Arrow />
          </span>
        </Link>
      </div>
      <div className="h-footer-grid">
        <div>
          <p className="h-footer-label">Écrire</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer">
            WhatsApp · {profile.phone}
          </a>
          <Link href="/contact#rendezvous">Réserver 30 minutes</Link>
        </div>
        <div>
          <p className="h-footer-label">Explorer</p>
          {mainLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <p className="h-footer-label">Offres</p>
          {extraLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <p className="h-footer-label">Réseaux</p>
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="h-footer-bottom">
        <span>© {new Date().getFullYear()} {profile.fullName}</span>
        <span>Abidjan, Côte d’Ivoire · GMT</span>
        <a href="#top">Revenir en haut ↑</a>
      </div>
      <div className="h-footer-word" aria-hidden="true">
        Guedegbe
      </div>
    </footer>
  );
}
