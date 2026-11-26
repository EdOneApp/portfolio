import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/content";
import { Arrow } from "./ui";
const colors = [
  "#efd6ad",
  "#d3d9bc",
  "#d7ccc0",
  "#d5dbe2",
  "#e3c2af",
  "#e3cfab",
  "#c5d3c9",
];
export default function ProjectCard({
  project: p,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="agency-project-card" data-reveal>
      <Link
        href={`/work/${p.slug}`}
        className="agency-project-art"
        style={
          {
            "--project-bg": colors[index % colors.length],
          } as React.CSSProperties
        }
        data-cursor="EXPLORER"
      >
        <span className="agency-project-index">
          {String(index + 1).padStart(2, "0")} / SÉLECTION
        </span>
        {p.image ? (
          <div className="agency-project-browser">
            <div>
              <i />
              <i />
              <i />
              <span>{p.link ? new URL(p.link).hostname : p.title}</span>
            </div>
            <Image
              src={p.image}
              alt={`${p.title}, aperçu du projet`}
              width={1300}
              height={850}
              sizes="(max-width:767px) 92vw, 45vw"
            />
          </div>
        ) : (
          <div className="agency-project-fallback">
            <span>{p.title.slice(0, 2).toUpperCase()}</span>
            <p>{p.category}</p>
          </div>
        )}
        {p.mobileImage && (
          <div className="agency-project-phone">
            <Image
              src={p.mobileImage}
              alt={`${p.title}, vue mobile`}
              width={390}
              height={844}
              sizes="(max-width:767px) 24vw,12vw"
            />
          </div>
        )}
        <span className="agency-project-open">
          <Arrow />
        </span>
      </Link>
      <div className="agency-project-caption">
        <div>
          <h3>
            <Link href={`/work/${p.slug}`}>{p.title}</Link>
          </h3>
          <p>{p.category}</p>
        </div>
        <span>{p.tags.slice(0, 2).join(" / ")}</span>
      </div>
    </article>
  );
}
