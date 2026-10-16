"use client";

import MagneticLink from "./MagneticLink";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <MagneticLink href="/" strength={14} className={styles.logo}>
      <span className={styles.mark}>DG</span>
      <span className={styles.textWrap}>
        <span className={styles.name}>Daniel Guedegbe</span>
        <span className={styles.role}>Full Stack Senior</span>
      </span>
    </MagneticLink>
  );
}
