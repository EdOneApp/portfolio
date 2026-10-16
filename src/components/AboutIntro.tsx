"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "./Reveal";
import styles from "./AboutIntro.module.css";

export default function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.text}>
            J&apos;aide des entreprises d&apos;Abidjan et d&apos;ailleurs avec des solutions sur
            mesure. À chaque projet, je pousse mon travail un peu plus loin, en mettant toujours la
            qualité en premier.
            <span className={styles.exploring}>
              Toujours en exploration<span className={styles.dot}>.</span>
              <span className={styles.dot}>.</span>
              <span className={styles.dot}>.</span>
            </span>
          </p>
        </Reveal>
        <div className={styles.imageWrap} ref={ref}>
          <motion.div style={{ y, height: "116%", position: "relative" }}>
            <Image src="/images/moi.png" alt="Daniel Guedegbe" fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: "cover" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
