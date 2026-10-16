import { hero } from "@/data/content";
import RevealLines from "./RevealLines";
import Reveal from "./Reveal";
import MagneticLink from "./MagneticLink";
import styles from "./HomeIntro.module.css";

export default function HomeIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <RevealLines
          as="h4"
          className={styles.statement}
          lines={["Des fondations logicielles", "qui tiennent leurs", "promesses."]}
        />
        <div>
          <Reveal delay={0.1}>
            <p className={styles.text}>{hero.bio}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticLink href="/about" className={styles.btn} strength={30}>
              À propos
            </MagneticLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
