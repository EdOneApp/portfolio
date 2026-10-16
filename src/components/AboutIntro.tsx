import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./AboutIntro.module.css";

export default function AboutIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.imageWrap} y={0}>
          <Image src="/images/moi.png" alt="Daniel Guedegbe" fill sizes="(max-width: 900px) 100vw, 40vw" />
        </Reveal>
        <div>
          <Reveal delay={0.1}>
            <p className={styles.bio}>
              <strong>Je m&apos;appelle Daniel Guedegbe.</strong> Depuis Abidjan, je conçois des
              architectures backend Python/Django, des APIs critiques et des applications Flutter
              pour des plateformes fintech, des ERP et des produits SaaS aujourd&apos;hui en
              production.
            </p>
          </Reveal>
          <Reveal delay={0.2} className={styles.linksRow}>
            <a className={styles.pillLink} href="/experience">
              Expérience →
            </a>
            <a className={styles.pillLink} href="/education">
              Formation →
            </a>
            <a className={styles.pillLink} href="/certifications">
              Certifications →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
