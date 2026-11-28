import Image from "next/image";
import Link from "next/link";
import { projects, awards, journey } from "@/data/content";
import HeroMount from "./HeroMount";
import ProjectCard from "./ProjectCard";
import ProjectRing from "./ProjectRing";
import Counter from "./Counter";
import { services } from "./services-data";
import { Arrow, Btn, Eyebrow, Mark, SectionHead } from "./ui";

const featured = [
  "akservices",
  "ivoirebike",
  "megamonde",
  "cacaosat",
  "babijus",
  "sixcordes",
  "salmacreation",
  "edone",
];

export default function Home() {
  const selection = featured.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
  const timeline = [...journey].reverse();
  return (
    <>
      <section className="h-hero">
        <HeroMount />
        <div className="h-hero-grain" aria-hidden="true" />
        <div className="h-hero-inner">
          <Eyebrow light>Ingénieur logiciel · Design d’expériences · Abidjan</Eyebrow>
          <h1 className="h-hero-title h-split">
            <span>
              <span>Des idées</span>
            </span>
            <span>
              <span>qui prennent</span>
            </span>
            <span>
              <em>vie.</em>
            </span>
          </h1>
          <div className="h-hero-bottom">
            <p>
              Je suis <strong>Daniel Guedegbe</strong>. Sites immersifs, applications web et mobiles,
              data et systèmes sur mesure : je conçois des expériences belles, utiles et solides,
              de la première idée à la mise en ligne.
            </p>
            <div className="h-hero-actions">
              <Btn href="/work" variant="light">
                Explorer les {projects.length} projets
              </Btn>
              <Btn href="/devis" variant="gold">
                Demander un devis
              </Btn>
            </div>
          </div>
        </div>
        <div className="h-hero-foot">
          <a href="#selection" className="h-scroll-cue">
            <span />
            Défiler
          </a>
          <dl>
            <div>
              <dt>Années d’expérience</dt>
              <dd>6+</dd>
            </div>
            <div>
              <dt>Projets présentés</dt>
              <dd>{projects.length}</dd>
            </div>
            <div>
              <dt>Distinctions</dt>
              <dd>3</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="h-marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i}>
              Sites immersifs <Mark /> Applications mobiles <Mark /> Data & BI <Mark /> Présence en
              ligne <Mark /> Image de marque <Mark /> Systèmes sur mesure <Mark />
            </span>
          ))}
        </div>
      </div>

      <section id="selection" className="h-section h-selection">
        <SectionHead eyebrow="01 — Sélection" title="Des projets" em="qui ont du caractère.">
          <p>
            Expériences 3D, boutiques, plateformes et outils métier. Chaque fiche contient le site en
            direct, ses vues ordinateur et mobile.
          </p>
          <Link href="/work" className="h-link">
            Tous les projets <Arrow />
          </Link>
        </SectionHead>
        <div className="h-grid is-featured">
          {selection.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} size={i < 2 ? "lg" : "md"} />
          ))}
        </div>
      </section>

      <section className="h-section h-ring-section">
        <SectionHead
          light
          eyebrow={`02 — Les ${projects.length} réalisations`}
          title="Faites tourner"
          em="la collection."
        >
          <p>Glissez pour parcourir chaque projet, cliquez pour entrer dans son univers.</p>
        </SectionHead>
        <ProjectRing />
      </section>

      <section className="h-section h-services">
        <SectionHead eyebrow="03 — Services" title="Tout ce qu’il faut" em="pour exister en ligne.">
          <p>Pour les particuliers, les entreprises et les institutions.</p>
          <Link href="/services" className="h-link">
            Détail des services <Arrow />
          </Link>
        </SectionHead>
        <div className="h-service-grid">
          {services.map((s, i) => (
            <Link
              key={s.n}
              href={`/devis?type=${s.type}`}
              className="h-service"
              data-reveal
              data-tilt="6"
              style={{ "--d": `${(i % 4) * 70}ms` } as React.CSSProperties}
            >
              <span className="h-service-n">{s.n}</span>
              <h3>
                {s.title} <em>{s.em}</em>
              </h3>
              <p>{s.text}</p>
              <ul>
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="h-service-go">
                Devis <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="h-section h-path">
        <SectionHead light eyebrow="04 — Parcours" title="Six ans de terrain," em="un fil rouge.">
          <Link href="/parcours" className="h-link is-light">
            Le parcours complet <Arrow />
          </Link>
        </SectionHead>
        <div className="h-path-track">
          {timeline.map((j, i) => (
            <article key={j.period} className={`h-path-step ${j.current ? "is-current" : ""}`} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <span className="h-path-dot" aria-hidden="true" />
              <small>{j.period}</small>
              <h3>{j.role}</h3>
              <p>{j.place}</p>
            </article>
          ))}
        </div>
        <div className="h-stats">
          <div>
            <strong>
              <Counter to={6} suffix="+" />
            </strong>
            <span>années d’ingénierie</span>
          </div>
          <div>
            <strong>
              <Counter to={projects.length} />
            </strong>
            <span>projets à explorer</span>
          </div>
          <div>
            <strong>
              <Counter to={8} suffix="+" />
            </strong>
            <span>partenaires & clients</span>
          </div>
          <div>
            <strong>
              <Counter to={3} />
            </strong>
            <span>distinctions</span>
          </div>
        </div>
      </section>

      <section className="h-section h-person">
        <div className="h-person-media" data-parallax="0.08">
          <Image
            src="/images/agency/portrait-two.webp"
            alt="Portrait de Daniel Guedegbe"
            width={720}
            height={880}
            sizes="(max-width:767px) 90vw, 40vw"
          />
          <span className="h-person-tag">Abidjan · le monde en tête</span>
        </div>
        <div className="h-person-copy" data-reveal>
          <Eyebrow>05 — Enchanté</Eyebrow>
          <h2>
            Un seul interlocuteur, <em>du croquis au code.</em>
          </h2>
          <p>
            Ingénieur full stack, j’aime les interfaces qui ont une personnalité et les systèmes qui
            rendent service. Fintech, éducation, mobilité, commerce : chaque projet reçoit le même
            soin, le même sérieux.
          </p>
          <ul className="h-awards">
            {awards.map((a) => (
              <li key={a.title}>
                <small>{a.date}</small>
                {a.title}
              </li>
            ))}
          </ul>
          <Btn href="/about" variant="ghost">
            Faire connaissance
          </Btn>
        </div>
      </section>

      <section className="h-section h-cta">
        <div className="h-cta-card" data-tilt="4">
          <Eyebrow light>Votre projet</Eyebrow>
          <h2>
            Un devis précis <em>en 3 minutes.</em>
          </h2>
          <p>
            Site, application, présence en ligne, image, pages ou data : décrivez votre besoin,
            validez, et il arrive directement sur mon WhatsApp.
          </p>
          <div className="h-hero-actions">
            <Btn href="/devis" variant="gold">
              Commencer mon devis
            </Btn>
            <Btn href="/contact#rendezvous" variant="light">
              Réserver un appel de 30 min
            </Btn>
          </div>
          <Mark className="h-cta-mark" />
        </div>
      </section>
    </>
  );
}
