"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "@/data/content";
import WorkTiles from "./WorkTiles";
import styles from "./WorkGrid.module.css";

type Filter = {
  key: string;
  label: string;
  match: (p: Project) => boolean;
};

const FILTERS: Filter[] = [
  { key: "all", label: "Tous", match: () => true },
  {
    key: "backend",
    label: "Backend",
    match: (p) => p.tags.some((t) => ["Django", "Flask", "FastAPI", "REST API", "Celery", "PyPI"].includes(t)),
  },
  { key: "mobile", label: "Mobile", match: (p) => p.tags.includes("Flutter") },
  {
    key: "fintech",
    label: "Fintech",
    match: (p) =>
      p.tags.some((t) =>
        ["Fintech", "Mobile Money", "Paiement Wave", "Paiement échelonné", "MTN MoMo API", "HMAC-SHA256"].includes(t)
      ),
  },
  { key: "ecommerce", label: "E-commerce", match: (p) => p.tags.includes("E-commerce") },
  {
    key: "mobilite",
    label: "Mobilité",
    match: (p) =>
      p.tags.some((t) => ["VTC", "Énergie / Recharge", "Solaire", "Battery swapping", "Multi-pays"].includes(t)),
  },
  { key: "sig", label: "SIG / Data", match: (p) => p.tags.some((t) => ["SIG", "Satellite", "Blockchain"].includes(t)) },
];

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
        <span className={styles.meta}>{project.category}</span>
        <span className={styles.meta}>{project.tags.slice(0, 2).join(" · ")}</span>
        <span className={styles.link}>{project.link ? "Voir le site ↗" : "Dépôt / Interne"}</span>
      </div>
      {project.image && (
        <motion.div className={styles.preview} style={{ x: springX, y: springY }}>
          <Image src={project.image} alt={project.title} width={260} height={170} />
        </motion.div>
      )}
    </Link>
  );
}

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("all");
  const [view, setView] = useState<"rows" | "columns">("rows");

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f.key, projects.filter(f.match).length])),
    [projects]
  );

  const filtered = useMemo(() => {
    const filter = FILTERS.find((f) => f.key === active) ?? FILTERS[0];
    return projects.filter(filter.match);
  }, [active, projects]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.filterRow}>
          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={styles.filterBtn}
                data-active={active === f.key}
                onClick={() => setActive(f.key)}
              >
                {f.label}
                <span className={styles.count}>{counts[f.key]}</span>
              </button>
            ))}
          </div>
          <div className={styles.viewToggle}>
            <button
              className={styles.viewBtn}
              data-active={view === "rows"}
              onClick={() => setView("rows")}
              aria-label="Vue liste"
            >
              ☰
            </button>
            <button
              className={styles.viewBtn}
              data-active={view === "columns"}
              onClick={() => setView("columns")}
              aria-label="Vue grille"
            >
              ▦
            </button>
          </div>
        </div>

        {view === "rows" ? (
          <>
            <div className={styles.headerRow}>
              <span>Projet</span>
              <span>Catégorie</span>
              <span>Stack</span>
              <span>Lien</span>
            </div>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Row project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        ) : (
          <WorkTiles projects={filtered} />
        )}
      </div>
    </section>
  );
}
