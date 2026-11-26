"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Arrow } from "./ui";
import { profile } from "@/data/content";
const CalEmbed = dynamic(() => import("@/components/CalEmbed"), {
  loading: () => <p>Le calendrier arrive…</p>,
  ssr: false,
});
export default function ContactBrief() {
  const [prepared, setPrepared] = useState(false),
    [calendar, setCalendar] = useState(true);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Bonjour Daniel,\nJe suis ${f.get("name")} (${f.get("email")}).\n\nMon projet : ${f.get("type")}\n${f.get("message")}\n\nDisponibilité : ${f.get("timing") || "À définir ensemble"}`;
    window.open(
      "https://wa.me/2250748733365?text=" + encodeURIComponent(text),
      "_blank",
      "noopener,noreferrer",
    );
    setPrepared(true);
  }
  return (
    <>
      <form className="agency-contact-form" onSubmit={submit}>
        <div>
          <label>
            Votre nom
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Comment vous appelez-vous ?"
            />
          </label>
          <label>
            Votre email
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="vous@exemple.com"
            />
          </label>
        </div>
        <label>
          Qu’est-ce qu’on imagine ensemble ?
          <select name="type">
            <option>Un site qui a du caractère</option>
            <option>Un produit web / SaaS</option>
            <option>Une application mobile</option>
            <option>Une API / architecture backend</option>
            <option>Data / tableaux de bord</option>
            <option>Administration de bases de données</option>
            <option>Un système sur mesure</option>
            <option>Présence Google / référencement local</option>
            <option>Réseaux sociaux / création de contenu</option>
            <option>Pack présence digitale complet</option>
            <option>Diagnostic gratuit de ma visibilité</option>
            <option>Une refonte complète</option>
            <option>Autre chose de passionnant</option>
          </select>
        </label>
        <label>
          Racontez-moi votre idée
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={4}
            placeholder="Le contexte, vos envies, ce qui ferait la différence…"
          />
        </label>
        <label>
          Votre horizon
          <select name="timing">
            <option>À définir ensemble</option>
            <option>Dès que possible</option>
            <option>Dans les prochains mois</option>
            <option>Je prépare le terrain</option>
          </select>
        </label>
        <button className="agency-pill" type="submit">
          Préparer mon message
          <Arrow />
        </button>
        <p className="agency-form-note">
          Votre message s’ouvre dans WhatsApp. Vous pourrez le relire avant de
          l’envoyer.
        </p>
        {prepared && (
          <p role="status" className="agency-form-status">
            Votre message est prêt dans WhatsApp. L’envoi reste à confirmer dans
            l’application.
          </p>
        )}
      </form>
      <div className="agency-booking" id="rendezvous">
        <span>PLUTÔT UN ÉCHANGE DE VIVE VOIX ?</span>
        <button onClick={() => setCalendar(!calendar)} aria-expanded={calendar}>
          {calendar
            ? "Fermer le calendrier"
            : "Choisir un créneau de 30 minutes"}
          <Arrow />
        </button>
        {calendar && (
          <>
            <div className="agency-calendar">
              <CalEmbed />
            </div>
            <a
              className="agency-calendar-external"
              href={profile.calUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouvrir l’agenda dans un onglet <Arrow />
            </a>
          </>
        )}
      </div>
    </>
  );
}
