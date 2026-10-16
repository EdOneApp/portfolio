"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { profile, hero } from "@/data/content";
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

      <motion.div
        className={styles.badge}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className={styles.dot} />
        {profile.availabilityBadge}
      </motion.div>

      <div className={styles.nameRow}>
        <motion.h1 className={styles.name} style={{ x: nameX }}>
          {profile.fullName}
        </motion.h1>
      </div>

      <div className={styles.subRow}>
        <motion.p
          className={styles.role}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <strong>{profile.role}</strong> — {hero.bio}
        </motion.p>

        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {hero.stats.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className={styles.scrollCue}>
        Scroll
        <span className={styles.scrollLine}>
          <span />
        </span>
      </div>
    </section>
  );
}
