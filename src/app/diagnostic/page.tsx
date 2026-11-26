import type { Metadata } from "next";
import Diagnostic from "@/components/agency/Diagnostic";
import { Label } from "@/components/agency/ui";
export const metadata: Metadata = {
  title: "Test gratuit de votre présence en ligne",
  description:
    "Recherchez votre entreprise ou votre nom, explorez les informations publiques disponibles et vérifiez votre présence locale. Gratuit, sans compte.",
  alternates: { canonical: "/diagnostic/" },
};
export default function Page() {
  return (
    <>
      <header className="agency-page-head">
        <Label>GRATUIT / SANS COMPTE / POUR VOTRE ACTIVITÉ</Label>
        <h1>
          Et si un client
          <br />
          <em>vous cherchait ?</em>
        </h1>
        <p className="presence-intro">
          Saisissez votre nom ou celui de votre entreprise. Retrouvez les
          informations publiques accessibles et regardez ce que vos futurs
          clients peuvent trouver.
        </p>
      </header>
      <section className="agency-section diagnostic-section">
        <Diagnostic />
      </section>
    </>
  );
}
