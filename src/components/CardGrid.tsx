import Reveal from "./Reveal";
import styles from "./CardGrid.module.css";

export type Card = {
  title: string;
  subtitle?: string;
  date?: string;
  text?: string;
};

export default function CardGrid({ heading, cards }: { heading: string; cards: Card[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.heading}>{heading}</p>
        </Reveal>
        <div className={styles.grid}>
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.04} className={styles.card}>
              {card.date && <span className={styles.cardDate}>{card.date}</span>}
              <h3 className={styles.cardTitle}>{card.title}</h3>
              {card.subtitle && <p className={styles.cardSub}>{card.subtitle}</p>}
              {card.text && <p className={styles.cardText}>{card.text}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
