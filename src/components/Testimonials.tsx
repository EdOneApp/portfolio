import { testimonials } from "@/data/content";
import Reveal from "./Reveal";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.heading}>Ce qu&apos;ils en disent</p>
        </Reveal>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05} className={styles.card}>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.person}>
                <span className={styles.avatar}>{t.initials}</span>
                <div>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.role}>{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
