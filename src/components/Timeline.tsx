import Reveal from "./Reveal";
import styles from "./Timeline.module.css";

export type TimelineEntry = {
  period: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  current?: boolean;
};

export default function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <div className={styles.timeline}>
      <span className={styles.line} />
      {items.map((item, i) => (
        <Reveal key={item.title + i} delay={i * 0.04} className={styles.item} data-current={item.current}>
          <span className={styles.dot} />
          <span className={styles.period}>{item.period}</span>
          <div>
            <h3 className={styles.role}>{item.title}</h3>
            {item.subtitle && <p className={styles.place}>{item.subtitle}</p>}
            {item.description && <p className={styles.desc}>{item.description}</p>}
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
