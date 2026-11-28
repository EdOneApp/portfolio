import type { Metadata } from "next";
import Diagnostic from "@/components/honey/Diagnostic";
import { PageHero } from "@/components/honey/ui";
export const metadata: Metadata = {
  title: "Test gratuit de votre présence en ligne",
  description:
    "Recherchez votre entreprise ou votre nom, explorez les informations publiques disponibles et vérifiez votre présence locale. Gratuit, sans compte.",
  alternates: { canonical: "/diagnostic/" },
};
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Gratuit · sans compte" title="Et si un client" em="vous cherchait ?">
        <p>
          Saisissez votre nom ou celui de votre entreprise. Retrouvez les informations publiques
          accessibles et regardez ce que vos futurs clients peuvent trouver.
        </p>
      </PageHero>
      <section className="h-section diagnostic-section">
        <Diagnostic />
      </section>
    </>
  );
}
