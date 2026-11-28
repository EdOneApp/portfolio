import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, profile } from "@/data/content";
import { Arrow, Btn, Eyebrow } from "@/components/honey/ui";
import LivePreview from "@/components/honey/LivePreview";
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
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  return (
    <>
      <header className="h-project-hero">
        <div className="h-page-hero-glow" aria-hidden="true" />
        <Link href="/work" className="h-back">
          ← Toutes les réalisations
        </Link>
        <div className="h-project-title">
          <span className="h-project-count">
            {String(index + 1).padStart(2, "0")} / {projects.length}
          </span>
          <h1 className="h-split">
            <span>
              <span>{p.title}</span>
            </span>
          </h1>
          <p>{p.category}</p>
        </div>
        <dl className="h-project-facts">
          <div>
            <dt>Outils</dt>
            <dd>{p.tags.join(" · ")}</dd>
          </div>
          {p.award && (
            <div>
              <dt>Distinction</dt>
              <dd>{p.award}</dd>
            </div>
          )}
          {p.link && (
            <div>
              <dt>En ligne</dt>
              <dd>
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  {p.linkLabel || new URL(p.link).hostname} <Arrow />
                </a>
              </dd>
            </div>
          )}
        </dl>
        {p.image && (
          <div className="h-project-cover" data-tilt="4">
            <Image
              src={p.image}
              alt={`${p.title}, vue d’ensemble`}
              width={1800}
              height={1100}
              priority
              sizes="(max-width:767px) 94vw, 86vw"
            />
          </div>
        )}
      </header>

      <section className="h-section h-project-story">
        <Eyebrow>Le projet</Eyebrow>
        <div data-reveal>
          <h2>
            {p.title}, <em>en quelques mots.</em>
          </h2>
          <p>{p.description}</p>
        </div>
        {p.stats && (
          <div className="h-stats is-light">
            {p.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <LivePreview key={p.slug} project={p} />

      {p.image && (
        <section className="h-section h-devices">
          <Eyebrow>Du grand écran au creux de la main</Eyebrow>
          <h2 data-reveal>
            Chaque écran, <em>chaque détail.</em>
          </h2>
          <div className={`h-device-grid ${p.mobileImage ? "with-phone" : ""}`}>
            <div className="h-device-3d is-laptop" data-tilt="6">
              <DeviceFrame variant="laptop-compact" image={p.image} alt={`${p.title}, vue sur ordinateur`} />
            </div>
            {p.mobileImage && (
              <div className="h-device-3d is-phone" data-tilt="10">
                <DeviceFrame variant="phone" image={p.mobileImage} alt={`${p.title}, vue mobile`} />
              </div>
            )}
          </div>
        </section>
      )}

      <section className="h-section h-project-cta">
        <h2>
          Un projet dans cet esprit <em>pour vous&nbsp;?</em>
        </h2>
        <Btn href="/devis" variant="gold">
          Demander un devis
        </Btn>
      </section>

      <nav className="h-project-nav" aria-label="Autres projets">
        <Link href={`/work/${prev.slug}`}>
          <small>← Précédent</small>
          <span>{prev.title}</span>
        </Link>
        <Link href={`/work/${next.slug}`} className="is-next">
          <small>Suivant →</small>
          <span>{next.title}</span>
        </Link>
      </nav>
    </>
  );
}
