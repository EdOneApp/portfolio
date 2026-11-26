"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Arrow } from "./ui";
type Finding = { title: string; text: string; url: string };
type Report = {
  name: string;
  city: string;
  findings: Finding[];
  error: boolean;
  date: string;
};
function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
  } catch {
    return null;
  }
}
export default function Diagnostic() {
  const [report, setReport] = useState<Report | null>(null),
    [loading, setLoading] = useState(false),
    [message, setMessage] = useState("");
  const [checks, setChecks] = useState<Record<string, string>>({});
  const serial = useRef(0);
  async function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget),
      name = String(form.get("name") || "").trim(),
      city = String(form.get("city") || "").trim();
    if (name.length < 2) {
      setMessage("Indiquez au moins deux caractères.");
      return;
    }
    const request = ++serial.current;
    setLoading(true);
    setReport(null);
    setChecks({});
    setMessage("");
    let error = false;
    const findings: Finding[] = [];
    try {
      const response = await fetch(
        "https://api.duckduckgo.com/?" +
          new URLSearchParams({
            q: name,
            format: "json",
            no_html: "1",
            skip_disambig: "1",
          }),
        {
          signal: AbortSignal.timeout(12000),
          credentials: "omit",
          referrerPolicy: "no-referrer",
        },
      );
      if (!response.ok) throw Error();
      const data = await response.json();
      const url = safeUrl(data.AbstractURL);
      if (
        url &&
        typeof data.AbstractText === "string" &&
        data.AbstractText.trim()
      )
        findings.push({
          title: String(data.Heading || name),
          text: data.AbstractText.split(/\s+/).slice(0, 100).join(" ") + "…",
          url,
        });
      const topics = Array.isArray(data.RelatedTopics)
        ? data.RelatedTopics.flatMap(
            (item: { Topics?: unknown[] }) => item.Topics || [item],
          )
        : [];
      for (const item of topics) {
        if (findings.length >= 6) break;
        if (!item || typeof item !== "object") continue;
        const t = item as { FirstURL?: unknown; Text?: unknown };
        const link = safeUrl(t.FirstURL);
        if (
          link &&
          !new URL(link).pathname.startsWith("/c/") &&
          typeof t.Text === "string" &&
          !findings.some((x) => x.url === link)
        )
          findings.push({
            title: t.Text.split(" - ")[0].slice(0, 100),
            text: t.Text.slice(0, 320),
            url: link,
          });
      }
    } catch {
      error = true;
    }
    if (request !== serial.current) return;
    setReport({
      name,
      city,
      findings,
      error,
      date: new Date().toLocaleString("fr-FR"),
    });
    setLoading(false);
  }
  const query = report
    ? [report.name, report.city].filter(Boolean).join(" ")
    : "";
  const answers = Object.values(checks),
    missing = answers.filter((x) => x === "non").length;
  return (
    <>
      <form className="diagnostic-form" onSubmit={search}>
        <label>
          Votre nom ou votre entreprise
          <input
            name="name"
            required
            minLength={2}
            maxLength={120}
            placeholder="Ex. Maison Akwaba"
            autoComplete="organization"
          />
        </label>
        <label>
          Ville ou quartier <span>(facultatif)</span>
          <input
            name="city"
            maxLength={100}
            placeholder="Ex. Cocody, Abidjan"
            autoComplete="address-level2"
          />
        </label>
        <button type="submit" className="agency-pill" disabled={loading}>
          {loading ? "Recherche en cours…" : "Explorer ma présence"}
          <Arrow />
        </button>
        <p>
          En lançant la recherche, le nom saisi est envoyé à DuckDuckGo et la
          recherche locale à Google Maps. Aucun compte à connecter. Nous
          n’enregistrons pas votre recherche.
        </p>
      </form>
      <p className="diagnostic-scope">
        Ce test gratuit explore une source publique et Google Maps. Il ne couvre
        pas tout le Web et ne mesure pas votre rang sur Google ou TikTok. Ces
        plateformes ne permettent pas cet audit automatique complet depuis ce
        site.
      </p>
      <div role="status" aria-live="polite">
        {loading && (
          <p className="diagnostic-loading">
            Consultation des informations publiques…
          </p>
        )}
        {message && <p>{message}</p>}
      </div>
      {report && (
        <div className="diagnostic-report">
          <header>
            <span className="offer-index">
              VOTRE EXPLORATION / {report.date}
            </span>
            <h2>{report.name}</h2>
            <p>
              {report.city || "Toutes localisations"} · Vérifiez les homonymes
              avant de retenir une information.
            </p>
          </header>
          <div className="diagnostic-results">
            <section>
              <h3>Informations publiques</h3>
              <p className="presence-note">
                Correspondances possibles via DuckDuckGo Instant Answers. Cette
                source résume surtout des références encyclopédiques ; elle
                n’est pas un moteur de recherche exhaustif.
              </p>
              {report.error ? (
                <p className="diagnostic-empty">
                  La source publique n’a pas répondu. Votre visibilité reste à
                  vérifier : utilisez la carte et les recherches ci-dessous.
                </p>
              ) : report.findings.length ? (
                report.findings.map((f) => (
                  <article key={f.url}>
                    <h4>{f.title}</h4>
                    <p>{f.text}</p>
                    <a href={f.url} target="_blank" rel="noopener noreferrer">
                      Consulter la source <Arrow />
                    </a>
                  </article>
                ))
              ) : (
                <p className="diagnostic-empty">
                  Aucune correspondance dans cette source. Cela ne signifie pas
                  que vous êtes absent de Google ou mal référencé.
                </p>
              )}
            </section>
            <section>
              <h3>Votre présence locale</h3>
              <iframe
                key={query}
                src={
                  "https://maps.google.com/maps?" +
                  new URLSearchParams({ q: query, output: "embed" })
                }
                title={"Recherche Google Maps : " + query}
                loading="lazy"
                referrerPolicy="no-referrer"
                allowFullScreen
              />
              <a
                href={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  encodeURIComponent(query)
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Ouvrir les résultats dans Google Maps <Arrow />
              </a>
              <p className="presence-note">
                Résultats fournis par Google Maps. La carte peut proposer un
                homonyme ou des lieux proches : confirmez le nom et l’adresse.
              </p>
            </section>
          </div>
          <section className="diagnostic-manual">
            <h3>Complétez la vérification</h3>
            <p>
              Les résultats personnalisés de Google et TikTok s’ouvrent
              directement sur leurs plateformes. Regardez si votre activité
              apparaît, puis renseignez vos observations ci-dessous.
            </p>
            <div className="presence-links">
              {[
                [
                  "Google",
                  "https://www.google.com/search?q=" +
                    encodeURIComponent(query),
                ],
                [
                  "TikTok",
                  "https://www.tiktok.com/search?q=" +
                    encodeURIComponent(query),
                ],
                [
                  "Facebook",
                  "https://www.google.com/search?q=" +
                    encodeURIComponent("site:facebook.com " + query),
                ],
                [
                  "Instagram",
                  "https://www.google.com/search?q=" +
                    encodeURIComponent("site:instagram.com " + query),
                ],
              ].map(([t, u]) => (
                <a
                  key={t}
                  href={u}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agency-pill"
                >
                  Vérifier sur {t}
                  <Arrow />
                </a>
              ))}
            </div>
            {[
              "Je trouve la bonne fiche Google avec mon adresse et mes horaires.",
              "Mon site apparaît quand je recherche mon activité.",
              "Je trouve mes pages sociales et des publications récentes.",
            ].map((text, i) => (
              <label className="diagnostic-check" key={text}>
                {text}
                <select
                  value={checks[i] || ""}
                  onChange={(e) =>
                    setChecks({ ...checks, [i]: e.target.value })
                  }
                >
                  <option value="">À vérifier</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </label>
            ))}
            <div className="diagnostic-conclusion" aria-live="polite">
              <strong>
                {answers.filter(Boolean).length < 3
                  ? "Votre bilan se construit avec vos observations."
                  : missing
                    ? `${missing} point${missing > 1 ? "s" : ""} à améliorer dans vos observations.`
                    : "Vos trois points de présence sont confirmés par vos soins."}
              </strong>
              <p>
                {missing
                  ? "Commencez par les informations manquantes, puis la cohérence entre votre site, votre fiche et vos réseaux."
                  : "Vérifiez régulièrement vos horaires, vos coordonnées et la fraîcheur de vos contenus."}{" "}
                Ce bilan déclaratif n’est pas un score de référencement.
              </p>
              <Link href="/contact" className="agency-text-link">
                Demander un diagnostic gratuit avec Daniel <Arrow />
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
