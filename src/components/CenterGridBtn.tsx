import MagneticLink from "./MagneticLink";
import Reveal from "./Reveal";
import styles from "./CenterGridBtn.module.css";

export default function CenterGridBtn({
  href,
  label,
  count,
}: {
  href: string;
  label: string;
  count: number;
}) {
  return (
    <section className={styles.section}>
      <Reveal>
        <MagneticLink href={href} className={styles.btn} strength={20}>
          {label}
          <span className={styles.count}>{count}</span>
        </MagneticLink>
      </Reveal>
    </section>
  );
}
