"use client";
import { useMemo, useState } from "react";
import { projects } from "@/data/content";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { Arrow } from "./ui";
const filters = [
  "Tous les projets",
  "Web & design",
  "Mobile",
  "Backend & outils",
  "Data & bases",
  "Systèmes métier",
  "Fintech",
  "Mobilité",
];
export default function ProjectArchive() {
  const [filter, setFilter] = useState(filters[0]),
    [query, setQuery] = useState(""),
    [view, setView] = useState<"grid" | "list">("grid");
  const selected = useMemo(
    () =>
      projects.filter((p) => {
        const text = [p.title, p.category, ...p.tags]
          .join(" ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        if (
          !text.includes(
            query
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase(),
          )
        )
          return false;
        switch (filter) {
          case "Web & design":
            return p.tags.some((t) =>
              ["Next.js", "React", "Astro", "E-commerce"].includes(t),
            );
          case "Mobile":
            return p.tags.includes("Flutter");
          case "Backend & outils":
            return p.tags.some((t) =>
              ["Django", "Flask", "Python", "PyPI"].includes(t),
            );
          case "Data & bases":
            return /donnees|financ|cartograph|sig|postgresql|redis|analytics/.test(
              text,
            );
          case "Systèmes métier":
            return /erp|gestion|rh|factur|logistique|tracabilite/.test(text);
          case "Fintech":
            return /fintech|financi|factur|paiement|money|wave/i.test(text);
          case "Mobilité":
            return /mobilité|vtc|électrique/i.test(text);
          default:
            return true;
        }
      }),
    [filter, query],
  );
  return (
    <section className="agency-archive">
      <div className="agency-archive-tools">
        <div className="agency-filters" aria-label="Filtrer les projets">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="agency-view-controls">
          <button
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            aria-label="Afficher en grille"
          >
            ▦
          </button>
          <button
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            aria-label="Afficher en liste"
          >
            ☰
          </button>
        </div>
      </div>
      <div className="agency-search-row">
        <label>
          <span>⌕</span>
          <input
            placeholder="Un projet, une technologie, une envie…"
            aria-label="Rechercher un projet"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Effacer la recherche"
            >
              ✕
            </button>
          )}
        </label>
        <span aria-live="polite">
          {String(selected.length).padStart(2, "0")} PROJETS
        </span>
      </div>
      {view === "grid" ? (
        <div className="agency-project-grid" key={filter + query}>
          {selected.map((p) => (
            <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
          ))}
        </div>
      ) : (
        <div className="agency-project-list">
          {selected.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`}>
              <small>{String(projects.indexOf(p) + 1).padStart(2, "0")}</small>
              <h2>{p.title}</h2>
              <span>{p.category}</span>
              <Arrow />
            </Link>
          ))}
        </div>
      )}
      {!selected.length && (
        <div className="agency-empty">
          <h2>
            La bonne idée est
            <br />
            <em>peut-être ailleurs.</em>
          </h2>
          <p>Aucun projet ne correspond à cette recherche.</p>
          <button
            className="agency-pill"
            onClick={() => {
              setFilter(filters[0]);
              setQuery("");
            }}
          >
            Tout explorer <Arrow />
          </button>
        </div>
      )}
    </section>
  );
}
