"use client";
import Link from "next/link";
import { Eyebrow, Mark } from "@/components/honey/ui";
export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  return (
    <section className="h-error">
      <Mark className="h-error-mark" />
      <Eyebrow light>Une pause imprévue</Eyebrow>
      <h1>
        On reprend <em>le fil&nbsp;?</em>
      </h1>
      <div className="h-hero-actions">
        <button className="h-btn is-gold" onClick={() => retry()}>
          <span className="h-btn-label">Réessayer</span>
        </button>
        <Link className="h-link is-light" href="/">
          Retour à l’accueil ↗
        </Link>
      </div>
    </section>
  );
}
