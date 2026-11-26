import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, profile } from "@/data/content";
import { Arrow, Label, Asterisk } from "@/components/agency/ui";
import LivePreview from "@/components/agency/LivePreview";
import DeviceFrame from "@/components/DeviceFrame";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: p.title,
        description: p.description,
        keywords: [p.title, p.category, ...p.tags],
        alternates: { canonical: `/work/${p.slug}/` },
        openGraph: {
          title: `${p.title} — ${profile.fullName}`,
          description: p.description,
          images: p.image ? [{ url: p.image }] : undefined,
        },
      }
    : { title: "Projet introuvable" };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const p = projects[index],
    next = projects[(index + 1) % projects.length];
  return (
    <>
      <header className="agency-project-head">
        <Link href="/work" className="agency-back">
          ← Toutes les réalisations
        </Link>
        <div className="agency-project-title">
          <h1>
            {p.title}
            <span>.</span>
          </h1>
          <span>
            PROJET {String(index + 1).padStart(2, "0")} / {projects.length}
          </span>
        </div>
        <div className="agency-project-intro">
          <div>
            <Label>LE TERRAIN DE JEU</Label>
            <p>{p.category}</p>
          </div>
          <div>
            <Label>LES OUTILS</Label>
            <p>{p.tags.join(" · ")}</p>
          </div>
          <div>
            <Label>{p.award ? "LA DISTINCTION" : "DÉCOUVRIR"}</Label>
            {p.award ? (
              <p>{p.award}</p>
            ) : p.link ? (
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                {p.linkLabel || "Explorer le projet"} <Arrow />
              </a>
            ) : (
              <p>Présentation du projet</p>
            )}
          </div>
        </div>
      </header>
      <section className="agency-project-hero-image">
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.title}, vue d’ensemble du projet`}
            width={1800}
            height={1000}
            priority
            sizes="100vw"
          />
        ) : (
          <div className="agency-project-fallback">
            <span>{p.title}</span>
            <Asterisk />
          </div>
        )}
      </section>
      <section className="agency-project-story agency-section">
        <Label>LE PROJET EN QUELQUES MOTS</Label>
        <div data-reveal>
          <h2>
            {p.title}.<br />
            <em>Une idée, du concret.</em>
          </h2>
          <p>{p.description}</p>
        </div>
      </section>
      {p.stats && (
        <section className="agency-project-stats">
          {p.stats.map((s) => (
            <div key={s.label} data-reveal>
              <span>{s.value}</span>
              <p>{s.label}</p>
            </div>
          ))}
        </section>
      )}
      <LivePreview key={p.slug} project={p} />
      {p.image && (
        <section className="agency-detail-devices agency-section">
          <Label>DU GRAND ÉCRAN AU CREUX DE LA MAIN</Label>
          <h2 data-reveal>
            Les détails comptent.
            <br />
            <em>Sur chaque écran.</em>
          </h2>
          <div
            className={`agency-device-grid ${p.mobileImage ? "with-phone" : ""}`}
          >
            <DeviceFrame
              variant="laptop-compact"
              image={p.image}
              alt={`${p.title}, vue sur ordinateur`}
            />
            {p.mobileImage && (
              <DeviceFrame
                variant="phone"
                image={p.mobileImage}
                alt={`${p.title}, vue mobile`}
              />
            )}
          </div>
        </section>
      )}
      <section className="agency-next-project">
        <Label>UNE AUTRE HISTOIRE À DÉCOUVRIR</Label>
        <Link href={`/work/${next.slug}`}>
          <span>{next.title}</span>
          <Arrow />
        </Link>
        <div>
          <p>{next.category}</p>
          <span>PROJET SUIVANT</span>
        </div>
      </section>
    </>
  );
}
