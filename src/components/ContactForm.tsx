"use client";

import { useState } from "react";
import { contactCategories, contactTimeframes, profile } from "@/data/content";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [category, setCategory] = useState(contactCategories[0]);
  const [timeframe, setTimeframe] = useState(contactTimeframes[0]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Projet ${category} — ${name || "Nouveau contact"}`;
    const body = [
      `Nom : ${name}`,
      `Email : ${email}`,
      company && `Organisation : ${company}`,
      `Catégorie : ${category}`,
      `Délai souhaité : ${timeframe}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Votre nom *</span>
          <input className={styles.input} type="text" name="name" required placeholder="Jean Dupont" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Votre email *</span>
          <input className={styles.input} type="email" name="email" required placeholder="jean@entreprise.com" />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Organisation</span>
        <input className={styles.input} type="text" name="company" placeholder="Nom de votre entreprise" />
      </label>

      <div className={styles.field}>
        <span className={styles.label}>Catégorie de service</span>
        <div className={styles.pillGroup}>
          {contactCategories.map((c) => (
            <button
              type="button"
              key={c}
              className={styles.pill}
              data-active={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Délai souhaité</span>
        <div className={styles.pillGroup}>
          {contactTimeframes.map((t) => (
            <button
              type="button"
              key={t}
              className={styles.pill}
              data-active={timeframe === t}
              onClick={() => setTimeframe(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Votre message *</span>
        <textarea
          className={styles.textarea}
          name="message"
          required
          placeholder="Bonjour Daniel, j'aimerais échanger sur..."
        />
      </label>

      <button type="submit" className={styles.submit}>
        Envoyer le message
      </button>
    </form>
  );
}
