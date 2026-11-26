import { Label, Pill, Asterisk } from "@/components/agency/ui";
export default function NotFound() {
  return (
    <section className="agency-error">
      <Asterisk />
      <span>404</span>
      <Label>UN PETIT DÉTOUR CRÉATIF.</Label>
      <h1>
        Cette page a pris
        <br />
        <em>un autre chemin.</em>
      </h1>
      <p>Les belles idées, elles, sont toujours là.</p>
      <Pill href="/work">Retrouver les projets</Pill>
    </section>
  );
}
