import DigitalGlobe from "./DigitalGlobe";
import Reveal from "./Reveal";
import styles from "./LineGlobe.module.css";

export default function LineGlobe() {
  return (
    <section className={styles.section}>
      <Reveal y={0}>
        <DigitalGlobe />
      </Reveal>
    </section>
  );
}
