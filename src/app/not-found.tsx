import { Btn, Eyebrow, Mark } from "@/components/honey/ui";
export default function NotFound() {
  return (
    <section className="h-error">
      <Mark className="h-error-mark" />
      <span className="h-error-code">404</span>
      <Eyebrow light>Un petit détour</Eyebrow>
      <h1>
        Cette page a pris <em>un autre chemin.</em>
      </h1>
      <Btn href="/work" variant="gold">
        Retrouver les projets
      </Btn>
    </section>
  );
}
