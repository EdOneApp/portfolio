"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "@/data/content";
import ProjectCard from "./ProjectCard";
import { groups, projectGroup, type GroupId } from "./project-groups";

export default function ProjectsExplorer() {
  const [group, setGroup] = useState<GroupId>("all");
  const [query, setQuery] = useState("");
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inGroup = group === "all" || projectGroup[p.slug]?.includes(group);
      const inQuery =
        !q ||
        [p.title, p.category, ...p.tags].join(" ").toLowerCase().includes(q);
      return inGroup && inQuery;
    });
  }, [group, query]);

  return (
    <section className="h-explorer h-section">
      <div className="h-filters">
        <div className="h-chips" role="group" aria-label="Filtrer les projets">
          {groups.map((g) => {
            const n =
              g.id === "all"
                ? projects.length
                : projects.filter((p) => projectGroup[p.slug]?.includes(g.id)).length;
            return (
              <button
                key={g.id}
                aria-pressed={group === g.id}
                onClick={() => setGroup(g.id)}
              >
                {g.label}
                <sup>{n}</sup>
              </button>
            );
          })}
        </div>
        <label className="h-search">
          <span className="h-sr">Rechercher un projet</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher : Flutter, e-commerce, 3D…"
          />
        </label>
      </div>
      <p className="h-explorer-count" role="status">
        {list.length} projet{list.length > 1 ? "s" : ""}
      </p>
      <motion.div layout className="h-grid">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, rotateX: 12 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} index={projects.indexOf(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <p className="h-empty">Aucun projet ne correspond. Essayez un autre mot.</p>
      )}
    </section>
  );
}
