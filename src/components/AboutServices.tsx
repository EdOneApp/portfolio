import { terrains } from "@/data/content";
import Reveal from "./Reveal";
import styles from "./AboutServices.module.css";

export default function AboutServices() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.heading}>
            Je peux vous aider avec
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
          </h2>
        </Reveal>
        <div className={styles.grid}>
          {terrains.map((t, i) => (
            <Reveal key={t.index} delay={i * 0.06} className={styles.item}>
              <h5>{t.index}</h5>
              <div className={styles.stripe} />
              <h4>{t.title}</h4>
              <p>{t.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
