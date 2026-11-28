"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/content";
import {
  assets,
  budgets,
  channels,
  clientKinds,
  projectTypes,
  timelines,
  type Option,
} from "./quote-config";
import { Arrow } from "./ui";

type Data = {
  types: string[];
  answers: Record<string, string | string[]>;
  client: string;
  budget: string;
  timeline: string;
  assets: string[];
  description: string;
  inspirations: string;
  name: string;
  organisation: string;
  role: string;
  email: string;
  phone: string;
  city: string;
  channel: string;
  consent: boolean;
};

const empty: Data = {
  types: [],
  answers: {},
  client: "",
  budget: "",
  timeline: "",
  assets: [],
  description: "",
  inspirations: "",
  name: "",
  organisation: "",
  role: "",
  email: "",
  phone: "",
  city: "Abidjan",
  channel: "whatsapp",
  consent: false,
};

const steps = [
  { id: "type", title: "Votre projet", hint: "Plusieurs choix possibles" },
  { id: "client", title: "Pour qui ?", hint: "Personnel ou institutionnel" },
  { id: "details", title: "Les détails", hint: "Pour un devis précis" },
  { id: "frame", title: "Cadre & budget", hint: "Délais, budget, contenus" },
  { id: "contact", title: "Vos coordonnées", hint: "Pour vous répondre" },
  { id: "recap", title: "Validation", hint: "Relire et envoyer" },
] as const;

const KEY = "honey-quote-draft";
const label = (list: Option[], id: string) => list.find((o) => o.id === id)?.label ?? id;

function makeRef() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `DG-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

export default function QuoteWizard() {
  const [data, setData] = useState<Data>(empty);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [restored, setRestored] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const hydrated = useRef(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      let base = empty;
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          base = { ...empty, ...JSON.parse(raw) };
          setRestored(true);
        }
      } catch {}
      const pre = new URLSearchParams(location.search).get("type");
      if (pre && projectTypes.some((t) => t.id === pre) && !base.types.includes(pre))
        base = { ...base, types: [...base.types, pre] };
      hydrated.current = true;
      setData(base);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setData((d) => ({ ...d, [k]: v }));
  const toggleIn = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  const answer = (key: string, id: string, multi: boolean) =>
    setData((d) => {
      const cur = d.answers[key];
      const next = multi ? toggleIn(Array.isArray(cur) ? cur : [], id) : id;
      return { ...d, answers: { ...d.answers, [key]: next } };
    });

  const selectedTypes = useMemo(
    () => projectTypes.filter((t) => data.types.includes(t.id)),
    [data.types],
  );

  function validate(i: number): string[] {
    const e: string[] = [];
    if (i === 0 && data.types.length === 0) e.push("Choisissez au moins un type de projet.");
    if (i === 1 && !data.client) e.push("Indiquez pour qui est ce projet.");
    if (i === 2 && data.description.trim().length < 20)
      e.push("Décrivez votre projet en quelques phrases (20 caractères minimum).");
    if (i === 3) {
      if (!data.budget) e.push("Choisissez une fourchette de budget, même indicative.");
      if (!data.timeline) e.push("Choisissez un délai souhaité.");
    }
    if (i === 4) {
      if (data.name.trim().length < 2) e.push("Votre nom est requis.");
      if (data.client !== "personnel" && data.organisation.trim().length < 2)
        e.push("Le nom de votre structure est requis.");
      if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) e.push("Adresse email invalide.");
      if (data.phone.replace(/\D/g, "").length < 8) e.push("Numéro de téléphone / WhatsApp invalide.");
      if (!data.consent) e.push("Merci d’accepter d’être recontacté au sujet de ce devis.");
    }
    return e;
  }

  function go(to: number) {
    if (to > step) {
      for (let i = step; i < to; i++) {
        const e = validate(i);
        if (e.length) {
          setErrors(e);
          setStep(i);
          return;
        }
      }
    }
    setErrors([]);
    if (to === steps.length - 1) setRef(makeRef());
    setDir(to > step ? 1 : -1);
    setStep(to);
    top.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  function buildMessage(ref: string) {
    const lines: string[] = [];
    lines.push(`*Demande de devis ${ref}*`);
    lines.push("");
    lines.push(`*Client :* ${data.name}${data.role ? `, ${data.role}` : ""}`);
    if (data.organisation) lines.push(`*Structure :* ${data.organisation}`);
    lines.push(`*Profil :* ${label(clientKinds, data.client)}`);
    lines.push(`*Email :* ${data.email}`);
    lines.push(`*Téléphone :* ${data.phone}`);
    lines.push(`*Ville :* ${data.city || "—"}`);
    lines.push(`*Contact préféré :* ${label(channels, data.channel)}`);
    lines.push("");
    lines.push(`*Type(s) de projet :* ${selectedTypes.map((t) => t.label).join(", ")}`);
    selectedTypes.forEach((t) => {
      const parts = t.questions
        .map((q) => {
          const v = data.answers[`${t.id}.${q.id}`];
          const vals = (Array.isArray(v) ? v : v ? [v] : []).map((id) => label(q.options, id));
          return vals.length ? `  • ${q.label} ${vals.join(", ")}` : null;
        })
        .filter(Boolean);
      if (parts.length) {
        lines.push(`— ${t.label}`);
        lines.push(...(parts as string[]));
      }
    });
    lines.push("");
    lines.push(`*Budget :* ${label(budgets, data.budget)}`);
    lines.push(`*Délai :* ${label(timelines, data.timeline)}`);
    lines.push(
      `*Déjà disponible :* ${data.assets.length ? data.assets.map((a) => label(assets, a)).join(", ") : "rien pour l’instant"}`,
    );
    lines.push("");
    lines.push(`*Description :*`);
    lines.push(data.description.trim());
    if (data.inspirations.trim()) {
      lines.push("");
      lines.push(`*Références / inspirations :*`);
      lines.push(data.inspirations.trim());
    }
    lines.push("");
    lines.push("Envoyé depuis guedegbe.com/devis");
    return lines.join("\n");
  }

  const [ref, setRef] = useState("");
  const message = step === 5 ? buildMessage(ref) : "";

  function send() {
    const e = [0, 1, 2, 3, 4].flatMap(validate);
    if (e.length) {
      setErrors(e);
      return;
    }
    const url = `${profile.whatsappHref}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(ref);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  }

  function reset() {
    setData(empty);
    setSent(null);
    setStep(0);
    setRestored(false);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }

  const progress = ((step + (sent ? 1 : 0)) / (steps.length - 1)) * 100;

  return (
    <div className="q-wrap" ref={top}>
      <aside className="q-side">
        <ol className="q-steps">
          {steps.map((s, i) => (
            <li key={s.id} className={i === step ? "is-current" : i < step ? "is-done" : ""}>
              <button type="button" onClick={() => go(i)} disabled={i > step + 1}>
                <span>{i < step ? "✓" : String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{s.title}</strong>
                  <small>{s.hint}</small>
                </div>
              </button>
            </li>
          ))}
        </ol>
        <div className="q-progress" aria-hidden="true">
          <i style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
        <div className="q-summary">
          <p className="q-summary-title">Votre demande</p>
          {data.types.length ? (
            <ul>
              {selectedTypes.map((t) => (
                <li key={t.id}>
                  <span aria-hidden="true">{t.glyph}</span>
                  {t.short}
                </li>
              ))}
            </ul>
          ) : (
            <p className="q-muted">Aucun projet choisi pour l’instant.</p>
          )}
          {data.client && <p>Pour : {label(clientKinds, data.client)}</p>}
          {data.budget && <p>Budget : {label(budgets, data.budget)}</p>}
          {data.timeline && <p>Délai : {label(timelines, data.timeline)}</p>}
        </div>
        {restored && !sent && (
          <p className="q-restored">
            Brouillon retrouvé sur cet appareil.{" "}
            <button type="button" onClick={reset}>
              Recommencer
            </button>
          </p>
        )}
      </aside>

      <div className="q-main">
        {errors.length > 0 && (
          <div className="q-errors" role="alert">
            {errors.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        )}
        <div className="q-stage">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={sent ? "sent" : step}
              custom={dir}
              initial={reduced ? false : { opacity: 0, rotateY: dir * 18, x: dir * 60 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, rotateY: dir * -18, x: dir * -60 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="q-panel"
            >
              {sent ? (
                <div className="q-sent">
                  <span className="q-sent-badge">✓</span>
                  <h3>
                    Votre demande est prête <em>dans WhatsApp.</em>
                  </h3>
                  <p>
                    Référence <strong>{sent}</strong>. Si WhatsApp ne s’est pas ouvert, utilisez
                    les boutons ci-dessous. Pensez à appuyer sur « Envoyer » dans l’application.
                  </p>
                  <div className="q-actions">
                    <a
                      className="h-btn is-solid"
                      href={`${profile.whatsappHref}?text=${encodeURIComponent(message || buildMessage(sent))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="h-btn-label">Rouvrir WhatsApp</span>
                      <span className="h-btn-icon">
                        <Arrow />
                      </span>
                    </a>
                    <a
                      className="h-btn is-ghost"
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(`Demande de devis ${sent}`)}&body=${encodeURIComponent(message || buildMessage(sent))}`}
                    >
                      <span className="h-btn-label">Envoyer par email</span>
                      <span className="h-btn-icon">
                        <Arrow />
                      </span>
                    </a>
                    <button type="button" className="q-link" onClick={reset}>
                      Faire une nouvelle demande
                    </button>
                  </div>
                </div>
              ) : step === 0 ? (
                <>
                  <h3 className="q-title">
                    Qu’est-ce qu’on <em>construit ensemble&nbsp;?</em>
                  </h3>
                  <div className="q-types" role="group" aria-label="Types de projet">
                    {projectTypes.map((t) => {
                      const on = data.types.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          className={`q-type ${on ? "is-on" : ""}`}
                          onClick={() => set("types", toggleIn(data.types, t.id))}
                          data-tilt="10"
                        >
                          <span className="q-type-glyph" aria-hidden="true">
                            {t.glyph}
                          </span>
                          <strong>{t.label}</strong>
                          <small>{t.description}</small>
                          <span className="q-type-check" aria-hidden="true">
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : step === 1 ? (
                <>
                  <h3 className="q-title">
                    Ce projet est <em>pour…</em>
                  </h3>
                  <div className="q-grid-2" role="radiogroup" aria-label="Profil">
                    {clientKinds.map((c) => (
                      <Chip
                        key={c.id}
                        active={data.client === c.id}
                        onClick={() => set("client", c.id)}
                        hint={c.hint}
                      >
                        {c.label}
                      </Chip>
                    ))}
                  </div>
                </>
              ) : step === 2 ? (
                <>
                  <h3 className="q-title">
                    Entrons dans <em>les détails.</em>
                  </h3>
                  {selectedTypes.map((t) =>
                    t.questions.length ? (
                      <fieldset key={t.id} className="q-block">
                        <legend>
                          <span aria-hidden="true">{t.glyph}</span> {t.label}
                        </legend>
                        {t.questions.map((q) => {
                          const key = `${t.id}.${q.id}`;
                          const v = data.answers[key];
                          return (
                            <div key={key} className="q-question">
                              <p>
                                {q.label}
                                {q.kind === "multi" && <small> plusieurs choix</small>}
                              </p>
                              <div className="q-chips" role={q.kind === "multi" ? "group" : "radiogroup"} aria-label={q.label}>
                                {q.options.map((o) => (
                                  <Chip
                                    key={o.id}
                                    multi={q.kind === "multi"}
                                    active={Array.isArray(v) ? v.includes(o.id) : v === o.id}
                                    onClick={() => answer(key, o.id, q.kind === "multi")}
                                  >
                                    {o.label}
                                  </Chip>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </fieldset>
                    ) : null,
                  )}
                  <label className="q-field">
                    <span>Décrivez votre projet *</span>
                    <textarea
                      rows={5}
                      maxLength={2500}
                      value={data.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Votre activité, vos objectifs, vos utilisateurs, ce qui ferait la différence…"
                    />
                    <small>{data.description.length} / 2500</small>
                  </label>
                  <label className="q-field">
                    <span>Références ou inspirations (facultatif)</span>
                    <textarea
                      rows={2}
                      maxLength={800}
                      value={data.inspirations}
                      onChange={(e) => set("inspirations", e.target.value)}
                      placeholder="Liens de sites, d’applications ou de pages que vous aimez"
                    />
                  </label>
                </>
              ) : step === 3 ? (
                <>
                  <h3 className="q-title">
                    Le cadre <em>du projet.</em>
                  </h3>
                  <div className="q-question">
                    <p>Budget envisagé *</p>
                    <div className="q-chips" role="radiogroup" aria-label="Budget">
                      {budgets.map((b) => (
                        <Chip key={b.id} active={data.budget === b.id} onClick={() => set("budget", b.id)}>
                          {b.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div className="q-question">
                    <p>Délai souhaité *</p>
                    <div className="q-chips" role="radiogroup" aria-label="Délai">
                      {timelines.map((b) => (
                        <Chip
                          key={b.id}
                          active={data.timeline === b.id}
                          onClick={() => set("timeline", b.id)}
                          hint={b.hint}
                        >
                          {b.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div className="q-question">
                    <p>
                      Ce que vous avez déjà <small> plusieurs choix</small>
                    </p>
                    <div className="q-chips" role="group" aria-label="Éléments existants">
                      {assets.map((b) => (
                        <Chip
                          key={b.id}
                          multi
                          active={data.assets.includes(b.id)}
                          onClick={() => set("assets", toggleIn(data.assets, b.id))}
                        >
                          {b.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <p className="q-note">
                    Le budget sert à proposer la solution la plus juste. Le devis final est établi
                    après un premier échange.
                  </p>
                </>
              ) : step === 4 ? (
                <>
                  <h3 className="q-title">
                    Comment vous <em>répondre&nbsp;?</em>
                  </h3>
                  <div className="q-fields">
                    <label className="q-field">
                      <span>Nom complet *</span>
                      <input autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} maxLength={100} />
                    </label>
                    <label className="q-field">
                      <span>
                        {data.client === "personnel" ? "Activité / marque (facultatif)" : "Structure *"}
                      </span>
                      <input
                        autoComplete="organization"
                        value={data.organisation}
                        onChange={(e) => set("organisation", e.target.value)}
                        maxLength={120}
                      />
                    </label>
                    <label className="q-field">
                      <span>Fonction (facultatif)</span>
                      <input
                        autoComplete="organization-title"
                        value={data.role}
                        onChange={(e) => set("role", e.target.value)}
                        maxLength={80}
                      />
                    </label>
                    <label className="q-field">
                      <span>Ville / pays</span>
                      <input value={data.city} onChange={(e) => set("city", e.target.value)} maxLength={80} />
                    </label>
                    <label className="q-field">
                      <span>Email *</span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        maxLength={254}
                      />
                    </label>
                    <label className="q-field">
                      <span>Téléphone / WhatsApp *</span>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+225 …"
                        maxLength={30}
                      />
                    </label>
                  </div>
                  <div className="q-question">
                    <p>Moyen de contact préféré</p>
                    <div className="q-chips" role="radiogroup" aria-label="Moyen de contact">
                      {channels.map((c) => (
                        <Chip key={c.id} active={data.channel === c.id} onClick={() => set("channel", c.id)}>
                          {c.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <label className="q-consent">
                    <input
                      type="checkbox"
                      checked={data.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                    />
                    <span>
                      J’accepte d’être recontacté(e) par Daniel Guedegbe au sujet de cette demande.
                      Mes informations ne sont ni stockées sur un serveur ni partagées : elles
                      partent uniquement dans le message WhatsApp que j’envoie.
                    </span>
                  </label>
                </>
              ) : (
                <>
                  <h3 className="q-title">
                    Tout est bon&nbsp;? <em>On valide.</em>
                  </h3>
                  <div className="q-recap">
                    <div className="q-recap-head">
                      <span>Référence</span>
                      <strong>{ref}</strong>
                    </div>
                    <RecapRow label="Projet" onEdit={() => go(0)}>
                      {selectedTypes.map((t) => t.label).join(", ")}
                    </RecapRow>
                    <RecapRow label="Profil" onEdit={() => go(1)}>
                      {label(clientKinds, data.client)}
                    </RecapRow>
                    <RecapRow label="Détails" onEdit={() => go(2)}>
                      {selectedTypes.map((t) => {
                        const items = t.questions.flatMap((q) => {
                          const v = data.answers[`${t.id}.${q.id}`];
                          return (Array.isArray(v) ? v : v ? [v] : []).map((id) => label(q.options, id));
                        });
                        return items.length ? (
                          <span key={t.id} className="q-recap-tags">
                            {items.map((x) => (
                              <i key={x}>{x}</i>
                            ))}
                          </span>
                        ) : null;
                      })}
                      <span className="q-recap-text">{data.description}</span>
                    </RecapRow>
                    <RecapRow label="Cadre" onEdit={() => go(3)}>
                      {label(budgets, data.budget)} · {label(timelines, data.timeline)}
                      {data.assets.length > 0 && (
                        <> · Disponible : {data.assets.map((a) => label(assets, a)).join(", ")}</>
                      )}
                    </RecapRow>
                    <RecapRow label="Contact" onEdit={() => go(4)}>
                      {data.name}
                      {data.organisation && ` · ${data.organisation}`} · {data.email} · {data.phone} ·{" "}
                      préfère {label(channels, data.channel).toLowerCase()}
                    </RecapRow>
                  </div>
                  <details className="q-preview">
                    <summary>Voir le message WhatsApp</summary>
                    <pre>{message}</pre>
                  </details>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {!sent && (
          <div className="q-nav">
            <button type="button" className="q-back" onClick={() => go(step - 1)} disabled={step === 0}>
              ← Retour
            </button>
            <span className="q-count">
              Étape {step + 1} / {steps.length}
            </span>
            {step < steps.length - 1 ? (
              <button type="button" className="h-btn is-solid" onClick={() => go(step + 1)}>
                <span className="h-btn-label">Continuer</span>
                <span className="h-btn-icon">
                  <Arrow diagonal={false} />
                </span>
              </button>
            ) : (
              <div className="q-final">
                <button type="button" className="q-link" onClick={copy}>
                  {copied ? "Copié ✓" : "Copier le récapitulatif"}
                </button>
                <button type="button" className="h-btn is-gold" onClick={send}>
                  <span className="h-btn-label">Valider et envoyer sur WhatsApp</span>
                  <span className="h-btn-icon">
                    <Arrow />
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RecapRow({
  label,
  onEdit,
  children,
}: {
  label: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="q-recap-row">
      <span>{label}</span>
      <div>{children}</div>
      <button type="button" onClick={onEdit} aria-label={`Modifier : ${label}`}>
        Modifier
      </button>
    </div>
  );
}

function Chip({
    active,
    onClick,
    children,
    hint,
    multi,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    hint?: string;
    multi?: boolean;
  }) {
  return (
    <button
      type="button"
      className={`q-chip ${active ? "is-on" : ""}`}
      role={multi ? "checkbox" : "radio"}
      aria-checked={active}
      onClick={onClick}
    >
      <i aria-hidden="true" />
      <span>
        {children}
        {hint && <small>{hint}</small>}
      </span>
    </button>
  )
}
