"use client";
import Link from "next/link";
import { Asterisk, Label } from "@/components/agency/ui";
export default function ErrorPage({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <section className="agency-error">
      <Asterisk />
      <Label>UNE PETITE PAUSE IMPRÉVUE</Label>
      <h1>
        On reprend
        <br />
        <em>le fil ?</em>
      </h1>
      <p>La page a rencontré une difficulté. Réessayons.</p>
      <button className="agency-pill" onClick={() => retry()}>
        Réessayer ↗
      </button>
      <Link className="agency-text-link" href="/">
        Retour à l’accueil ↗
      </Link>
    </section>
  );
}
