import { socials } from "./socials";
import Link from "next/link";
import { profile } from "@/data/content";
import { Asterisk, Arrow, Label } from "./ui";
export default function AgencyFooter() {
  return (
    <footer className="agency-footer">
      <div className="agency-footer-call" data-reveal>
        <div>
          <Label>TOUT COMMENCE PAR UNE CONVERSATION</Label>
          <h2>
            La prochaine
            <br />
            belle idée,
            <br />
            <em>c’est la vôtre.</em>
          </h2>
        </div>
        <Link
          href="/contact"
          className="agency-footer-circle"
          aria-label="Discuter de votre projet"
        >
          <Arrow />
          <span>ON EN PARLE ?</span>
        </Link>
      </div>
      <div className="agency-footer-middle">
        <a href={`mailto:${profile.email}`}>
          {profile.email}
          <Arrow />
        </a>
        <div>
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
      </div>
      <div className="agency-footer-word" aria-hidden="true">
        LET’S CREATE
        <Asterisk />
      </div>
      <div className="agency-footer-bottom">
        <span>© 2026 Daniel Guedegbe</span>
        <span>Design sensible. Code solide.</span>
        <div>
          <Link href="/services">Services</Link>
          <Link href="/presence-digitale">Présence digitale</Link>
          <Link href="/diagnostic">Test gratuit</Link>
          <Link href="/experience">Parcours</Link>
          <Link href="/certifications">Distinctions</Link>
          <a href="#top">Tout là-haut ↑</a>
        </div>
      </div>
    </footer>
  );
}
