"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/data/content";
import DigitalGlobe from "./DigitalGlobe";
import styles from "./Hero.module.css";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const nameX = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section className={styles.hero} ref={ref}>
      <motion.div className={styles.imageWrap} style={{ y: imageY }}>
        <Image
          src="/images/headerbigImagefull.png"
          alt={profile.fullName}
          fill
          priority
          sizes="100vw"
        />
      </motion.div>

      <div className={styles.globeWrap}>
        <DigitalGlobe />
      </div>

      <motion.div
        className={styles.badgeRow}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className={styles.badge}>
          <span className={styles.dot} />
          {profile.availabilityBadge}
        </span>
      </motion.div>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <strong>{profile.role}</strong>
      </motion.p>

      <div className={styles.nameRow}>
        <motion.h1
          className={styles.name}
          style={{ x: nameX }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {profile.fullName}
          <span>—</span>
        </motion.h1>
      </div>
    </section>
  );
}
