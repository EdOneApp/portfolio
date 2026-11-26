import { Label } from "./agency/ui";
export default function PageHeader({ title }: { title: string[] }) {
  return (
    <header className="agency-page-head">
      <Label>LE PARCOURS DERRIÈRE LES PROJETS</Label>
      <h1>
        {title.map((line, i) => (
          <span key={line}>
            {i === title.length - 1 && i > 0 ? <em>{line}</em> : line}
            {i < title.length - 1 && <br />}
          </span>
        ))}
      </h1>
    </header>
  );
}
