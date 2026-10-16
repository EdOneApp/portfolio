import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/content";
import Reveal from "./Reveal";
import styles from "./WorkTiles.module.css";

export default function WorkTiles({ projects }: { projects: Project[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04} as="div">
            <Link href={`/work/${p.slug}`} className={styles.tile}>
              <div className={styles.imageWrap}>
                {p.image ? (
                  <Image src={p.image} alt={p.title} fill sizes="50vw" />
                ) : (
                  <div className={styles.fallback} />
                )}
              </div>
              <div className={styles.meta}>
                <span className={styles.title}>{p.title}</span>
                <span className={styles.category}>{p.category}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
