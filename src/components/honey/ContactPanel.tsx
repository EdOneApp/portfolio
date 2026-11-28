"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { profile } from "@/data/content";
import { Arrow } from "./ui";

const CalEmbed = dynamic(() => import("@/components/CalEmbed"), {
  loading: () => <p className="h-cal-loading">Le calendrier arrive…</p>,
  ssr: false,
});

export default function ContactPanel() {
  const [prepared, setPrepared] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Bonjour Daniel,\nJe suis ${f.get("name")} (${f.get("email")}).\n\n${f.get("message")}`;
    window.open(`${profile.whatsappHref}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setPrepared(true);
  }
  return (
    <div className="h-contact-grid">
      <form className="h-contact-form" onSubmit={submit} data-reveal>
        <h2>
          Un message <em>rapide.</em>
        </h2>
        <p>
          Pour une demande détaillée, utilisez plutôt <Link href="/devis">l’espace devis</Link>.
        </p>
        <label className="q-field">
          <span>Votre nom</span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </label>
        <label className="q-field">
          <span>Votre email</span>
          <input type="email" name="email" autoComplete="email" required maxLength={254} />
        </label>
        <label className="q-field">
          <span>Votre message</span>
          <textarea name="message" required minLength={10} maxLength={2000} rows={4} />
        </label>
        <button className="h-btn is-solid" type="submit">
          <span className="h-btn-label">Envoyer sur WhatsApp</span>
          <span className="h-btn-icon">
            <Arrow />
          </span>
        </button>
        {prepared && (
          <p role="status" className="q-note">
            Votre message est prêt dans WhatsApp : il reste à appuyer sur « Envoyer ».
          </p>
        )}
      </form>
      <div className="h-booking" id="rendezvous" data-reveal>
        <h2>
          Ou 30 minutes <em>de vive voix.</em>
        </h2>
        <p>Choisissez un créneau : on échange sur votre idée et la prochaine étape.</p>
        <div className="h-calendar">
          <CalEmbed />
        </div>
        <a className="h-link" href={profile.calUrl} target="_blank" rel="noopener noreferrer">
          Ouvrir l’agenda dans un onglet <Arrow />
        </a>
      </div>
    </div>
  );
}
