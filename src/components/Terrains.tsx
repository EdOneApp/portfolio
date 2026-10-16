import { terrains } from "@/data/content";
import Reveal from "./Reveal";
import styles from "./Terrains.module.css";

export default function Terrains() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.heading}>Terrains d&apos;intervention</p>
        </Reveal>
        <div className={styles.list}>
          {terrains.map((t, i) => (
            <Reveal key={t.index} delay={i * 0.06} className={styles.item}>
              <span className={styles.index}>{t.index}</span>
              <div className={styles.titleWrap}>
                <h3>{t.title}</h3>
                <span>{t.verb}</span>
              </div>
              <p className={styles.body}>{t.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
