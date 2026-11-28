import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/honey/ui";
import { ExperienceSection } from "@/components/honey/Parcours";
export const metadata: Metadata = {
  title: "Expérience",
  description: "Expérience professionnelle de Daniel Guedegbe : six ans d’ingénierie logicielle, du mobile au Tech Lead.",
  alternates: { canonical: "/experience/" },
};
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Parcours" title="Expérience." em="Une étape du chemin.">
        <p>
          <Link href="/parcours" className="h-link is-light">
            Voir le parcours complet ↗
          </Link>
        </p>
      </PageHero>
      <ExperienceSection />
    </>
  );
}
