import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/honey/ui";
import { CertificationSection } from "@/components/honey/Parcours";
export const metadata: Metadata = {
  title: "Distinctions",
  description: "Distinctions et certifications de Daniel Guedegbe : prix Moov Africa, hackathon MTN, IBM, Microsoft, AXELOS.",
  alternates: { canonical: "/certifications/" },
};
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Parcours" title="Distinctions." em="Une étape du chemin.">
        <p>
          <Link href="/parcours" className="h-link is-light">
            Voir le parcours complet ↗
          </Link>
        </p>
      </PageHero>
      <CertificationSection />
    </>
  );
}
