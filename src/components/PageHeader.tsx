import RevealLines from "./RevealLines";
import styles from "./PageHeader.module.css";

export default function PageHeader({ title }: { title: string[] }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <RevealLines as="h1" className={styles.title} lines={title} />
      </div>
    </header>
  );
}
