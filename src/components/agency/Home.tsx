"use client";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { projects, awards } from "@/data/content";
import ProjectCard from "./ProjectCard";
import { Arrow, Asterisk, Label, Pill, SectionHeading } from "./ui";
export default function AgencyHome() {
  const hero = useRef<HTMLElement>(null),
    reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const lift = useTransform(scrollYProgress, [0, 1], [0, -95]),
    rotate = useTransform(scrollYProgress, [0, 1], [-7, 3]);
  const selected = [
    "babijus",
    "myoctogone",
    "salmacreation",
    "spaghetti-abidjan",
    "edone",
    "brvm-analytics",
  ]
    .map((slug) => projects.find((p) => p.slug === slug)!)
    .filter(Boolean);
  return (
    <>
      <section className="agency-hero" ref={hero}>
        <div className="agency-hero-meta">
          <span>
            <i />
            INDÉPENDANT · ABIDJAN & PARTOUT AILLEURS
          </span>
          <span>DESIGN × DÉVELOPPEMENT</span>
        </div>
        <div className="agency-hero-main">
          <div className="agency-hero-copy">
            <p className="agency-hero-intro">
              L’esprit d’un studio.
              <br />
              La précision d’un ingénieur.
            </p>
            <h1>
              <span>
                <motion.span
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                >
                  De l’idée
                </motion.span>
              </span>
              <span>
                <motion.em
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.23,
                  }}
                >
                  à l’impact.
                </motion.em>
              </span>
            </h1>
            <p className="agency-hero-desc">
              Je suis Daniel Guedegbe. Applications web et mobiles, data,
              systèmes sur mesure et présence digitale : je transforme vos idées
              en outils utiles, beaux et solides.
            </p>
            <div className="agency-hero-actions">
              <Pill href="/work">
                Explorer les projets <small>({projects.length})</small>
              </Pill>
              <Link href="/about" className="agency-hero-about">
                Faire connaissance
                <Arrow />
              </Link>
            </div>
          </div>
          <motion.div
            className="agency-hero-art"
            style={reduced ? undefined : { y: lift }}
          >
            <div className="agency-hero-orbit">
              <span />
              <span />
              <span />
            </div>
            <motion.div
              className="agency-hero-window"
              style={reduced ? undefined : { rotate }}
            >
              <div className="agency-browser-chrome">
                <i />
                <i />
                <i />
                <span>babijus.myoctogone.com</span>
                <Arrow />
              </div>
              <Image
                src="/images/babijus-web.webp"
                alt="BABI JUS, site immersif de jus ivoiriens"
                width={1280}
                height={720}
                priority
                sizes="(max-width:767px) 88vw,47vw"
              />
              <span className="agency-art-caption">
                DU CARACTÈRE, JUSQU’AU DERNIER PIXEL.
              </span>
            </motion.div>
            <motion.div
              className="agency-hero-mini"
              animate={
                reduced ? undefined : { y: [0, -12, 0], rotate: [8, 5, 8] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/salmacreation-web.webp"
                alt="Salma Création, boutique de maroquinerie"
                width={900}
                height={600}
                priority
                sizes="(max-width:767px) 45vw,24vw"
              />
            </motion.div>
            <div className="agency-hero-portrait">
              <Image
                src="/images/agency/portrait-one.webp"
                alt="Daniel Guedegbe"
                width={320}
                height={320}
                priority
              />
              <span>
                UN VISAGE.
                <br />
                UNE VRAIE IMPLICATION.
              </span>
            </div>
            <Asterisk className="agency-hero-star" />
            <span className="agency-hero-sticker">
              ÇA COMMENCE
              <br />
              <em>avec vous.</em>
              <Arrow />
            </span>
          </motion.div>
        </div>
        <div className="agency-hero-foot">
          <a href="#selection">
            FAITES DÉFILER POUR DÉCOUVRIR <span>↓</span>
          </a>
          <div>
            <span>
              6+<small>ANS D’EXPÉRIENCE</small>
            </span>
            <span>
              3<small>DISTINCTIONS</small>
            </span>
            <span>
              {projects.length}
              <small>PROJETS À EXPLORER</small>
            </span>
          </div>
        </div>
      </section>
      <div className="agency-marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              CREATIVE DEVELOPMENT
              <Asterisk />
              WEB DESIGN
              <Asterisk />
              BACKEND SOLIDE
              <Asterisk />
              EXPÉRIENCES UTILES
              <Asterisk />
            </span>
          ))}
        </div>
      </div>
      <section id="selection" className="agency-selected agency-section">
        <SectionHeading
          eyebrow="01 / QUELQUES BELLES RENCONTRES"
          title="Les idées prennent"
          em="vie, ici."
        >
          <p>
            Du premier croquis à la mise en ligne.
            <br />
            Des projets différents, la même exigence.
          </p>
        </SectionHeading>
        <div className="agency-project-grid agency-featured-grid">
          {selected.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <div className="agency-collection-end">
          <span>Et ce n’est qu’un début.</span>
          <Pill href="/work">
            Tous les projets <small>({projects.length})</small>
          </Pill>
        </div>
      </section>
      <section className="agency-belief agency-section">
        <Label>02 / LA FORME SÉDUIT. LE FOND FAIT RESTER.</Label>
        <h2 data-reveal>
          Un beau site attire.
          <br />
          Une bonne expérience
          <br />
          <em>fait la différence.</em>
        </h2>
        <div className="agency-belief-bottom">
          <Asterisk />
          <p>
            Je relie le design à l’ingénierie. Une interface qui donne envie, un
            parcours qui fait sens et une architecture pensée pour durer. Pas de
            choix entre beau et bien construit.
          </p>
          <Link href="/about" className="agency-text-link">
            L’approche <Arrow />
          </Link>
        </div>
      </section>
      <section className="agency-services agency-section">
        <SectionHeading
          eyebrow="03 / DE L’INTENTION À LA PRODUCTION"
          title="Une vision complète."
          em="Du concret, surtout."
        />
        <div className="agency-service-grid">
          {[
            [
              "01",
              "Le web.\nLe mobile aussi.",
              "Applications web, SaaS et applications mobiles : des expériences pensées pour vos clients et vos équipes.",
              "Next.js / Django / Flutter",
            ],
            [
              "02",
              "Vos données.\nDe vraies décisions.",
              "Collecte, traitement, tableaux de bord et visualisation. Rendez vos données lisibles et exploitables.",
              "Data / BI / Visualisation",
            ],
            [
              "03",
              "Des bases saines.\nEt bien administrées.",
              "Conception de bases de données, optimisation des requêtes, sauvegardes et suivi de performance.",
              "PostgreSQL / Modélisation / Administration",
            ],
            [
              "04",
              "Votre métier.\nVotre système.",
              "ERP, outils internes, APIs, intégrations et automatisations : des systèmes construits autour de votre activité.",
              "Sur mesure / Intégrations / Backend",
            ],
            [
              "05",
              "Une marque.\nUne vraie expérience.",
              "Sites vitrines, e-commerce et refontes. Une direction visuelle affirmée, du mouvement juste et des détails soignés.",
              "Design / Frontend / Motion",
            ],
            [
              "06",
              "Être visible.\nDonner envie.",
              "Google, site professionnel, référencement local, réseaux sociaux, vidéos et visuels IA : une présence digitale cohérente.",
              "Google / Social / Contenu",
            ],
          ].map(([n, t, d, tag]) => (
            <article key={n} data-reveal>
              <span>
                {n}
                <Arrow />
              </span>
              <h3>
                {t.split("\n").map((s, i) => (
                  <span key={s}>
                    {i === 1 ? <em>{s}</em> : s}
                    <br />
                  </span>
                ))}
              </h3>
              <p>{d}</p>
              <small>{tag}</small>
            </article>
          ))}
        </div>
        <div className="presence-links">
          <Link href="/services" className="agency-pill">
            Tous les services <Arrow />
          </Link>
          <Link
            href="/presence-digitale"
            className="agency-pill agency-attention-cta agency-attention-packs"
          >
            Découvrir les packs visibilité <Arrow />
          </Link>
          <Link
            href="/diagnostic"
            className="agency-pill agency-attention-cta agency-attention-diagnostic"
          >
            Tester ma présence gratuitement <Arrow />
          </Link>
        </div>
      </section>
      <section className="agency-person agency-section">
        <div className="agency-person-image" data-reveal>
          <Image
            src="/images/agency/portrait-two.webp"
            alt="Portrait de Daniel Guedegbe, ingénieur logiciel à Abidjan"
            width={720}
            height={720}
            sizes="(max-width:767px) 90vw,42vw"
          />
          <span>
            ABIDJAN,
            <br />
            <em>le monde en tête.</em>
          </span>
        </div>
        <div data-reveal>
          <Label>04 / UNE PERSONNE. TOUTE L’IMPLICATION.</Label>
          <h2>
            Enchanté,
            <br />
            <em>moi c’est Daniel.</em>
          </h2>
          <p>
            Ingénieur logiciel full stack, passionné par les interfaces qui ont
            une personnalité et les systèmes qui rendent service. Depuis
            Abidjan, je travaille à la rencontre du design, du code et des
            usages.
          </p>
          <p>
            Fintech, éducation, mobilité, commerce : chaque projet est une
            occasion de faire les choses avec soin.
          </p>
          <Pill href="/about">Un peu plus sur moi</Pill>
        </div>
      </section>
      <section className="agency-book-call agency-section">
        <Label>UN CRÉNEAU. UNE BONNE CONVERSATION.</Label>
        <h2>
          30 minutes pour
          <br />
          <em>ouvrir les possibles.</em>
        </h2>
        <p>On échange sur votre idée, votre contexte et la prochaine étape.</p>
        <Pill href="/contact#rendezvous">Trouver un moment ensemble</Pill>
        <span>ABIDJAN · GMT / UTC+0</span>
      </section>
      <section className="agency-recognition agency-section">
        <Label>QUELQUES REPÈRES SUR LE CHEMIN</Label>
        {awards.slice(0, 3).map((a, i) => (
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
