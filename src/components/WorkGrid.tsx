"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/data/content";
import ProjectCard from "./ProjectCard";
import styles from "./WorkGrid.module.css";
import listStyles from "./ProjectCard.module.css";

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

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("all");

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

        <div className={listStyles.list}>
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
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
