import { skillCategories } from "@/data/content";
import Reveal from "./Reveal";
import styles from "./SkillsGrid.module.css";

export default function SkillsGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.heading}>Compétences détaillées</p>
        </Reveal>
        <div className={styles.grid}>
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.04} className={styles.category}>
              <h3>{cat.title}</h3>
              <div className={styles.items}>
                {cat.items.map((item) => (
                  <span className={styles.chip} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
