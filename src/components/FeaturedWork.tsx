import { featuredProjects } from "@/data/content";
import Reveal from "./Reveal";
import MagneticLink from "./MagneticLink";
import ProjectCard from "./ProjectCard";
import styles from "./FeaturedWork.module.css";
import projectListStyles from "./ProjectCard.module.css";

export default function FeaturedWork() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headRow}>
          <Reveal>
            <p className={styles.heading}>Projets récents</p>
          </Reveal>
          <Reveal>
            <MagneticLink href="/work" className={styles.viewAll} strength={14}>
              Voir tous les projets →
            </MagneticLink>
          </Reveal>
        </div>
        <div className={projectListStyles.list}>
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
