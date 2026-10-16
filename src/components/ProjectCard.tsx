"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "@/data/content";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const springX = useSpring(x, { stiffness: 250, damping: 26 });
  const springY = useSpring(y, { stiffness: 250, damping: 26 });

  function handleMouseMove(e: React.MouseEvent) {
    x.set(e.clientX + 24);
    y.set(e.clientY - 95);
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className={styles.card}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.row}>
        <div className={styles.titleCol}>
          <h3 className={styles.title}>{project.title}</h3>
          {project.award && <span className={styles.award}>{project.award.split(" ")[0]}</span>}
        </div>
        <div className={styles.meta}>
          <span className={styles.tags}>{project.tags.slice(0, 2).join(" · ")}</span>
          <span className={styles.arrow}>↗</span>
        </div>
      </div>

      <motion.div className={styles.preview} style={{ x: springX, y: springY }}>
        {project.image ? (
          <Image src={project.image} alt={project.title} width={280} height={190} />
        ) : (
          <div className={styles.previewFallback} />
        )}
      </motion.div>
    </Link>
  );
}
