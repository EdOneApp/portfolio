import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, profile } from "@/data/content";
import Reveal from "@/components/Reveal";
import DeviceFrame from "@/components/DeviceFrame";
import styles from "./page.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${profile.fullName}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const hasPhone = project.tags.includes("Flutter");

  return (
    <>
      <div className={styles.hero}>
        <Reveal>
          <p className={styles.eyebrow}>{project.category}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className={styles.title}>{project.title}</h1>
        </Reveal>

        <div className={styles.metaRow}>
          <Reveal delay={0.1}>
            <p className={styles.description}>{project.description}</p>
          </Reveal>
          <Reveal delay={0.15} className={styles.tags}>
            {project.tags.map((t) => (
              <span className={styles.tag} key={t}>
                {t}
              </span>
            ))}
          </Reveal>
        </div>

        {project.award && (
          <Reveal delay={0.2}>
            <span className={styles.award}>{project.award}</span>
          </Reveal>
        )}

        {project.link && (
          <Reveal delay={0.25}>
            <a className={styles.cta} href={project.link} target="_blank" rel="noopener noreferrer">
              {project.linkLabel ?? "Voir le site"} ↗
            </a>
          </Reveal>
        )}

        {project.stats && (
          <div className={styles.statsRow}>
            {project.stats.map((s) => (
              <Reveal key={s.label} className={styles.stat}>
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {project.image ? (
        <Reveal y={40} className={styles.heroImage}>
          <Image src={project.image} alt={project.title} fill sizes="100vw" priority />
        </Reveal>
      ) : (
        <Reveal y={40} className={styles.heroImage}>
          <div className={styles.heroFallback}>{project.title}</div>
        </Reveal>
      )}

      {project.image && (
        <div className={styles.devicesSection}>
          <div className={styles.devicesGrid} data-with-phone={hasPhone}>
            <DeviceFrame variant="laptop-compact" image={project.image} alt={`${project.title} — vue web`} />
            {hasPhone && (
              <DeviceFrame variant="phone" image={project.image} alt={`${project.title} — application mobile`} />
            )}
          </div>
        </div>
      )}

      <div className={styles.nextSection}>
        <p className={styles.nextLabel}>Projet suivant</p>
        <Link href={`/work/${next.slug}`} className={styles.nextTitle}>
          {next.title} →
        </Link>
      </div>
    </>
  );
}
