import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/content";
import { Arrow } from "./ui";

export default function ProjectCard({
  project: p,
  index = 0,
  size = "md",
}: {
  project: Project;
  index?: number;
  size?: "md" | "lg";
}) {
  const host = p.link ? new URL(p.link).hostname.replace(/^www\./, "") : p.title;
  return (
    <article className={`h-card is-${size}`} data-reveal style={{ "--d": `${(index % 3) * 90}ms` } as React.CSSProperties}>
      <Link
        href={`/work/${p.slug}`}
        className="h-card-stage"
        data-tilt="9"
        data-cursor="OUVRIR"
        aria-label={`${p.title} : ${p.category}`}
      >
        <span className="h-card-glare" aria-hidden="true" />
        <span className="h-card-num" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="h-card-browser">
          <div className="h-card-bar">
            <i />
            <i />
            <i />
            <span>{host}</span>
          </div>
          {p.image ? (
            <Image
              src={p.image}
              alt=""
              width={1300}
              height={850}
              sizes="(max-width:767px) 92vw, 46vw"
            />
          ) : (
            <div className="h-card-fallback">{p.title}</div>
          )}
        </div>
        {p.mobileImage && (
          <div className="h-card-phone">
            <Image src={p.mobileImage} alt="" width={390} height={844} sizes="(max-width:767px) 26vw, 12vw" />
          </div>
        )}
        <span className="h-card-go" aria-hidden="true">
          <Arrow />
        </span>
      </Link>
      <div className="h-card-meta">
        <div>
          <h3>{p.title}</h3>
          <p>{p.category}</p>
        </div>
        <ul>
          {p.tags.slice(0, 3).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      {p.award && <p className="h-card-award">{p.award}</p>}
    </article>
  );
}
