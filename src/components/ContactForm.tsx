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
      <div className={styles.field}>
        <span className={styles.number}>01</span>
        <label className={styles.label} htmlFor="name">
          Votre nom ?
        </label>
        <input className={styles.input} type="text" id="name" name="name" required placeholder="Jean Dupont *" />
      </div>

      <div className={styles.field}>
        <span className={styles.number}>02</span>
        <label className={styles.label} htmlFor="email">
          Votre email ?
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          required
          placeholder="jean@entreprise.com *"
        />
      </div>

      <div className={styles.field}>
        <span className={styles.number}>03</span>
        <label className={styles.label} htmlFor="company">
          Le nom de votre organisation ?
        </label>
        <input className={styles.input} type="text" id="company" name="company" placeholder="Nom de l'entreprise" />
      </div>

      <div className={styles.field}>
        <span className={styles.number}>04</span>
        <label className={styles.label}>Quel service recherchez-vous ?</label>
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

      <div className={styles.field}>
        <span className={styles.number}>05</span>
        <label className={styles.label} htmlFor="message">
          Votre message
        </label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          required
          placeholder="Bonjour Daniel, j'aimerais échanger sur... *"
        />
      </div>

      <div className={styles.submitWrap}>
        <button type="submit" className={styles.submit}>
          Envoyer !
        </button>
      </div>
    </form>
  );
}
