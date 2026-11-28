import type { Metadata } from "next";
import { PageHero } from "@/components/honey/ui";
import QuoteWizard from "@/components/honey/QuoteWizard";
export const metadata: Metadata = {
  title: "Demander un devis",
  description:
    "Décrivez votre projet (site web, application mobile, présence en ligne, image, réseaux sociaux, data, système sur mesure) et recevez un devis. Envoi direct sur WhatsApp.",
  alternates: { canonical: "/devis/" },
};
export default function DevisPage() {
  return (
    <>
      <PageHero eyebrow="Devis" title="Parlons chiffres," em="simplement.">
        <p>
          Six étapes courtes pour décrire votre besoin, que vous soyez particulier, entreprise ou
          institution. À la fin, vous relisez, vous validez, et la demande part sur mon WhatsApp.
        </p>
      </PageHero>
      <section className="h-section h-devis">
        <QuoteWizard />
      </section>
    </>
  );
}
