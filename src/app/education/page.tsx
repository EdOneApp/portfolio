import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/honey/ui";
import { EducationSection } from "@/components/honey/Parcours";
export const metadata: Metadata = {
  title: "Formation",
  description: "Formation de Daniel Guedegbe : masters en génie logiciel et big data, licence en bases de données.",
  alternates: { canonical: "/education/" },
};
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Parcours" title="Formation." em="Une étape du chemin.">
        <p>
          <Link href="/parcours" className="h-link is-light">
            Voir le parcours complet ↗
          </Link>
        </p>
      </PageHero>
      <EducationSection />
    </>
  );
}
