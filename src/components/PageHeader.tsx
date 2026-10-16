import RevealLines from "./RevealLines";
import Reveal from "./Reveal";
import styles from "./PageHeader.module.css";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string[];
  intro?: string;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.eyebrow}>{eyebrow}</p>
        </Reveal>
        <RevealLines as="h1" className={styles.title} lines={title} />
        {intro && (
          <Reveal delay={0.1}>
            <p className={styles.intro}>{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
