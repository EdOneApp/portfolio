"use client";

import { motion } from "motion/react";
import styles from "./RevealLines.module.css";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const line = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function RevealLines({
  lines,
  className,
  as: Tag = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
}) {
  return (
    <Tag className={className}>
      <motion.span
        style={{ display: "block" }}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {lines.map((text, i) => (
          <span className={styles.wrap} key={i}>
            <motion.span className={styles.line} variants={line}>
              {text}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
