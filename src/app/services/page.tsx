import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Btn, PageHero, SectionHead } from "@/components/honey/ui";
import { services } from "@/components/honey/services-data";
import { clientKinds } from "@/components/honey/quote-config";
export const metadata: Metadata = {
  title: "Services",
  description:
    "Sites web, applications mobiles, plateformes, présence en ligne, gestion d’image, gestion de pages, analyse de données et systèmes sur mesure à Abidjan.",
  alternates: { canonical: "/services/" },
};
export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Du beau," em="et tout ce qui le fait vivre." index="08">
        <p>
          Huit expertises, un seul interlocuteur. Pour un projet personnel, une entreprise ou une
          institution.
        </p>
      </PageHero>
      <section className="h-section h-services-list">
        {services.map((s) => (
          <article key={s.n} className="h-service-row" data-reveal>
            <span className="h-service-n">{s.n}</span>
            <div>
              <h2>
                {s.title} <em>{s.em}</em>
              </h2>
              <p>{s.text}</p>
              <ul>
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <Link href={`/devis?type=${s.type}`} className="h-service-row-go" aria-label={`Demander un devis : ${s.title}`}>
              Devis <Arrow />
            </Link>
          </article>
        ))}
      </section>
      <section className="h-section h-clients">
        <SectionHead light eyebrow="Pour qui" title="Particuliers," em="entreprises, institutions." />
        <div className="h-client-grid">
          {clientKinds.map((c) => (
            <div key={c.id} data-reveal data-tilt="8">
              <h3>{c.label}</h3>
              <p>{c.hint}</p>
            </div>
          ))}
        </div>
        <div className="h-hero-actions">
          <Btn href="/devis" variant="gold">Demander un devis</Btn>
          <Btn href="/presence-digitale" variant="light">Les packs visibilité</Btn>
        </div>
      </section>
    </>
  );
}
