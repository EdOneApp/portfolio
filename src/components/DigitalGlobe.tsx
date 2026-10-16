import styles from "./DigitalGlobe.module.css";

export default function DigitalGlobe() {
  return (
    <div className={styles.ball}>
      <div className={styles.globe}>
        <div className={styles.globeWrap}>
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circleHor} />
          <div className={styles.circleHorMiddle} />
        </div>
      </div>
    </div>
  );
}
