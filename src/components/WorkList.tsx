"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "@/data/content";
import Reveal from "./Reveal";
import styles from "./WorkList.module.css";

function Row({ project }: { project: Project }) {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const springX = useSpring(x, { stiffness: 250, damping: 26 });
  const springY = useSpring(y, { stiffness: 250, damping: 26 });

  function handleMouseMove(e: React.MouseEvent) {
    x.set(e.clientX + 24);
    y.set(e.clientY - 85);
  }

  return (
    <Link href={`/work/${project.slug}`} className={styles.row} onMouseMove={handleMouseMove}>
      <div className={styles.rowInner}>
        <h4 className={styles.title}>{project.title}</h4>
        <span className={styles.category}>{project.category}</span>
      </div>
      {project.image && (
        <motion.div className={styles.preview} style={{ x: springX, y: springY }}>
          <Image src={project.image} alt={project.title} width={260} height={170} />
        </motion.div>
      )}
    </Link>
  );
}

export default function WorkList({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.subTitle}>{title}</p>
        </Reveal>
        <div className={styles.list}>
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Row project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
