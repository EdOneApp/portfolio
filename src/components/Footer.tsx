"use client";

import { profile, finalStats } from "@/data/content";
import Reveal from "./Reveal";
import MagneticLink from "./MagneticLink";
import styles from "./Footer.module.css";

const YEAR = 2026;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.headline}>
            Construisons votre <span>prochain</span> produit.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.ctaRow}>
            <MagneticLink href="/contact" className={styles.ctaBtn} strength={30}>
              Prendre rendez-vous
            </MagneticLink>
            <p className={styles.contactLine}>
              ou écrivez-moi à <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>
        </Reveal>

        <div className={styles.statsRow}>
          {finalStats.map((stat) => (
            <Reveal key={stat.label} className={styles.stat}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <div className={styles.bottomRow}>
          <div>
            <h5>Localisation</h5>
            <p>{profile.location}</p>
          </div>
          <div>
            <h5>Téléphone</h5>
            <p>
              <a href={profile.phoneHref}>{profile.phone}</a>
            </p>
          </div>
          <div>
            <h5>Socials</h5>
            <div className={styles.socialsList}>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
          <div>
            <h5>Édition</h5>
            <p>{YEAR} © Daniel Guedegbe</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
